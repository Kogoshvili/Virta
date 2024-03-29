import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import {
    BehaviorSubject,
    of
} from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {
    catchError,
    map
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
    AuthTokenDTO,
    User
} from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl = environment.apiUrl + 'auth/';
    isLoggedIn = new BehaviorSubject<boolean>(false);
    jwtHelper = new JwtHelperService();
    decodedToken: any;

    constructor(
        private http: HttpClient,
        private toastr: ToastrService
    ) {
        const localToken = this.getLocalTokenString();
        if (localToken) {
            this.decodedToken = this.jwtHelper.decodeToken(localToken);
            this.isLoggedIn.next(true);
        }
    }

    login(user: User): Observable<void | null> {
        return this.http.post<AuthTokenDTO>(this.baseUrl + 'login', user)
            .pipe(
                map(
                    response => {
                        this.toastr.success('Successful Authentication');
                        localStorage.setItem('token', response.token);
                        this.decodedToken = this.jwtHelper.decodeToken(response.token);
                        this.isLoggedIn.next(true);
                    }
                ),
                catchError(error => {
                    this.toastr.error(error.error);
                    console.error(error);
                    return of(null);
                })
            );
    }

    register(user: User): Observable<void | null> {
        return this.http.post<AuthTokenDTO>(this.baseUrl + 'register', user)
            .pipe(
                map(
                    response => {
                        this.toastr.success('Successful Registration');
                        localStorage.setItem('token', response.token);
                        this.decodedToken = this.jwtHelper.decodeToken(response.token);
                        this.isLoggedIn.next(true);
                    }
                ),
                catchError(error => {
                    error.error.forEach((e: any) => this.toastr.error(e.description));
                    console.error(error);
                    return of(null);
                })
            );
    }

    logOut(): void {
        this.isLoggedIn.next(false);
        localStorage.removeItem('token');
    }

    getDecodedToken() {
        return JSON.parse(atob(this.getLocalTokenString().split('.')[1]));
    }

    getLocalTokenString(): string {
        return localStorage.getItem('token') || '';
    }
}
