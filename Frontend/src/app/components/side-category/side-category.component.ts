import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleIsSideCategory } from 'src/app/store/general/general.actions';
import { selectIsSideCategory } from 'src/app/store/general/general.selectors';
import { AppStore } from '../../store/app.store';

@Component({
  selector: 'app-side-category',
  templateUrl: './side-category.component.html',
  styleUrls: ['./side-category.component.scss']
})
export class SideCategoryComponent implements OnInit {
    isSideCategory$ = this.store.select(selectIsSideCategory);

    constructor(
        private store: Store<AppStore>
    ) {
    }

    ngOnInit(): void {
    }

    toggleSideCategory(): void {
        this.store.dispatch(toggleIsSideCategory());
    }
}
