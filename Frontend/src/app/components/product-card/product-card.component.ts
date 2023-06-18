import {
    Component, Input, OnInit
} from '@angular/core';
import { ProductDTO, ProductLabels } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import VenoBox from 'venobox';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input() product!: ProductDTO;
    ProductLabels = ProductLabels;
    starts = { full: [] as any[], empty: [0, 1, 2, 3, 4] };
    venobox: typeof VenoBox;
    closeResult = '';
    isOpen: boolean = false;
    isInWishlist = false;
    hasLabel = false;

    constructor(
        private cartService: CartService,
        private wishlistService: WishlistService
    ) { }

    ngOnInit(): void {
        this.hasLabel = this.product.label !== ProductLabels.None;

        this.starts = {
            full: Array(this.product?.stars ?? 0),
            empty: Array(5 - (this.product?.stars ?? 0))
        };

        this.venobox = new VenoBox();

        this.wishlistService.wishlist.subscribe(
            () => this.isInWishlist = this.wishlistService.isInWishlist(this.product.id)
        );
    }

    open() {
        this.isOpen = !this.isOpen;
    }

    onWishlistClick(): void {
        if (this.isInWishlist) {
            this.wishlistService.removeItem(this.product.id);
        } else {
            this.wishlistService.addToWishlist(this.product);
        }
    }
    onAddToCartClick() {
        this.cartService.addToCart(this.product);
    }
}

