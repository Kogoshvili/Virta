import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Filters
} from 'src/app/_models/filters';

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
    @Input() filters: Filters = { categories: [], attributes: [] };
    activeCategory: string = '';

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(
            params => this.activeCategory = params.category || ''
        );
    }
}
