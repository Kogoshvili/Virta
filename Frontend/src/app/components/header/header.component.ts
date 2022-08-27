import {
    Component,
    OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { CategoryDTO } from 'src/app/models/Category';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
// import { Category } from 'src/app/models/filters';
import { CategoryService } from 'src/app/services/category.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { toggleIsMobileMenu, toggleIsSideCart, toggleIsSideCategory } from 'src/app/store/general/general.actions';
import { selectIsMobileMenu, selectIsSideCart, selectIsSideCategory } from 'src/app/store/general/general.selectors';
import { AppStore } from '../../store/app.store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    categories: CategoryDTO[] = [];
    isLoggedIn: boolean = false;
    isLoading = false;
    applyShadows = false;
    searchInput: string = '';
    isSideCategory$ = this.store.select(selectIsSideCategory);
    isSideCart$ = this.store.select(selectIsSideCart);
    isMobileMenu$ = this.store.select(selectIsMobileMenu);
    isMobileSearch = false;

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
    itemsInWishlist: number = 0;
    itemsInCart: number = 0;

    constructor(
        // private autoCompleteService: AutoCompleteService,
        private router: Router,
        private categoryService: CategoryService,
        private store: Store<AppStore>,
        private modalService: NgbModal,
        private authService: AuthService,
        private cartService: CartService,
        private wishlistService: WishlistService
    ) { }

    ngOnInit(): void {
        this.authService.isLoggedInSub.subscribe(
            loggedIn => this.isLoggedIn = loggedIn
        );

        this.categoryService.getCategories().subscribe(
            categories => this.categories = categories
        );

        this.cartService.getCount().subscribe(
            count => this.itemsInCart = count
        );

        this.wishlistService.getCount().subscribe(
            count => this.itemsInWishlist = count
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

    // selectOption(category: Category): void {
    //     // this.searchInput = category.title;
    //     // this.category = category;
    //     // this.filteredCategories = [];
    //     // this.search();
    // }

    search(): void {
        this.router.navigate(['/products'], { queryParams: { title: this.searchInput } });
    }

    openEntry(context: any) {
        this.modalService.open(context);
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

    toggleMobileMenu(): void {
        this.store.dispatch(toggleIsMobileMenu());
    }

    toggleMobileSearch(): void {
        this.isMobileSearch = !this.isMobileSearch;
    }
}
