using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Virta.Api.DTO;
using Virta.Services.Interfaces;
using Virta.Repositories.Interfaces;
using Virta.Extensions;
using Virta.Models;

namespace Virta.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICartRepository _cartRepository;
        private readonly IWishlistRepository _wishlistRepository;
        private readonly ICustomerService _customerService;

        public CustomerController(
            IMapper mapper,
            ICartRepository cartRepository,
            IWishlistRepository wishlistRepository,
            ICustomerService customerService
        )
        {
            _mapper = mapper;
            _cartRepository = cartRepository;
            _wishlistRepository = wishlistRepository;
            _customerService = customerService;
        }

        [HttpGet("cart")]
        public async Task<IActionResult> GetCart()
        {
            var cart = await _cartRepository.GetCart(User.GetUserId());

            if (cart == null)
                return BadRequest();

            var result = _mapper.Map<CartDTO>(cart);

            return Ok(result);
        }

        [HttpPost("cart")]
        public async Task<IActionResult> UpsertCart(CartDTOIn cartDTOIn)
        {
            if (cartDTOIn.Products == null)
                return Ok();

            var cartUpsert = _mapper.Map<CartUpsert>(cartDTOIn);

            if (await _customerService.UpsertCartAsync(cartUpsert, User.GetUserId()))
                return Ok();

            return BadRequest();
        }

        [HttpGet("wishlist")]
        public async Task<IActionResult> GetWishlist()
        {
            var wishlist = await _wishlistRepository.GetWishlistAsync(User.GetUserId());

            if (wishlist == null)
                return BadRequest();

            var result = _mapper.Map<WishlistDTO>(wishlist);

            return Ok(result);
        }

        [HttpPost("wishlist")]
        public async Task<IActionResult> UpsertWishlist(WishlistDTOIn wishlistDTO)
        {
            if (wishlistDTO.ProductIds.Count == 0)
                return Ok();

            var wishlistUpsert = _mapper.Map<WishlistUpsert>(wishlistDTO);

            if (await _customerService.UpsertWishlistAsync(wishlistUpsert, User.GetUserId()))
                return Ok();

            return BadRequest();
        }
    }
}
