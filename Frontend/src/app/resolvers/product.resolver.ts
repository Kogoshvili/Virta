import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, Resolve
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
    Observable,
    of
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductDTO } from '../models/Product';
import { ProductService } from '../services/product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductDTO | null> {
    constructor(
        private productService: ProductService,
        private toastr: ToastrService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ProductDTO | null> {
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
