import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryDTO } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { toggleIsSideCategory } from 'src/app/store/general/general.actions';
import { selectIsSideCategory } from 'src/app/store/general/general.selectors';
import { AppStore } from '../../store/app.store';

interface Category extends CategoryDTO {
    isActive: boolean;
}

@Component({
    selector: 'app-side-category',
    templateUrl: './side-category.component.html',
    styleUrls: ['./side-category.component.scss']
})
export class SideCategoryComponent implements OnInit {
    isSideCategory$ = this.store.select(selectIsSideCategory);
    categories: Category[] = [];

    constructor(
        private store: Store<AppStore>,
        private categoryService: CategoryService
    ) {
    }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(
            categories =>
                this.categories = categories.map(category => ({ ...category, isActive: false }))
        );
    }

    toggleSideCategory(): void {
        this.store.dispatch(toggleIsSideCategory());
    }

    expandCategory(name: string): void {
        this.categories.forEach(category => {
            if (category.name === name) {
                category.isActive = !category.isActive;
            }
        });
    }
}
