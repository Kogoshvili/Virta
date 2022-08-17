import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Injectable({
    providedIn: 'root'
})
export class HomePageResolver implements Resolve<Product[]> {

    constructor(
        private toastr: ToastrService,
        private productService: ProductService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
        return this.productService.getProducts(null, null, null, 10)
            .pipe(
                catchError(error => {
                    this.toastr.error('Problem retrieving data');
                    console.error(error);
                    return [];
                })
            );
    }
}
