import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDTO, ProductLabels } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import VenoBox from 'venobox';

@Component({
    selector: 'app-feature-card',
    templateUrl: './feature-card.component.html',
    styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent implements OnInit {
    ProductLabels = ProductLabels;
    @Input() product!: ProductDTO;
    venobox: typeof VenoBox;

    constructor(
        private modalService: NgbModal,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.venobox = new VenoBox();
    }

    onAddToCartClick() {
        this.cartService.addToCart(this.product);
    }
}
