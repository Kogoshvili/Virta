import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LabelDTO } from '../models/Filters';

@Injectable({
    providedIn: 'root'
})
export class FiltersService {
    private baseUrl = environment.apiUrl + 'filters/labels/';

    constructor(
        private http: HttpClient
    ) { }

    getLabels(): Observable<LabelDTO[]> {
        return this.http.get<LabelDTO[]>(this.baseUrl);
    }

    // getRatings(){}
}
