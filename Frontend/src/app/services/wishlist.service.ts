import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
    BehaviorSubject,
    Observable,
    of
} from 'rxjs';
import {
    catchError,
    map
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductDTO, ProductInWishlist } from '../models/Product';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    baseUrl = environment.apiUrl + 'customer/wishlist/';
    wishlist = new BehaviorSubject<ProductInWishlist[]>(JSON.parse(this.getLocalWishlist()));

    constructor(
      private toastr: ToastrService,
      private http: HttpClient,
      private auth: AuthService
    ) {
        this.auth.isLoggedInSub.subscribe(
            isLoggedIn => {
                if (isLoggedIn) {
                    this.getRemoteWishlist().subscribe(
                        data => this.updateWishlist(data),
                        error => console.error(error)
                    );

                    this.wishlist.subscribe(
                        () => this.SaveWishlistToDb().subscribe()
                    );
                }
            }
        );
    }

    getRemoteWishlist(): Observable<ProductInWishlist[]> {
        return this.http.get<{products: ProductInWishlist[]}>(this.baseUrl)
            .pipe(map(response => response.products));
    }

    addToWishlist(product: ProductDTO) {
        this.add({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0].url
        });
    }

    add(item: ProductInWishlist): void {
        if (this.isInWishlist(item.id)) return;
        const newWishlist = this.wishlist.getValue();
        newWishlist.push(item);
        this.updateWishlist(newWishlist);
        this.toastr.success('Successfully added to the wishlist');
    }

    removeItem(id: string): void {
        this.updateWishlist(
            this.wishlist.getValue().filter((i: ProductInWishlist) => i.id !== id)
        );
    }

    isInWishlist(id: string): boolean {
        return !!this.wishlist.getValue().find((i) => i.id === id);
    }

    updateWishlist(wishlist: ProductInWishlist[] | []): void {
        this.wishlist.next(wishlist);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    getLocalWishlist(): string {
        return localStorage.getItem('wishlist') || '[]';
    }

    getCount(): Observable<number> {
        return this.wishlist.pipe(map(wishlist => wishlist.length));
    }

    SaveWishlistToDb(): Observable<any> {
        return this.http.post(this.baseUrl, { products: this.wishlist.getValue() })
            .pipe(
                catchError(
                    (error) => {
                        console.error(error);
                        return of(null);
                    }
                )
            );
    }
}
