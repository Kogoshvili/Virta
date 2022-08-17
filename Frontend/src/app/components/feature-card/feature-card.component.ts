import { Component, Input, OnInit } from '@angular/core';
import { ProductDTO, ProductLabels } from 'src/app/models/Product';

@Component({
    selector: 'app-feature-card',
    templateUrl: './feature-card.component.html',
    styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent implements OnInit {
    ProductLabels = ProductLabels;
    @Input() product!: ProductDTO;

    constructor() { }

    ngOnInit(): void {
    }
}
