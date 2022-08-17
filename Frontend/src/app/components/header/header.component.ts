import {
    Component,
    OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CategoryDTO } from 'src/app/models/Category';
import { Category } from 'src/app/models/filters';
import { CategoryService } from 'src/app/services/category.service';
import { toggleIsSideCart, toggleIsSideCategory } from 'src/app/store/general/general.actions';
import { selectIsSideCart, selectIsSideCategory } from 'src/app/store/general/general.selectors';
import { AppStore } from '../../store/app.store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    categories: CategoryDTO[] = [];
    isLoading = false;
    applyShadows = false;
    searchInput: string = '';
    isSideCategory$ = this.store.select(selectIsSideCategory);
    isSideCart$ = this.store.select(selectIsSideCart);

    cta: string = 'Get 10% Discount For Your First Shopping!';
    topPages: { url: string, label: string }[] = [
        { url: '#', label: 'Contact Us' },
        { url: '#', label: 'Offers' },
        { url: '#', label: 'Need Help?' }
    ];
    currencies: { value: string, label: string }[] = [
        { value: 'gel', label: 'GEL ₾' },
        { value: 'eur', label: 'EUR €' },
        { value: 'usd', label: 'USD $' }
    ];
    locales: { value: string, label: string }[] = [
        { value: 'en', label: 'English' },
        { value: 'ge', label: 'Georgian' },
        { value: 'de', label: 'German' }
    ];

    itemsInCompare: number = 2;
    itemsInWishlist: number = 3;
    itemsInCart: number = 5;

    constructor(
        // private autoCompleteService: AutoCompleteService,
        private router: Router,
        private categoryService: CategoryService,
        private store: Store<AppStore>
    ) {

    }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(
            categories => this.categories = categories
        );
    }

    onSearchChange(event: any): void {
        this.searchInput = event.target?.value;
        // if (category && category.trim()) {
        //     this.autoCompleteService.search(category)
        //         .subscribe(response => {
        //             console.log(response);
        //             this.filteredCategories = response;
        //         });
        // }
        // this.filteredCategories = [];
    }

    selectOption(category: Category): void {
        // this.searchInput = category.title;
        // this.category = category;
        // this.filteredCategories = [];
        // this.search();
    }

    search(): void {
        this.router.navigate(['/products'], { queryParams: { title: this.searchInput } });
    }

    goToCategory(category: string = ''): void {
        this.router.navigate(['/products/' + category]);
    }

    toggleSideCategory(): void {
        this.store.dispatch(toggleIsSideCategory());
    }

    toggleSideCart(): void {
        this.store.dispatch(toggleIsSideCart());
    }
}
