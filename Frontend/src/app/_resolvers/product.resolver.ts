import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable,
    of } from 'rxjs';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<Product | null> {
    constructor(
        private productService: ProductService,
        private toastr: ToastrService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Product | null> {
        return this.productService.getProduct(route.params.id)
            .pipe(
                catchError(error => {
                    this.toastr.error('Problem retrieving data');
                    console.error(error);
                    return of(null);
                })
            );
    }
}
