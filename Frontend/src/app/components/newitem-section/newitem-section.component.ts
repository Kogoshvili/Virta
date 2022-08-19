import { Component, OnInit } from '@angular/core';
import { SplideOptions } from '@splidejs/splide';
import { ProductDTO, ProductLabels } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-newitem-section',
    templateUrl: './newitem-section.component.html',
    styleUrls: ['./newitem-section.component.scss']
})
export class NewitemSectionComponent implements OnInit {
    sliderOptions: SplideOptions = {
        type: 'loop',
        gap: '24px',
        autoplay: true,
        perPage: 5,
        pagination: false,
        perMove: 1
    };
    products: ProductDTO[] = [];

    constructor(
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.productService.getProducts(null, [ProductLabels.New], null, 10)
            .subscribe(p => this.products = p.products);
    }
}
