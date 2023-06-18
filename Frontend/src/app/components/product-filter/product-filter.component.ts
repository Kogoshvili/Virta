import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDTO } from 'src/app/models/Category';
import { LabelDTO } from 'src/app/models/Filters';
import { CategoryService } from 'src/app/services/category.service';
import { FiltersService } from 'src/app/services/filters.service';
import { isEmpty as _isEmpty } from 'lodash-es';

interface Category extends CategoryDTO {
    isActive: boolean;
}

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
    selectedCategories: string[] = [];
    selectedLabels: string[] = [];
    categories: Category[] = [];
    labels: LabelDTO[] = [];
    isEmpty = _isEmpty;

    constructor(
        private categoryService: CategoryService,
        private filtersService: FiltersService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(
            categories =>
                this.categories = categories.map(category => {
                    const categoryIsSelected = this.selectedCategories.includes(category.name);
                    const childIsSelected = category.children.some(child => this.selectedCategories.includes(child.name));

                    if (categoryIsSelected) {
                        const childNames = category.children.map(c => c.name);
                        this.selectedCategories = this.selectedCategories.filter(c => ![category.name, ...childNames].includes(c));
                        this.selectedCategories = [...this.selectedCategories, ...childNames];
                        this.router.navigate(
                            ['/products'],
                            { queryParams: { categories: this.selectedCategories }, queryParamsHandling: 'merge' }
                        );
                    }

                    return { ...category, isActive: categoryIsSelected || childIsSelected };
                })
        );

        this.filtersService.getLabels().subscribe(
            labels => this.labels = labels.filter(label => label.value !== 0).map(label => ({ ...label, name: `${label.name} Items` }))
        );

        this.route.queryParams.subscribe(params => {
            if (Array.isArray(params.categories)) {
                this.selectedCategories = params.categories;
            } else {
                this.selectedCategories = params.categories ? [params.categories] : [];
            }

            if (Array.isArray(params.labels)) {
                this.selectedLabels = params.labels;
            } else {
                this.selectedLabels = params.labels ? [params.labels] : [];
            }
        });
    }

    onCategoryClick(name: string) {
        const category = this.categories.find(c => c.name === name);

        if (!this.isEmpty(category?.children)) {
            this.expandCategory(name);
        } else {
            this.redirectToCategory(name);
        }
    }

    expandCategory(name: string): void {
        this.categories.forEach(category => {
            if (category.name === name) {
                category.isActive = !category.isActive;
            }
        });
    }

    redirectToCategory(name: string) {
        this.router.navigate(
            ['/products'],
            {
                queryParams: {
                    categories: this.selectedCategories.includes(name)
                        ? this.selectedCategories.filter(c => c !== name)
                        : [ ...this.selectedCategories, name],
                    page: 1
                },
                queryParamsHandling: 'merge'
            }
        );
    }

    onLabelClick(label: number) {
        const labelString = label.toString();
        this.router.navigate(
            ['/products'],
            {
                queryParams: {
                    labels: this.selectedLabels.includes(labelString)
                        ? this.selectedLabels.filter(c => c !== labelString)
                        : [ ...this.selectedLabels, label],
                    page: 1
                },
                queryParamsHandling: 'merge'
            }
        );
    }
}
