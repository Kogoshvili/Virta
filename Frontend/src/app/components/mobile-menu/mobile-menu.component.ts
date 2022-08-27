import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AppStore } from 'src/app/store/app.store';
import { toggleIsSideCart, toggleIsSideCategory } from 'src/app/store/general/general.actions';

@Component({
    selector: 'app-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
    itemsInCompare: number = 2;
    itemsInWishlist: number = 0;
    itemsInCart: number = 0;

    constructor(
        private cartService: CartService,
        private wishlistService: WishlistService,
        private store: Store<AppStore>
    ) { }

    ngOnInit(): void {
        this.cartService.getCount().subscribe(
            count => this.itemsInCart = count
        );

        this.wishlistService.getCount().subscribe(
            count => this.itemsInWishlist = count
        );
    }

    toggleSideCategory(): void {
        this.store.dispatch(toggleIsSideCategory());
    }

    toggleSideCart(): void {
        this.store.dispatch(toggleIsSideCart());
    }
}
