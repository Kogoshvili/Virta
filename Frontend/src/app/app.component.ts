import {
    Component, ViewEncapsulation
} from '@angular/core';
import {
    ActivationEnd,
    ActivationStart,
    Router,
    RouterOutlet
} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { slider } from './animations';
import { AppStore } from './store/app.store';
import { closeAllSides, setLoadingScreen } from './store/general/general.actions';
import {
    selectLoadingScreen,
    selectLocation
} from './store/general/general.selectors';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        slider
    ]
})
export class AppComponent {
    title = 'Virta';
    location$ = this.store.select(selectLocation);
    loadingScreen$ = this.store.select(selectLoadingScreen);
    location: object|null = null;
    previousAnimation: string = '';

    constructor(
        private store: Store<AppStore>,
        private router: Router,
        private modalService: NgbModal
    ){
        this.router.events.subscribe(() => {
            this.modalService.dismissAll('route change');
            this.store.dispatch(closeAllSides());
        });

        this.router.events.subscribe(
            (event: any) => {
                if (event instanceof ActivationStart) {
                    const isAnimated =
                        (event.snapshot.data.animation === 'PDP' && this.previousAnimation === 'PLP')
                        || (event.snapshot.data.animation === 'PLP' && this.previousAnimation === 'PDP');
                    this.store.dispatch(setLoadingScreen({ loadingScreen: !isAnimated }));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }

                if (event instanceof ActivationEnd) {
                    this.previousAnimation = event.snapshot.data.animation;
                };

                // if (event instanceof NavigationStart) {
                // }

                // if (event instanceof NavigationEnd || event instanceof NavigationError) {
                // }
            }
        );
    }

    prepareRoute(outlet: RouterOutlet) {
        if (!this.location) return false;

        return {
            value: outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation,
            params: this.location
        };
    }
}
