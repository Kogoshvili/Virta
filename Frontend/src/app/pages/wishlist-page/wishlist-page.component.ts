import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ProductDTO, ProductInWishlist } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AppStore } from 'src/app/store/app.store';
import { setLoadingScreen } from 'src/app/store/general/general.actions';

@Component({
    selector: 'app-wishlist-page',
    templateUrl: './wishlist-page.component.html',
    styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {
    wishlist: ProductInWishlist[] = [];
    productForModal!: ProductDTO;

    constructor(
        private store: Store<AppStore>,
        private route: ActivatedRoute,
        private wishlistService: WishlistService,
        private cartService: CartService,
        private productService: ProductService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe(
            data => {
                this.store.dispatch(setLoadingScreen({ loadingScreen: false }));
            }
        );

        this.wishlistService.wishlist.subscribe(
            wishlist => this.wishlist = wishlist
        );
    }

    removeFromWishlist(id: string): void {
        this.wishlistService.removeItem(id);
    }

    onAddToCart(product: ProductInWishlist): void {
        this.cartService.copyToCart(product);
    }

    async open(content: any, productId: string) {
        this.productForModal = await this.productService.getProduct(productId).toPromise() as ProductDTO;
        this.modalService.open(content);
    }
}
