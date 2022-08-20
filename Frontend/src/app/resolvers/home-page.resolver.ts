import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PLP } from '../models/Product';
import { ProductService } from '../services/product.service';

@Injectable({
    providedIn: 'root'
})
export class HomePageResolver implements Resolve<PLP> {

    constructor(
        private toastr: ToastrService,
        private productService: ProductService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PLP> {
        return this.productService.getProducts(null, null, null, 10, 1);
    }
}
