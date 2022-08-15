import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-top-section',
    templateUrl: './top-section.component.html',
    styleUrls: ['./top-section.component.scss']
})
export class TopSectionComponent implements OnInit {
    topRated = [1, 2, 3, 4];
    topSales = [1, 2, 3, 4];
    topDiscounts = [1, 2, 3, 4];

    constructor() { }

    ngOnInit(): void {
    }

}
