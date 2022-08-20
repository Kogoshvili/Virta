import { createSelector } from '@ngrx/store';
import { AppStore } from '../app.store';

export const selectLoadingScreen = createSelector(
    (state: AppStore) => state.general.loadingScreen,
    (loading: boolean) => loading
);

export const selectLocation = createSelector(
    (state: AppStore) => state.general.location,
    (location: { offsetLeft: number, offsetTop: number}) => location
);

export const selectIsSideCategory = createSelector(
    (state: AppStore) => state.general.isSideCategory,
    (isSideCategory: boolean) => isSideCategory
);

export const selectIsSideCart = createSelector(
    (state: AppStore) => state.general.isSideCart,
    (isSideCart: boolean) => isSideCart
);

