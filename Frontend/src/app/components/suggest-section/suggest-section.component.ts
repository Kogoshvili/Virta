import { Component, Input, OnInit } from '@angular/core';
import { SplideOptions } from '@splidejs/splide';
import { CategoryService } from 'src/app/services/category.service';

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

    @Input() suggestions: { url: string, image: string, label: string, count: number }[] = [];

    constructor(
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(
            categories => this.suggestions = categories.map(category => ({
                url: category.name,
                image: category.bannerSmall,
                label: category.title,
                count: category.productCount
            }))
        );
    }

}
