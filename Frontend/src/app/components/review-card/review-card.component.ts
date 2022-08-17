import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-review-card',
    templateUrl: './review-card.component.html',
    styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {
    review = {
        author: 'John Doe',
        stars: 4,
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: 'May 06, 2021'
    };

    constructor() { }

    ngOnInit(): void {
    }

}
