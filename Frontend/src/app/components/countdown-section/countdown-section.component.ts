import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-countdown-section',
    templateUrl: './countdown-section.component.html',
    styleUrls: ['./countdown-section.component.scss']
})
export class CountdownSectionComponent implements OnInit {
    promotion = {
        title: '40% discount offer over all our items',
        description: 'There are many variations of passages of orem psum available but the majority <br> have suffered alteration in some form by injected humour.',
        image: 'assets/img/countdown.png',
        deadline: '30/12/2024',
        badge: '<span>40%</span><span>off</span>'
    };

    constructor() { }

    ngOnInit(): void {
    }

}
