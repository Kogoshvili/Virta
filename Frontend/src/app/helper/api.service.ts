import { Injectable } from '@angular/core';

interface ApiQueryObject {
    name: string;
    value: string | string[] | number | number[] | null;
}

@Injectable({
    providedIn: 'root'
})
export class ApiHelper {
    public static queryBuilder(query: ApiQueryObject[]): string {
        if (query.length < 0) return '';
        const queryLength: number = query.length;
        let result: string = '';

        query.forEach((param, index) => {
            if (index === 0) result += '?';

            if (param.value === null) return;

            if (Array.isArray(param.value)) {
                const length = param.value.length;

                result += param.value.map(v => String(v))
                    .reduce(
                        (acc: string, cur: string, i: number) => {
                            acc += `${param.name}=${cur}`;
                            if (i < length - 1) acc += '&';
                            return acc;
                        },
                        ''
                    );
            } else {
                result += `${param.name}=${param.value}`;
            }

            if (index < queryLength - 1) result += '&';
        });

        return result;
    }
}
