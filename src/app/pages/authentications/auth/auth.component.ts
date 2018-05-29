import { TournamentProvider } from './../../../providers/tournament.provider';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    public fb_user: FormGroup;
    public loginCtrl: FormControl;
    public passwordCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private service: AuthService,
        private provider: TournamentProvider,
        private router: Router) {

        this.loginCtrl = fb.control('julian', [Validators.required]);
        this.passwordCtrl = fb.control('julian', [Validators.required]);

        this.fb_user = this.fb.group({
            login: this.loginCtrl,
            password: this.passwordCtrl
        }, { updateOn: 'blur' });
    }

    authentication() {
        this.service.authentication(this.fb_user.value).subscribe(
            (response: any) => {
                this.provider.token = response.token;
                window.location.reload();
            }
        );
    }
}
