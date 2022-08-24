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
import { ProductDTO, ProductInCart, ProductInWishlist } from '../models/Product';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    // private hubConnection: HubConnection | undefined;
    // hubUrl = environment.hubUrl + 'customer';
    baseUrl = environment.apiUrl + 'customer/cart/';
    cart = new BehaviorSubject<ProductInCart[]>(JSON.parse(this.getLocalCart()));

    constructor(
        private toastr: ToastrService,
        private http: HttpClient,
        private auth: AuthService
    ) {
        this.auth.isLoggedInSub.subscribe(
            isLoggedIn => {
                if (isLoggedIn) {
                    this.getRemoteCart().subscribe(
                        data => this.updateCart(data),
                        error => console.error(error)
                    );
                }
            }
        );
    }

    // createHubConnection() {
    //     this.hubConnection = new HubConnectionBuilder()
    //         .withUrl(this.hubUrl, {
    //             accessTokenFactory: () => this.auth.getLocalTokenString()
    //         })
    //         .withAutomaticReconnect()
    //         .build();

    //     this.hubConnection.start()
    //         .catch((error: any)  => console.error(error));

    //     this.hubConnection.on('OnCartUpdate',
    //         (data: any) => {
    //             console.log('Triggered');
    //             this.getRemoteCart().subscribe(
    //                 data => {
    //                     this.updateCart(data as ProductInCart[]);
    //                 },
    //                 error => {
    //                     console.error(error);
    //                 }
    //             );
    //         }
    //     );
    // }

    // stopHubConnection() {
    //     if (this.hubConnection) {
    //         this.hubConnection.stop();
    //     }
    // }

    getCount(): Observable<number> {
        return this.cart.pipe(map(cart => cart.length));
    }

    watchStorage(): Observable<any> {
        return this.cart;
    }

    copyToCart(product: ProductInWishlist): void {
        this.add({ ...product, quantity: 1 });
    }

    addToCart(product: ProductDTO, quantity: number = 1): void {
        this.add({
            productId: product.id,
            title: product.title,
            price: product.price,
            unit: product.unit,
            quantity: quantity,
            imageUrl: product.images[0].url
        });
    }

    add(item: ProductInCart, quantity: number = 1): void {
        if (this.isItemInCart(item.productId)) {
            this.changeQuantityBy(item.productId, quantity);
            return;
        }

        const newCart = this.cart.getValue();
        newCart.push(item);
        this.updateCart(newCart);
        this.toastr.success('Successfully added');
    }

    removeItem(id: string): void {
        this.updateCart(
            this.cart.getValue().filter((i: ProductInCart) => i.productId !== id)
        );
    }

    changeQuantityBy(productId: string, quantity: number): void {
        const cart = this.cart.getValue();
        const index = cart.findIndex((i: ProductInCart) => i.productId === productId);
        if (index === -1) return;

        const item = cart[index];

        if (item.quantity === 1 && quantity === -1) {
            this.removeItem(productId);
            return;
        }

        cart[index] = {
            ...item,
            quantity: item.quantity += quantity
        };

        this.updateCart(cart);
        this.toastr.success('Quantity Successfully Changed');
    }

    getRemoteCart(): Observable<ProductInCart[]> {
        return this.http.get<{products: ProductInCart[]}>(this.baseUrl)
            .pipe(map(response => response.products));
    }

    isItemInCart(id: string): boolean {
        return !!this.cart.getValue().find((i) => i.productId === id);
    }

    updateCart(newCart: ProductInCart[] | []): void {
        this.cart.next(newCart);
        this.SaveCartToDb().subscribe();
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    SaveCartToDb(): Observable<any> {
        const cart = this.cart.getValue();
        return this.http.post(
            this.baseUrl, {
                products: cart.map(i => ({
                    productId: i.productId,
                    quantity: i.quantity
                }))
            }).pipe(
            catchError(
                (error) => {
                    console.error(error);
                    return of(null);
                }
            )
        );
    }

    getLocalCart(): string {
        return localStorage.getItem('cart') || '[]';
    }
}
