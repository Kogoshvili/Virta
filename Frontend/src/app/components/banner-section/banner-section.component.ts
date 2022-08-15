import { Component, OnInit } from '@angular/core';
import { SplideOptions } from '@splidejs/splide';

@Component({
    selector: 'app-banner-section',
    templateUrl: './banner-section.component.html',
    styleUrls: ['./banner-section.component.scss']
})
export class BannerSectionComponent implements OnInit {
    sliderOptions: SplideOptions = {
        type: 'loop',
        gap: '30px',
        autoplay: true
    };

    constructor() { }

    ngOnInit(): void {
    }
}
