using System.Threading.Tasks;
using Virta.Services.Interfaces;
using AutoMapper;
using Virta.Repositories.Interfaces;
using Virta.Entities;
using Virta.Models;
using Virta.Api.DTO;
using System.Collections.Generic;

namespace Virta.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly IMapper _mapper;
        private readonly ICategoriesRepository _categoriesRepository;

        public CategoriesService(
            IMapper mapper,
            ICategoriesRepository categoriesRepository
        )
        {
            _mapper = mapper;
            _categoriesRepository = categoriesRepository;
        }

        public async Task<List<CategoryDTO>> GetCategoriesAsync()
        {
            var categoriesRaw = await _categoriesRepository.GetParentCategoriesAsync();
            var categories = _mapper.Map<List<CategoryDTO>>(categoriesRaw);

            foreach (var category in categories)
            {
                int totalCount = await _categoriesRepository.GetCategoryProductCountAsync(category.Id);

                foreach (var child in category.Children)
                {
                    child.ProductCount = await _categoriesRepository.GetCategoryProductCountAsync(child.Id);
                    totalCount += child.ProductCount;
                }

                category.ProductCount = totalCount;
            }

            return categories;
        }

        public async Task<bool> UpsertAsync(CategoryUpsert category)
        {
            var categoryToSave = _mapper.Map<Category>(category);

            if (categoryToSave.Id != 0)
            {
                var categoryFromDb = await _categoriesRepository.GetCategoryAsync(categoryToSave.Id);
                _mapper.Map<Category, Category>(categoryToSave, categoryFromDb);
                _categoriesRepository.Update(categoryFromDb);
            }
            else
            {
                _categoriesRepository.Add(categoryToSave);
            }

            if (await _categoriesRepository.SaveAll())
                return true;

            return false;
        }
    }
}
