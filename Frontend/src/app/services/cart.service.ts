import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductDTO, ProductInCart, ProductInWishlist } from '../models/Product';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    baseUrl = environment.apiUrl + 'customer/cart/';
    cart = new BehaviorSubject<ProductInCart[]>(JSON.parse(this.getLocalCart()));

    constructor(
        private toastr: ToastrService,
        private http: HttpClient,
        private auth: AuthService
    ) {
        this.auth.isLoggedIn.subscribe(
            isLoggedIn => {
                if (isLoggedIn) {
                    this.getRemoteCart().subscribe(
                        data => {
                            const mergedCart = [...this.cart.value, ...data].reduce(
                                (acc, cur) => {
                                    const existing = acc.find(i => i.productId === cur.productId);
                                    if (existing) {
                                        existing.quantity = existing.quantity > cur.quantity
                                            ? existing.quantity
                                            : cur.quantity;
                                        return acc;
                                    }
                                    return [...acc, cur];
                                }, [] as ProductInCart[]
                            );

                            this.updateCart(mergedCart);
                        },
                        error => console.error(error)
                    );
                } else {
                    this.clearCart();
                }
            }
        );

        this.cart.subscribe(
            cart => {
                if (this.auth.isLoggedIn.value) {
                    this.SaveCartToDb(cart);
                }
            }
        );
    }

    getCount(): Observable<number> {
        return this.cart.pipe(map(cart => cart.length));
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
            imageUrl: product.images[0]?.url
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

    isItemInCart(id: string): boolean {
        return !!this.cart.getValue().find((i) => i.productId === id);
    }

    updateCart(newCart: ProductInCart[] | []): void {
        this.cart.next(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    clearCart(): void {
        this.cart.next([]);
        localStorage.removeItem('cart');
    }

    SaveCartToDb(cart: ProductInCart[]): void {
        this.http.post(
            this.baseUrl, {
                products: cart.map(i => ({
                    productId: i.productId,
                    quantity: i.quantity
                }))
            }
        ).toPromise();
    }

    getRemoteCart(): Observable<ProductInCart[]> {
        return this.http.get<{products: ProductInCart[]}>(this.baseUrl)
            .pipe(map(response => response.products));
    }

    getLocalCart(): string {
        return localStorage.getItem('cart') || '[]';
    }
}
