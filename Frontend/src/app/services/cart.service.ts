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
import { ProductDTO, ProductInCart } from '../models/Product';
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

                    this.cart.subscribe(
                        () => this.SaveCartToDb().subscribe()
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
        return this.cart.pipe(map((cart: ProductInCart[]) => cart.length));
    }

    watchStorage(): Observable<any> {
        return this.cart;
    }

    addItem(item: ProductDTO, quantity: number = 1): void {
        if (this.isItemInCart(item.id)) {
            this.changeQuantityBy(item.id, quantity);
            return;
        }

        const newCart = this.cart.getValue();
        newCart.push({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: quantity,
            image: item.images[0].url
        });
        this.updateCart(newCart);
        this.toastr.success('Successfully added');
    }

    removeItem(id: string): void {
        this.updateCart(
            this.cart.getValue().filter((i: ProductInCart) => i.id !== id)
        );
    }

    changeQuantityBy(productId: string, quantity: number): void {
        const cart = this.cart.getValue();
        const index = cart.findIndex((i: ProductInCart) => i.id === productId);
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
        return !!this.cart.getValue().find((i) => i.id === id);
    }

    updateCart(newCart: ProductInCart[] | []): void {
        this.cart.next(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    SaveCartToDb(): Observable<any> {
        return this.http.post(this.baseUrl, { products: this.cart.getValue() })
            .pipe(
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
