import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryDTO } from '../models/Category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private baseUrl = environment.apiUrl + 'categories/';

    constructor(
        private http: HttpClient
    ) { }

    getCategories(length: number = 10): Observable<CategoryDTO[]> {
        return this.http.get<CategoryDTO[]>(this.baseUrl + length);
    }
}
