import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() totalCount: number = 0;
    pages: string[] = [];
    perPage: number = 16;
    currentPage: number = 1;
    lastPage: number = 1;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.perPage = +params.amount || this.perPage;
            this.currentPage = +params.page || this.currentPage;
        });

        this.route.data.subscribe(
            data => {
                if (data.products.totalCount > this.perPage) {
                    const lastPage = Math.ceil(data.products.totalCount / this.perPage);
                    const prevPages = Array.from(Array(2).keys(), (x, i) => (this.currentPage - (i + 1)).toString()).reverse().filter(x => +x > 0);
                    const nextPages = Array.from(Array(2).keys(), (x, i) => (this.currentPage + (i + 1)).toString()).filter(x => +x < lastPage);
                    this.pages = [
                        ...prevPages,
                        this.currentPage.toString(),
                        ...nextPages
                    ];
                    if (this.currentPage + 3 < lastPage) this.pages.push('...');
                    if (this.currentPage < lastPage) this.pages.push(lastPage.toString());
                }
            }
        );
    }

    onPageClick(page: number) {
        this.router.navigate(
            ['/products'],
            {
                queryParams: { page: page },
                queryParamsHandling: 'merge'
            }
        );
    }
}
