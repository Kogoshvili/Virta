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
    activeCategories: string[] = [];
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
                this.categories = categories.map(category =>
                    ({ ...category, isActive: category.children.some(child => this.activeCategories.includes(child.name)) })
                )
        );

        this.route.queryParams.subscribe(
            params => this.activeCategories = params.categories ?? []
        );
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
                    categories: this.activeCategories.includes(category)
                        ? this.activeCategories.filter(c => c !== category)
                        : [ ...this.activeCategories, category]
                },
                queryParamsHandling: 'merge'
            }
        );
    }
}
