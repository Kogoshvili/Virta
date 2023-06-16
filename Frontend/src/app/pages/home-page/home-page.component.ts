/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {
    Component,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductDTO } from 'src/app/models/Product';
import { AppStore } from 'src/app/store/app.store';
import { setLoadingScreen } from 'src/app/store/general/general.actions';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    products: ProductDTO[] = [];

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppStore>
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe(
            data => {
                this.products = data.products;
                this.store.dispatch(setLoadingScreen({ loadingScreen: false }));
            }
        );
    }
}
