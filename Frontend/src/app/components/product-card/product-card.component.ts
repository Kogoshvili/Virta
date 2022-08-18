import {
    Component, Input, OnInit
} from '@angular/core';
import { ProductDTO, ProductLabels } from 'src/app/models/Product';
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

    constructor(
    ) { }

    ngOnInit(): void {
        this.starts = {
            full: Array(this.product?.stars ?? 0),
            empty: Array(5 - (this.product?.stars ?? 0))
        };

        this.venobox = new VenoBox();
    }

    onWishlistClick() {}
    onAddToCartClick() {}
}

