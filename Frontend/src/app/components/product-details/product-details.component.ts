import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Splide from '@splidejs/splide';
import { ProductDTO, ProductLabels } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
    @Input() modal!: NgbModalRef;
    @Input() product!: ProductDTO;
    ProductLabels = ProductLabels;
    splied: any = null;
    spliedThumbnail: any = null;
    quantity: number = 1;

    constructor(
        private cartService: CartService
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.splied = new Splide(
            '#product-page-image',
            {
                pagination: false,
                type: 'loop',
                arrows: false,
                gap: '10px'
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

    changeQuantityBy(change: number): void {
        if (this.quantity === 1 && change === -1) return;
        this.quantity += change;
    }

    onAddToCartClick(): void {
        this.cartService.addItem(this.product, this.quantity);
    }

    onAddToWishlistClick(): void {}
}
