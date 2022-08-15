import { Component, Input, OnInit } from '@angular/core';
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
        autoplay: true,
        perMove: 1
    };

    @Input() suggestions = [
        { url: '#', image: 'assets/img/suggest/02.jpg', label: 'Fresh Vegetables', count: 120 },
        { url: '#', image: 'assets/img/suggest/02.jpg', label: 'Fruits & Juice', count: 105 },
        { url: '#', image: 'assets/img/suggest/02.jpg', label: 'Groceries', count: 50 },
        { url: '#', image: 'assets/img/suggest/02.jpg', label: 'Dairy & Eggs', count: 20 },
        { url: '#', image: 'assets/img/suggest/02.jpg', label: 'Sea Foods & Fishes', count: 80 },
        { url: '#', image: 'assets/img/suggest/02.jpg', label: 'Drinks', count: 10 },
        { url: '#', image: 'assets/img/suggest/02.jpg', label: 'Dry Foods', count: 8 }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
