using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Virta.Api.DTO;
using Virta.Repositories.Interfaces;
using Virta.Models;
using Virta.Services.Interfaces;

namespace Virta.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly IProductService _productService;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductsController(
            IMapper mapper,
            ICategoriesRepository categoriesRepository,
            IProductService productService,
            IProductRepository productRepository
        )
        {
            _mapper = mapper;
            _categoriesRepository = categoriesRepository;
            _productService = productService;
            _productRepository = productRepository;
        }

        [HttpGet]// TODO: Default filter for visible & active
        public async Task<IActionResult> GetProducts(
            [FromQuery(Name = "categories")] string[] categories,
            [FromQuery(Name = "labels")] int[] labels,
            [FromQuery(Name = "title")] string title,
            [FromQuery(Name = "amount")] int amount = 20,
            [FromQuery(Name = "page")] int page = 1
        )
        {
            var products = await _productService.GetProductsAsync(categories, labels, title, amount, page);

            if (products == null)
                return BadRequest();

            var productCount = await _productRepository.GetProductsCountAsync(categories, labels, title);

            return Ok(
                new PLP
                {
                    Products = products,
                    TotalCount = productCount
                }
            );
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var product = await _productService.GetProduct(id);

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
