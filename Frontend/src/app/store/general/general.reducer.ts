/* eslint-disable ngrx/on-function-explicit-return-type */
import {
    createReducer,
    on
} from '@ngrx/store';
import { GeneralState } from './general';
import {
    closeAllSides,
    setLoadingScreen,
    setProductCardLocation,
    toggleIsMobileMenu,
    toggleIsSideCart,
    toggleIsSideCategory,
    toggleLoadingScreen
} from './general.actions';

export const initialState: GeneralState = {
    loadingScreen: false,
    location: {
        offsetLeft: 0,
        offsetTop: 0
    },
    isSideCategory: false,
    isSideCart: false,
    isMobileMenu: false
};

export const reducer = createReducer(
    initialState,
    on(setProductCardLocation, (state, action) => ({ ...state, location: action.location })),
    on(setLoadingScreen, (state, action) => ({ ...state, loadingScreen: action.loadingScreen })),
    on(toggleLoadingScreen, (state) => ({ ...state, loadingScreen: !state.loadingScreen })),
    on(toggleIsSideCategory, (state) => ({ ...state, isSideCategory: !state.isSideCategory })),
    on(toggleIsSideCart, (state) => ({ ...state, isSideCart: !state.isSideCart })),
    on(toggleIsMobileMenu, (state) => ({ ...state, isMobileMenu: !state.isMobileMenu })),
    on(closeAllSides, (state) => ({ ...state, isSideCategory: false, isSideCart: false, isMobileMenu: false }))
);

export function generalReducer(state: any, action: any) {
    return reducer(state, action);
}
