import {
    Component, OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDTO } from 'src/app/models/Category';
import { ProductLabels } from 'src/app/models/Product';
import { CategoryService } from 'src/app/services/category.service';

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
    labels = [
        {
            name: 'New Items',
            value: ProductLabels.New
        },
        {
            name: 'Featured Items',
            value: ProductLabels.Featured
        },
        {
            name: 'Sale Items',
            value: ProductLabels.Sale
        },
        {
            name: 'Trending Items',
            value: ProductLabels.Trending
        }
    ];

    constructor(
        private categoryService: CategoryService,
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

    expandCategory(name: string): void {
        this.categories.forEach(category => {
            if (category.name === name) {
                category.isActive = !category.isActive;
            }
        });
    }

    onCategoryClick(category: string) {
        this.router.navigate(
            ['/products'],
            {
                queryParams: {
                    categories: this.selectedCategories.includes(category)
                        ? this.selectedCategories.filter(c => c !== category)
                        : [ ...this.selectedCategories, category]
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
                        : [ ...this.selectedLabels, label]
                },
                queryParamsHandling: 'merge'
            }
        );
    }
}
