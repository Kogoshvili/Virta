import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleIsSideCart } from 'src/app/store/general/general.actions';
import { selectIsSideCart } from 'src/app/store/general/general.selectors';
import { AppStore } from '../../store/app.store';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.scss']
})
export class SideCartComponent implements OnInit {
    isSideCart$ = this.store.select(selectIsSideCart);

    constructor(
        private store: Store<AppStore>
    ) { }

    ngOnInit(): void {
    }

    toggleSideCart(): void {
        this.store.dispatch(toggleIsSideCart());
    }
}
