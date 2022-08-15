import { Component, OnInit } from '@angular/core';
import { SplideOptions } from '@splidejs/splide';

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

    constructor() { }

    ngOnInit(): void {
    }

}
