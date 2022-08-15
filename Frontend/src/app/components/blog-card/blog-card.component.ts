import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-blog-card',
    templateUrl: './blog-card.component.html',
    styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
    blog = {
        title: 'There are many variations of passages the majority have suffered',
        description: 'That are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        image: 'assets/img/blog/1.jpg',
        author: 'Admin',
        comments: 10,
        date: 'June 02, 2021'
    };

    constructor() { }

    ngOnInit(): void {
    }

}
