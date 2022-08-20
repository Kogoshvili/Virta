import { Component, OnInit } from '@angular/core';
import { ProductDTO, ProductLabels } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-feature-section',
    templateUrl: './feature-section.component.html',
    styleUrls: ['./feature-section.component.scss']
})
export class FeatureSectionComponent implements OnInit {
    products: ProductDTO[] = [];
    ProductLabels = ProductLabels;

    constructor(
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.productService.getProducts(null, [ProductLabels.Featured], null, 6)
            .subscribe(p => this.products = p.products);
    }
}
