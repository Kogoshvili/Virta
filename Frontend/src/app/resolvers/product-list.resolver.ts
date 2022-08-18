import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve
} from '@angular/router';
import {
    Observable
} from 'rxjs';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductListResolver implements Resolve<Product[]> {
    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
        return this.productService.getProducts(
            route.queryParams?.categories,
            route.queryParams?.labels,
            route.queryParams?.title,
            16
        );
    }
}
