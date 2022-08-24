using System.Threading.Tasks;
using AutoMapper;
using Virta.Services.Interfaces;
using Virta.Data.Interfaces;
using Virta.Entities;
using Virta.Models;
using System;
using Microsoft.AspNetCore.SignalR;
using Virta.Api.SignalR;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Virta.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IMapper _mapper;
        private readonly ICartRepository _cartRepository;
        private readonly IWishlistRepository _wishlistRepository;
        private readonly IProductRepository _productRepository;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IHubContext<CustomerHub, ICustomerClient> _hubContext;

        public CustomerService(
            IMapper mapper,
            ICartRepository cartRepository,
            IWishlistRepository wishlistRepository,
            IProductRepository productRepository,
            IHttpContextAccessor contextAccessor,
            IHubContext<CustomerHub, ICustomerClient> hubContext
        )
        {
            _mapper = mapper;
            _cartRepository = cartRepository;
            _wishlistRepository = wishlistRepository;
            _productRepository = productRepository;
            _contextAccessor = contextAccessor;
            _hubContext = hubContext;
        }

        protected HttpContext Context =>
            _contextAccessor.HttpContext;

        public async Task<bool> UpsertCartAsync(CartUpsert cart, Guid userId)
        {
            var cartToSave = _mapper.Map<Cart>(cart);
            cartToSave.Products = new List<Cart.CartItem>();
            foreach(var item in cart.Products)
            {
                var product = await _productRepository.GetProduct(item.ProductId);

                cartToSave.Products.Add(
                    new Cart.CartItem
                    {
                        Product = product,
                        Quantity = item.Quantity
                    }
                );
            }

            var cartFromDb = await _cartRepository.GetCart(userId);

            if (cartFromDb == null)
                _cartRepository.Add(cartToSave);
            else {
                _mapper.Map<Cart, Cart>(cartToSave, cartFromDb);
                _cartRepository.Update(cartFromDb);
            }

            if (!await _cartRepository.SaveAll())
                return false;

            BroadcastUpdate(userId);
            return true;
        }

        public async Task<bool> UpsertWishlistAsync(WishlistUpsert wishlist, Guid userId)
        {
            var wishlistToSave = _mapper.Map<Wishlist>(wishlist);
            wishlistToSave.Products = new List<Wishlist.WishlistItem>();

            foreach(var item in wishlist.Products)
            {
                var product = await _productRepository.GetProduct(item.ProductId);

                wishlistToSave.Products.Add(
                    new Wishlist.WishlistItem { Product = product }
                );
            }

            var wishlistFromDb = await _wishlistRepository.GetWishlistAsync(userId);

            if (wishlistFromDb == null)
                _wishlistRepository.Add(wishlistToSave);
            else {
                _mapper.Map<Wishlist, Wishlist>(wishlistToSave, wishlistFromDb);
                _wishlistRepository.Update(wishlistFromDb);
            }

            if (!await _wishlistRepository.SaveAll())
                return false;

            BroadcastUpdate(userId);
            return true;
        }

        protected void BroadcastUpdate(Guid userId)
        {
            if (CustomerHub.ConnectedCustomers.ContainsKey(userId)) {
                _hubContext.Clients.Clients(CustomerHub.ConnectedCustomers[userId]).OnCartUpdate();
            }
        }
    }
}
