import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
    BehaviorSubject,
    Observable
} from 'rxjs';
import {
    map
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductDTO, ProductInWishlist } from '../models/Product';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    baseUrl = environment.apiUrl + 'customer/wishlist';
    wishlist = new BehaviorSubject<ProductInWishlist[]>(JSON.parse(this.getLocalWishlist()));

    constructor(
      private toastr: ToastrService,
      private http: HttpClient,
      private auth: AuthService
    ) {
        this.auth.isLoggedIn.subscribe(
            isLoggedIn => {
                if (isLoggedIn) {
                    this.getRemoteWishlist().subscribe(
                        data => {
                            const mergedWishlist = [...this.wishlist.value, ...data].reduce(
                                (acc, cur) => {
                                    const exists = acc.find(i => i.productId === cur.productId);
                                    if (exists) return acc;
                                    return [...acc, cur];
                                }, [] as ProductInWishlist[]
                            );
                            this.updateWishlist(mergedWishlist);
                        },
                        error => console.error(error)
                    );
                } else {
                    this.clearWishlist();
                }
            }
        );

        this.wishlist.subscribe(
            (wishlist) => {
                if (this.auth.isLoggedIn.value) {
                    this.SaveWishlistToDb(wishlist);
                }
            }
        );
    }

    addToWishlist(product: ProductDTO) {
        this.add({
            productId: product.id,
            title: product.title,
            price: product.price,
            unit: product.unit,
            imageUrl: product.images[0]?.url
        });
    }

    add(item: ProductInWishlist): void {
        if (this.isInWishlist(item.productId)) return;
        const newWishlist = this.wishlist.getValue();
        newWishlist.push(item);
        this.updateWishlist(newWishlist);
        this.toastr.success('Successfully added to the wishlist');
    }

    removeItem(id: string): void {
        this.updateWishlist(
            this.wishlist.getValue().filter((i: ProductInWishlist) => i.productId !== id)
        );
    }

    isInWishlist(id: string): boolean {
        return !!this.wishlist.getValue().find((i) => i.productId === id);
    }

    updateWishlist(wishlist: ProductInWishlist[]): void {
        this.wishlist.next(wishlist);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    clearWishlist(): void {
        this.wishlist.next([]);
        localStorage.removeItem('wishlist');
    }

    getCount(): Observable<number> {
        return this.wishlist.pipe(map(wishlist => wishlist.length));
    }

    getLocalWishlist(): string {
        return localStorage.getItem('wishlist') || '[]';
    }

    getRemoteWishlist(): Observable<ProductInWishlist[]> {
        return this.http.get<{ products: ProductInWishlist[] }>(this.baseUrl)
            .pipe(map(response => response.products));
    }

    SaveWishlistToDb(wishlist: ProductInWishlist[]): void {
        this.http.post(
            this.baseUrl,
            { productIds: wishlist.map(i => i.productId) }
        ).toPromise();
    }
}
