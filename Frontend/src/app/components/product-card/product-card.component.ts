import {
    Component,
    ElementRef, Input, OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/store/app.store';
import { setProductCardLocation } from 'src/app/store/general/general.actions';
import { selectLocation } from 'src/app/store/general/general.selectors';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    // @Input() product!: Product;
    location$ = this.store.select(selectLocation);
    text: any = [];
    @Input() product = {
        title: 'Fresh Organic Apple',
        image: 'assets/img/product/05.png',
        label: 'new',
        video: '',
        reviews: 4,
        stars: 4,
        price: '$1.99',
        oldPrice: '$2.99',
        units: 'kg'
    };

    constructor(
        private store: Store<AppStore>,
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
    }

    onClick(): void {
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        this.store.dispatch(setProductCardLocation({
            location:
                {
                    offsetLeft: rect.left + window.pageXOffset,
                    offsetTop: rect.top + window.pageYOffset
                }
        }));
    }
}

