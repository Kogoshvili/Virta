import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-account-card',
    templateUrl: './account-card.component.html',
    styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent {
    @Input() title = 'Account Card';

    constructor() { }
}
