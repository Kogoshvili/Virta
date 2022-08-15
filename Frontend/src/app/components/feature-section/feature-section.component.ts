import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-feature-section',
    templateUrl: './feature-section.component.html',
    styleUrls: ['./feature-section.component.scss']
})
export class FeatureSectionComponent implements OnInit {
    features = [0, 1, 2, 3, 4, 5];
    constructor() { }

    ngOnInit(): void {
    }

}
