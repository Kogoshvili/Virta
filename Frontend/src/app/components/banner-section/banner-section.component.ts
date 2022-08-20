import { Component, Input, OnInit } from '@angular/core';
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
    @Input() slides = [
        { url: '#', image: 'assets/img/slider/slider-3.jpg' },
        { url: '#', image: 'assets/img/slider/slider-3.jpg' }
    ];
    @Input() sideBanners = [
        { url: '#', image: 'assets/img/banner/6.jpg' },
        { url: '#', image: 'assets/img/banner/6.jpg' }
    ];

    constructor() { }

    ngOnInit(): void {
    }
}
