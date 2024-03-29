import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
    forkJoin,
    Observable,
    of
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Filters } from '../models/Filters';
import { CategoryService } from '../services/category.service';

@Injectable({
    providedIn: 'root'
})
export class FiltersResolver implements Resolve<Filters> {
    constructor(
        private categoryService: CategoryService,
        private toastr: ToastrService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Filters> {
        const categories = this.categoryService.getCategories()
            .pipe(
                catchError(
                    error => {
                        this.toastr.error('Problem retrieving data');
                        console.error(error);
                        return [];
                    }
                )
            );

        const attributes = of([]);

        return forkJoin({
            categories: categories,
            attributes: attributes
        });
    }
}
