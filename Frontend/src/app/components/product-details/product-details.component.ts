import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Splide from '@splidejs/splide';
import { ProductDTO, ProductLabels } from 'src/app/models/Product';

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

    constructor() { }

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

    decreaseQuantity(): void {
        if (this.quantity === 1) return;

        this.quantity--;
    }

    increaseQuantity(): void {
        this.quantity++;
    }
}
