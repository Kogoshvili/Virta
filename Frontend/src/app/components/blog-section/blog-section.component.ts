import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-blog-section',
    templateUrl: './blog-section.component.html',
    styleUrls: ['./blog-section.component.scss']
})
export class BlogSectionComponent implements OnInit {
    blogs = [1, 2, 3];

    constructor() { }

    ngOnInit(): void {
    }

}
