import {
    Component,
    OnInit
} from '@angular/core';
import {
    faMinusCircle,
    faPlusCircle,
    faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { ProductInCart } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { AppStore } from 'src/app/store/app.store';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    faShoppingCart = faShoppingCart;
    faPlusCircle = faPlusCircle;
    faMinusCircle = faMinusCircle;
    isVisible = false;
    cart: ProductInCart[] = [];

    constructor(
        private cartService: CartService,
        private store: Store<AppStore>
    ) {
    }

    ngOnInit(): void {
        this.cart = this.cartService.cart.getValue();

        this.cartService.cart.subscribe(
            () => {
                this.cart = this.cartService.cart.getValue();
            }
        );
    }

    cartToggle(): void {
        this.isVisible = !this.isVisible;
    }

    decreaseQuality(item: ProductInCart): void {
        // this.cartService.decreaseQuality(item);
    }

    increaseQuantity(item: ProductInCart): void {
        // this.cartService.increaseQuantity(item);
    }
}
