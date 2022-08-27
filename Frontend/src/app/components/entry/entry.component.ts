import {
    Component, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

enum PageState {
    login,
    register,
    reset
}

@Component({
    selector: 'app-entry',
    templateUrl: './entry.component.html',
    styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
    user: User = {} as User;
    pageState: PageState = 0;
    isAccepted: boolean = false;

    constructor(
        private authService: AuthService,
        private toastr: ToastrService,
        private router: Router,
        private modalService: ModalService
    ) { }

    ngOnInit(): void {
        this.authService.isLoggedIn.subscribe(
            loggedIn => {
                if (loggedIn) {
                    this.modalService.dismiss('entry', 'success');
                }
            }
        );
    }

    changePageState(state: PageState): void {
        this.pageState = state;
    }
    // entryToggle(): void {
    //     if (!this.isLoggedIn) {
    //         this.isVisible = !this.isVisible;
    //     } else {
    //         this.router.navigate(['/my-account/']);
    //     }
    // }

    // toggleForm(): void {
    //     this.user.password = '';
    //     this.newUser = !this.newUser;
    // }

    login(): void {
        this.authService.login(this.user).subscribe();
    }

    register(): void {
        this.authService.register(this.user).subscribe();
        // if (this.isAccepted) {
        // } else {
        // this.toastr.error('You must accept the terms and conditions');
        // }
    }

    reset() {

    }

    logOut(): void {
        this.authService.logOut();
    }
}
