import { Component, Input, OnInit } from '@angular/core';

type PromoItems = [] | [ PromoItem, PromoItem ] | [ PromoItem, PromoItem, PromoItem ];
type PromoItem = { url: string, image: string };

@Component({
    selector: 'app-promo-section',
    templateUrl: './promo-section.component.html',
    styleUrls: ['./promo-section.component.scss']
})
export class PromoSectionComponent implements OnInit {
    @Input() items: PromoItems = [];

    constructor() { }

    ngOnInit(): void {
    }
}
