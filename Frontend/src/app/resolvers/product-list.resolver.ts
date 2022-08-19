import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve
} from '@angular/router';
import {
    Observable
} from 'rxjs';
import { PLP } from '../models/Product';
import { ProductService } from '../services/product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductListResolver implements Resolve<PLP> {
    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<PLP> {
        return this.productService.getProducts(
            route.queryParams?.categories,
            route.queryParams?.labels,
            route.queryParams?.title,
            route.queryParams?.amount ?? 16,
            route.queryParams?.page
        );
    }
}
