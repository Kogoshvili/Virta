import { Component, OnInit } from '@angular/core';
import { SplideOptions } from '@splidejs/splide';

@Component({
    selector: 'app-suggest-section',
    templateUrl: './suggest-section.component.html',
    styleUrls: ['./suggest-section.component.scss']
})
export class SuggestSectionComponent implements OnInit {
    sliderOptions: SplideOptions = {
        perPage: 5,
        type: 'loop',
        gap: '20px',
        pagination: false,
        autoplay: true
    };

    constructor() { }

    ngOnInit(): void {
    }

}
