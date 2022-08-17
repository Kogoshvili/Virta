import {
    Component, OnInit
} from '@angular/core';
import { CategoryDTO } from 'src/app/models/Category';
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
    activeCategory: string = '';
    categories: Category[] = [];

    constructor(
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(
            categories =>
                this.categories = categories.map(category => ({ ...category, isActive: false }))
        );
    }

    expandCategory(name: string): void {
        this.categories.forEach(category => {
            if (category.name === name) {
                category.isActive = !category.isActive;
            }
        });
    }
}
