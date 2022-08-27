import { Component, Input, OnInit } from '@angular/core';



@Component({
    selector: 'app-payment-card',
    templateUrl: './payment-card.component.html',
    styleUrls: ['./payment-card.component.scss']
})
export class PaymentCardComponent implements OnInit {
    @Input() owner = '';
    @Input() last4 = '1111';
    @Input() type = 'visa';
    cardLogos: { [key: string]: string } = {
        paypal: 'assets/img/payment/01.png',
        visa: 'assets/img/payment/02.png',
        mastercard: 'assets/img/payment/03.png'
    };

    constructor() { }

    ngOnInit(): void {
    }

    cardLogo(): string {
        return this.cardLogos[this.type];
    }
}
