import {
    Component,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import { PageState } from 'src/app/components/entry/entry.component';
import { AuthService } from 'src/app/services/auth.service';
import { AppStore } from 'src/app/store/app.store';
import { setLoadingScreen } from 'src/app/store/general/general.actions';

@Component({
    selector: 'app-account-page',
    templateUrl: './account-page.component.html',
    styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
    isOpen = false;
    PageState = PageState;

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppStore>,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe(
            data => {
                this.store.dispatch(setLoadingScreen({ loadingScreen: false }));
            }
        );
    }

    logOut(): void {
        this.authService.logOut();
        this.router.navigate(['/']);
    }

    openEntry() {
        this.isOpen = !this.isOpen;
    }
}
