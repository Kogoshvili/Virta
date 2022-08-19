import { Component, OnInit } from '@angular/core';
import { ProductDTO, ProductLabels } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-trending-section',
    templateUrl: './trending-section.component.html',
    styleUrls: ['./trending-section.component.scss']
})
export class TrendingSectionComponent implements OnInit {
    products: ProductDTO[] = [];

    constructor(
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.productService.getProducts(null, [ProductLabels.Trending], null, 10)
            .subscribe(p => this.products = p.products);
    }
}
