import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO } from 'src/app/models/Product';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    @Input() products: ProductDTO[] = [];
    @Input() productsPerLine: number = 5;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
    }
}
