import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-top-section',
    templateUrl: './top-section.component.html',
    styleUrls: ['./top-section.component.scss']
})
export class TopSectionComponent implements OnInit {
    topRated: ProductDTO[] = [];
    topSales: ProductDTO[] = [];
    topDiscounts: ProductDTO[] = [];

    constructor(
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.productService.getProducts(null, null, null, 4)
            .subscribe(p => this.topRated = p);
        this.productService.getProducts(null, null, null, 4)
            .subscribe(p => this.topSales = p);
        this.productService.getProducts(null, null, null, 4)
            .subscribe(p => this.topDiscounts = p);
    }

}
