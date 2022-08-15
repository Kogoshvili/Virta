import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-trending-section',
    templateUrl: './trending-section.component.html',
    styleUrls: ['./trending-section.component.scss']
})
export class TrendingSectionComponent implements OnInit {
    trending = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    constructor() { }

    ngOnInit(): void {
    }

}
