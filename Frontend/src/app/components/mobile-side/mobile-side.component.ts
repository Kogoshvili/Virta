import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ExpandableCategory } from 'src/app/models/Category';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { AppStore } from 'src/app/store/app.store';
import { toggleIsMobileMenu } from 'src/app/store/general/general.actions';
import { selectIsMobileMenu } from 'src/app/store/general/general.selectors';

@Component({
    selector: 'app-mobile-side',
    templateUrl: './mobile-side.component.html',
    styleUrls: ['./mobile-side.component.scss']
})
export class MobileSideComponent implements OnInit {
    isMobileMenu$ = this.store.select(selectIsMobileMenu);
    isLoggedIn: boolean = false;
    categories: ExpandableCategory[] = [];
    areCategoriesExpanded: boolean = false;
    isOpen: boolean = false;

    constructor(
        private store: Store<AppStore>,
        private authService: AuthService,
        private modalService: NgbModal,
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.authService.isLoggedIn.subscribe(
            loggedIn => this.isLoggedIn = loggedIn
        );

        this.categoryService.getCategories().subscribe(
            categories =>
                this.categories = categories.map(category => ({ ...category, isActive: false }))
        );
    }

    openEntry() {
        this.isOpen = !this.isOpen;
    }

    toggleSideCart(): void {
        this.store.dispatch(toggleIsMobileMenu());
    }

    expandCategory(name: string): void {
        this.categories.forEach(category => {
            if (category.name === name) {
                category.isActive = !category.isActive;
            }
        });
    }

    expandCategories(): void {
        this.areCategoriesExpanded = !this.areCategoriesExpanded;
    }
}
