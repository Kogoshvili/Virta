import {
    Component,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductDTO, ProductLabels } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AppStore } from 'src/app/store/app.store';
import { setLoadingScreen } from 'src/app/store/general/general.actions';
import VenoBox from 'venobox';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
    product!: ProductDTO;
    venobox: typeof VenoBox;
    isInCart = false;
    isInWishlist = false;
    tabs: { [key: string]: boolean} = {
        description: true,
        specification: false,
        reviews: false
    };
    ProductLabels = ProductLabels;
    quantity: number = 1;

    constructor(
        private route: ActivatedRoute,
        private cartService: CartService,
        private wishlistService: WishlistService,
        private store: Store<AppStore>,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe(
            data => {
                this.product = data.product;
                this.store.dispatch(setLoadingScreen({ loadingScreen: false }));
            }
        );

        this.cartService.cart.subscribe(
            () => this.isInCart = this.cartService.isItemInCart(this.product.id)
        );

        this.wishlistService.wishlistSub.subscribe(
            () => this.isInWishlist = this.wishlistService.isItemInWishlist(this.product.id)
        );

        this.venobox = new VenoBox();
    }

    toggleTabs(tab: string): void {
        Object.keys(this.tabs).forEach(key => {
            this.tabs[key] = false;
        } );

        this.tabs[tab] = true;
    }

    CartAction(): void {
        // if (this.isInCart) {
        //     this.cartService.removeItem(this.product.id);
        //     return;
        // }

        // this.cartService.addItem({
        //     id: this.product.id,
        //     title: this.product.title,
        //     price: this.product.price,
        //     images: [ this.product.images.map(i => i.url)[0] ],
        //     quantity: this.quantity,
        //     url: this.router.url
        // });
    }

    WishlistAction(): void {
        // if (this.isInWishlist) {
        //     this.wishlistService.removeItem(this.product.id);
        //     return;
        // }

        // this.wishlistService.addItem({
        //     id: this.product.id,
        //     title: this.product.title,
        //     price: this.product.price,
        //     images: [ this.product.images.map(i => i.url)[0] ],
        //     url: this.router.url
        // });
    }
}
