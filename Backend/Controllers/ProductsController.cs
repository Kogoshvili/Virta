using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Virta.Api.DTO;
using Virta.Data.Interfaces;
using Virta.Models;
using Virta.Services.Interfaces;

namespace Virta.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsRepository _productsRepository;
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductsController(
            IMapper mapper,
            IProductsRepository productsRepository,
            ICategoriesRepository categoriesRepository,
            IProductService productService
        )
        {
            _mapper = mapper;
            _productsRepository = productsRepository;
            _categoriesRepository = categoriesRepository;
            _productService = productService;
        }

        [HttpGet]// TODO: Default filter for visible & active
        public async Task<IActionResult> GetProducts(
            [FromQuery(Name = "category")] string[] categories,
            [FromQuery(Name = "title")] string title,
            [FromQuery(Name = "amount")] int amount = 10
        )
        {
            var products = await _productsRepository.GetProducts(categories, title, amount);

            if (products == null)
                return BadRequest();

            return Ok(products);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var product = await _productsRepository.GetProduct(id);

            if (product == null)
                return BadRequest();

            var response = _mapper.Map<ProductDTO>(product);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Upsert(ProductDTO productDTO)
        {
            var product = _mapper.Map<ProductUpsert>(productDTO);

            if (await _productService.Upsert(product))
                return Ok();

            return BadRequest();
        }

        [HttpGet("seed")]
        public async Task<IActionResult> Seed()
        {
            var rawData = await System.IO.File.ReadAllTextAsync("bsData/products.json");
            var products = JsonSerializer.Deserialize<IEnumerable<ProductDTO>>(rawData);

            foreach (var product in products)
                await Upsert(product);

            return Ok();
        }
    }
}
