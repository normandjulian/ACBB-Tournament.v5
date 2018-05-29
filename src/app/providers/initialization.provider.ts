import { User } from './../pages/classes/user.class';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TournamentProvider } from './tournament.provider';
import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class InitializationService {

    constructor(
        private tournament: TournamentProvider,
        private injector: Injector,
        private http: HttpClient) { }

    initilization(): Promise<boolean> {
        const router: Router = this.injector.get(Router);
        return new Promise<boolean> (
            (resolve) => {
                this.http.get(`${this.tournament.uri}/connection`).subscribe(
                    (response: User) => {
                        this.tournament.user = response;
                        router.navigate(['clubs']);
                        resolve(true);
                    },
                    (error: any) => {
                        console.log(error);
                        resolve(true);
                    }
                );
            }
        );
    }
}
