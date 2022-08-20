import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductInCart } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { toggleIsSideCart } from 'src/app/store/general/general.actions';
import { selectIsSideCart } from 'src/app/store/general/general.selectors';
import { AppStore } from '../../store/app.store';

@Component({
    selector: 'app-side-cart',
    templateUrl: './side-cart.component.html',
    styleUrls: ['./side-cart.component.scss']
})
export class SideCartComponent implements OnInit {
    isSideCart$ = this.store.select(selectIsSideCart);
    products: ProductInCart[] = [];
    coupon = '';

    constructor(
        private store: Store<AppStore>,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.cartService.cart.subscribe(
            products => this.products = products
        );
    }

    toggleSideCart(): void {
        this.store.dispatch(toggleIsSideCart());
    }

    changeProductQuantityBy(productId: string, change: number): void {
        this.cartService.changeQuantityBy(productId, change);
    }

    removeProduct(productId: string): void {
        this.cartService.removeItem(productId);
    }

    totalProductPrice(price: number, quantity: number): number {
        return +(price * quantity).toFixed(2);
    }

    totalPrice(): number {
        return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }

    onCouponApply(): void {
        console.log('Coupon applied', this.coupon);
    }
}
