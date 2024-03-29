import {
    createAction,
    props
} from '@ngrx/store';

export const generalGenerals = createAction(
    '[General] General Generals'
);

export const setProductCardLocation = createAction(
    '[General] setProductCardLocation',
    props<{ location: { offsetLeft: number; offsetTop: number} }>()
);

export const setLoadingScreen = createAction(
    '[General] setLoadingScreen',
    props<{ loadingScreen: boolean }>()
);

export const toggleLoadingScreen = createAction('[General] toggleLoadingScreen');
export const toggleIsSideCategory = createAction('[General] toggleIsSideCategory');
export const toggleIsSideCart = createAction('[General] toggleIsSideCart');
export const toggleIsMobileMenu = createAction('[General] toggleIsMobileMenu');

export const closeAllSides = createAction('[General] closeAllSides');
