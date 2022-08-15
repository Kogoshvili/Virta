import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-feature-card',
    templateUrl: './feature-card.component.html',
    styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent implements OnInit {
    product = {
        title: 'Fresh Organic Apple',
        description: 'There are many variations of passages available but the majority have suffered alteration in some form...',
        image: 'assets/img/product/08.png',
        price: '$1.99',
        oldPrice: '$2.99',
        unit: 'kg',
        reviews: 4,
        stars: 4,
        label: 'Feature',
        video: '#'
    };

    constructor() { }

    ngOnInit(): void {
    }

}
