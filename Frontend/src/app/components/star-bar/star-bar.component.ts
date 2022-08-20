import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-star-bar',
    templateUrl: './star-bar.component.html',
    styleUrls: ['./star-bar.component.scss']
})
export class StarBarComponent implements OnInit {
    @Input() stars: number = 0;

    constructor() { }

    ngOnInit(): void {
    }
}
