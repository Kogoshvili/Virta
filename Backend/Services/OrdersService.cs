using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Virta.Api.DTO;
using Virta.Repositories.Interfaces;
using Virta.Entities;
using Virta.Services.Interfaces;

namespace Virta.Services
{
    public class OrdersService : IOrdersService
    {
        private readonly IMapper _mapper;
        private readonly IOrdersRepository _ordersRepo;
        private readonly IProductRepository _productRepo;
        private readonly UserManager<User> _userManager;

        public OrdersService(
            IMapper mapper,
            IOrdersRepository ordersRepo,
            IProductRepository productRepo,
            UserManager<User> userManager
        )
        {
            _mapper = mapper;
            _ordersRepo = ordersRepo;
            _productRepo = productRepo;
            _userManager = userManager;
        }

        public async Task<bool> Upsert(OrderUpsert order)
        {
            var orderProducts = new List<OrderProduct>();

            foreach (var product in order.Products)
            {
                var productFromDb = await _productRepo.GetProduct(product.id);

                orderProducts.Add(
                    new OrderProduct
                    {
                        Product = productFromDb,
                        Price = product.Price,
                        Quantity = product.Quantity
                    }
                );
            }

            var user = await _userManager.FindByNameAsync(order.UserEmail);

            if (user == null)
                return false;

            var orderToSave = new Order
            {
                ShippingCost = order.ShippingCost,
                User = user,
                OrderProduct = orderProducts
            };

            if (order.Id != 0)
            {
                var orderFromDb = await _ordersRepo.GetOrder(order.Id);
                _mapper.Map<Order, Order>(orderToSave, orderFromDb);
                _ordersRepo.Update(orderFromDb);
            }
            else
            {
                _ordersRepo.Add(orderToSave);
            }

            if (await _ordersRepo.SaveAll())
                return true;

            return false;
        }
    }
}
