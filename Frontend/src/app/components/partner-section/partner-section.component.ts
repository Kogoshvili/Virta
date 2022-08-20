import { Component, OnInit } from '@angular/core';
import { SplideOptions } from '@splidejs/splide';

@Component({
    selector: 'app-partner-section',
    templateUrl: './partner-section.component.html',
    styleUrls: ['./partner-section.component.scss']
})
export class PartnerSectionComponent implements OnInit {
    sliderOptions: SplideOptions = {
        type: 'loop',
        gap: '24px',
        autoplay: true,
        perPage: 6,
        pagination: false,
        perMove: 1
    };
    partners = [
        { url: '#', image: 'assets/img/brand/01.png' },
        { url: '#', image: 'assets/img/brand/01.png' },
        { url: '#', image: 'assets/img/brand/01.png' },
        { url: '#', image: 'assets/img/brand/01.png' },
        { url: '#', image: 'assets/img/brand/01.png' },
        { url: '#', image: 'assets/img/brand/01.png' },
        { url: '#', image: 'assets/img/brand/01.png' },
        { url: '#', image: 'assets/img/brand/01.png' }
    ];

    constructor() { }

    ngOnInit(): void {
    }
}
