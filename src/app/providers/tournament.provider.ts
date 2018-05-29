import { User } from './../pages/classes/user.class';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';

@Injectable()
export class TournamentProvider {
    private _user: User;
    private subject: Subject<User> = new Subject<User>();

    constructor() {}

    set user(user: User) {
        this._user = user;
    }

    get user(): User {
        return this._user;
    }

    setUser(user: User): void {
        this.user = user;
        this.subject.next(user);
    }

    getUser(): Observable<User> {
        return this.subject.asObservable();
    }

    get token(): any {
        return localStorage.getItem('token');
    }

    set token(token: any) {
        localStorage.setItem('token', token);
    }

    get uri(): string {
        return environment.uri;
    }
}
