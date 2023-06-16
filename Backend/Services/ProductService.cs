using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Virta.Repositories.Interfaces;
using Virta.Models;
using Virta.Entities;
using Virta.Services.Interfaces;
using System;
using Virta.Api.DTO;
using System.Linq;

namespace Virta.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly IProductRepository _productRepository;
        private readonly ICategoriesRepository _categoriesRepo;
        private readonly IAttributesRepository _attributesRepository;

        public ProductService(
            IMapper mapper,
            IProductRepository productRepository,
            ICategoriesRepository categoriesRepo,
            IAttributesRepository attributesRepository
        )
        {
            _mapper = mapper;
            _productRepository = productRepository;
            _categoriesRepo = categoriesRepo;
            _attributesRepository = attributesRepository;
        }

        public async Task<ProductDTO> GetProduct(Guid id)
        {
            var product = await _productRepository.GetProduct(id);
            return _mapper.Map<ProductDTO>(product);
        }

        public async Task<List<ProductDTO>> GetProductsAsync(string[] categories, int[] labels, string title, int? amount, int? page)
        {
            var products = await _productRepository.GetProductsAsync(categories, labels, title, amount, page);
            return _mapper.Map<List<ProductDTO>>(products);
        }

        public async Task<bool> Upsert(ProductUpsert product)
        {
            var productToSave = _mapper.Map<Product>(product);

            if (product.Categories.Length > 0) {
                var categories = await SetCategories(product.Categories);
                productToSave.CategoryProducts = categories.Select(c => new CategoryProduct { CategoryId = c.Id }).ToList();
            }

            if (product.ProductAttributes?.Count > 0)
                productToSave.ProductAttributes = await SetProductAttributes(product.ProductAttributes);

            if (product.AssociatedProducts?.Count > 0)
                productToSave.AssociatedProducts = await SetAssociatedProducts(product.AssociatedProducts);

            if (productToSave.Id == Guid.Empty)
            {
                _productRepository.Add(productToSave);
            }
            else
            {
                var productFromDb = await _productRepository.GetProduct(productToSave.Id);
                _mapper.Map<Product, Product>(productToSave, productFromDb);
                _productRepository.Update(productFromDb);
            }

            if (await _productRepository.SaveAll())
                return true;

            return false;
        }

        private async Task<List<Category>> SetCategories(string[] categories)
        {
            var result = new List<Category>();

            foreach (var category in categories)
                result.Add(await _categoriesRepo.GetCategoryAsync(category));

            return result;
        }

        private async Task<List<ProductAttribute>> SetProductAttributes(List<ProductAttributeUpsert> attributes)
        {
            var result = new List<ProductAttribute>();

            foreach (var attribute in attributes)
            {
                var entity = _mapper.Map<ProductAttribute>(attribute);
                entity.Attribute = await _attributesRepository.GetAttribute(attribute.Name);
                result.Add(entity);
            }

            return result;
        }

        private async Task<List<Product>> SetAssociatedProducts(List<Guid> associatedProducts)
        {
            var result = new List<Product>();

            foreach (var Id in associatedProducts)
                result.Add(await _productRepository.GetProduct(Id));

            return result;
        }

        public async Task<List<LabelDTO>> GetProductsLabels()
        {
            return await _productRepository.GetProductsLabels();
        }
    }
}
