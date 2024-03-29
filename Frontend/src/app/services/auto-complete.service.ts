import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Product';

@Injectable({
    providedIn: 'root'
})
export class AutoCompleteService {
    private baseUrl = environment.apiUrl + 'autocomplete/';

    constructor(
        private http: HttpClient
    ) { }

    search(category: string): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl + 'categories/' + category);
    }
}
