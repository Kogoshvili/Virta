import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
    Observable,
    of
} from 'rxjs';
import {
    catchError,
    map
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiHelper } from '../helper/api.service';
import {
    ProductDTO,
    ProductImage
} from '../models/Product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = environment.apiUrl + 'products/';
    private defaultImage: ProductImage = {
        id: 0,
        primary: true,
        url: 'https://picsum.photos/450/600'
    };

    constructor(
        private http: HttpClient,
        private toastr: ToastrService
    ) { }

    getProducts(categories: string | string[] | null = null, labels: number | number[] | null = null, title: string | null = null, amount: number = 10): Observable<ProductDTO[]> {
        const query = ApiHelper.queryBuilder([
            {
                name: 'categories',
                value: categories
            },
            {
                name: 'labels',
                value: labels
            },
            {
                name: 'title',
                value: title
            },
            {
                name: 'amount',
                value: amount
            }
        ]);

        return this.http.get<ProductDTO[]>(this.baseUrl + query)
            .pipe(
                catchError(
                    error => {
                        this.toastr.error('Problem retrieving data');
                        console.error(error);
                        return [];
                    }
                )
            );
    }

    getProduct(id: string): Observable<ProductDTO | null> {
        return this.http.get<ProductDTO>(this.baseUrl + id)
            .pipe(
                map(
                    response => ({
                        ...response,
                        attributes: response.attributes?.sort((a, b) => b.priority - a.priority),
                        images: response.images.length > 0 ? response.images : [
                            this.defaultImage,
                            this.defaultImage,
                            this.defaultImage,
                            this.defaultImage,
                            this.defaultImage,
                            this.defaultImage,
                            this.defaultImage
                        ]
                    })
                ),
                catchError(
                    error => {
                        console.error(error);
                        return of(null);
                    }
                )
            );
    }
}
