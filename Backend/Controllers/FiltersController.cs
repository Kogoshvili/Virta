using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
    public class FiltersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly ICategoriesService _categoriesService;
        private readonly IAttributesRepository _attributesRepository;
        private readonly IAttributesService _attributesService;
        private readonly IProductRepository _productRepository;
        private readonly IReviewRepository _reviewRepository;

        public FiltersController(
            IMapper mapper,
            ICategoriesRepository categoriesRepository,
            ICategoriesService categoriesService,
            IAttributesRepository attributesRepository,
            IAttributesService attributesService,
            IProductRepository productRepository,
            IReviewRepository reviewRepository
        )
        {
            _mapper = mapper;
            _categoriesRepository = categoriesRepository;
            _categoriesService = categoriesService;
            _attributesRepository = attributesRepository;
            _attributesService = attributesService;
            _productRepository = productRepository;
            _reviewRepository = reviewRepository;
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _categoriesService.GetCategoriesAsync();

            if (categories == null)
                return BadRequest();

            return Ok(categories);
        }

        [HttpPost("categories")]
        public async Task<IActionResult> UpsertCategories(CategoryDTO categoryDTO)
        {
            var category = _mapper.Map<CategoryUpsert>(categoryDTO);
            if (await _categoriesService.UpsertAsync(category))
                return Ok();

            return BadRequest();
        }

        [HttpGet("attributes")]
        public async Task<IActionResult> GetAttributes()
        {
            var attributes = await _attributesRepository.GetAttributes();

            if (attributes == null)
                return BadRequest();

            var response = _mapper.Map<IEnumerable<AttributeDTO>>(attributes);

            return Ok(response);
        }

        [HttpPost("attributes")]
        public async Task<IActionResult> UpsertAttributes(AttributeDTO attributeDTO)
        {
            var attribute = _mapper.Map<AttributeUpsert>(attributeDTO);

            if (await _attributesService.Upsert(attribute))
                return Ok();

            return BadRequest();
        }

        [HttpGet("labels")]
        public async Task<IActionResult> GetProductsLabels()
        {
            var labels = await _productRepository.GetProductsLabels();

            if (labels == null)
                return BadRequest();

            return Ok(labels);
        }

        [HttpGet("reviews")]
        public async Task<IActionResult> GetProductsReviews()
        {
            var reviews = await _reviewRepository.GetTotalProductsReviewsAsync();

            if (reviews == null)
                return BadRequest();

            return Ok(reviews);
        }

        [HttpGet("categories/seed")]
        public async Task<IActionResult> SeedCategories()
        {
            var rawData = await System.IO.File.ReadAllTextAsync("bsData/categories.json");
            var categories = JsonSerializer.Deserialize<IEnumerable<CategoryDTO>>(rawData);

            foreach (var category in categories)
                await UpsertCategories(category);

            return Ok();
        }

        [HttpGet("attributes/seed")]
        public async Task<IActionResult> SeedAttributes()
        {
            var rawData = await System.IO.File.ReadAllTextAsync("bsData/attributes.json");
            var attributes = JsonSerializer.Deserialize<IEnumerable<AttributeDTO>>(rawData);

            foreach (var attribute in attributes)
                await UpsertAttributes(attribute);

            return Ok();
        }
    }
}
