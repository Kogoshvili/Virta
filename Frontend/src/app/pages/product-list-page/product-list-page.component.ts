import {
    Component,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
// import { Filters } from 'src/app/models/filters';
import { ProductDTO } from 'src/app/models/Product';
import { AppStore } from 'src/app/store/app.store';
import { setLoadingScreen } from 'src/app/store/general/general.actions';

@Component({
    selector: 'app-product-list-page',
    templateUrl: './product-list-page.component.html',
    styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit {
    products: ProductDTO[] = [];
    // filters: Filters = { categories: [], attributes: [] };
    totalCount: number = 0;
    perPage: number = 16;
    currentPage: number = 1;

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppStore>
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe(
            data => {
                this.products = data.products.products;
                this.totalCount = data.products.totalCount;
                this.store.dispatch(setLoadingScreen({ loadingScreen: false }));
            }
        );

        this.route.queryParams.subscribe(params => {
            this.perPage = +params.amount || this.perPage;
            this.currentPage = +params.page || this.currentPage;
        });
    }

}
