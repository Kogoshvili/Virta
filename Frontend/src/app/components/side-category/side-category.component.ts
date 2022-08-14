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
    categories = [
        {
            name: 'Fresh Vegetables',
            icon: 'flaticon-vegetable',
            active: false,
            children: [
                { name: 'carrot' },
                { name: 'broccoli' },
                { name: 'cauliflower' },
                { name: 'cucumber' },
            ]
        },
        {
            name: 'Meats',
            icon: 'flaticon-steak',
            active: false,
            children: [
                { name: 'carrot' },
                { name: 'broccoli' },
                { name: 'cauliflower' },
                { name: 'cucumber' },
            ]
        },
        {
            name: 'Dairy & Eggs',
            icon: 'flaticon-farm',
            active: false,
            children: [
                { name: 'carrot' },
                { name: 'broccoli' },
                { name: 'cauliflower' },
                { name: 'cucumber' },
            ]
        },
        {
            name: 'Sea foods & Fishes',
            icon: 'flaticon-crab',
            active: false,
            children: [
                { name: 'carrot' },
                { name: 'broccoli' },
                { name: 'cauliflower' },
                { name: 'cucumber' },
            ]
        },
        {
            name: 'Diet Foods',
            icon: 'flaticon-salad',
            active: false,
            children: [
                { name: 'carrot' },
                { name: 'broccoli' },
                { name: 'cauliflower' },
                { name: 'cucumber' },
            ]
        },
        {
            name: 'Dry Foods',
            icon: 'flaticon-dried-fruits',
            active: false,
            children: [
                { name: 'carrot' },
                { name: 'broccoli' },
                { name: 'cauliflower' },
                { name: 'cucumber' },
            ]
        },
        {
            name: 'Drinks',
            icon: 'flaticon-drinks',
            active: false,
            children: [
                { name: 'carrot' },
                { name: 'broccoli' },
                { name: 'cauliflower' },
                { name: 'cucumber' },
            ]
        }
    ];

    constructor(
        private store: Store<AppStore>
    ) {
    }

    ngOnInit(): void {
    }

    toggleSideCategory(): void {
        this.store.dispatch(toggleIsSideCategory());
    }

    expandCategory(name: string): void {
        this.categories.forEach(category => {
            if (category.name === name) {
                category.active = !category.active;
            }
        });
    }
}
