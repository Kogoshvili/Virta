import {
    AfterViewInit,
    Component,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import Splide from '@splidejs/splide';
import { ProductDTO, ProductLabels } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AppStore } from 'src/app/store/app.store';
import { setLoadingScreen } from 'src/app/store/general/general.actions';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, AfterViewInit {
    product!: ProductDTO;
    isInCart = false;
    isInWishlist = false;
    splied: any = null;
    spliedThumbnail: any = null;
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

    ngAfterViewInit(): void {
        this.splied = new Splide(
            '#product-page-image',
            {
                pagination: false,
                type: 'loop',
                arrows: false,
                gap: '30px'
            }
        );

        this.spliedThumbnail = new Splide(
            '#product-page-image-thumbnails',
            {
                arrows: false,
                pagination : false,
                perPage: 5
            }
        ).mount();

        this.splied.sync(this.spliedThumbnail).mount();
    }

    ngOnInit(): void {
        this.route.data.subscribe(
            data => {
                this.product = data.product;
                this.store.dispatch(setLoadingScreen({ loadingScreen: false }));
            }
        );

        this.cartService.cartSub.subscribe(
            () => this.isInCart = this.cartService.isItemInCart(this.product.id)
        );

        this.wishlistService.wishlistSub.subscribe(
            () => this.isInWishlist = this.wishlistService.isItemInWishlist(this.product.id)
        );
    }

    toggleTabs(tab: string): void {
        Object.keys(this.tabs).forEach(key => {
            this.tabs[key] = false;
        } );

        this.tabs[tab] = true;
    }

    decreaseQuantity(): void {
        if (this.quantity === 1) return;

        this.quantity--;
    }

    increaseQuantity(): void {
        this.quantity++;
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
