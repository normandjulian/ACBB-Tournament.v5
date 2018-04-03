import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class TournamentProvider {
    private _user: User;
    private subject: Subject<User> = new Subject<User>();

    constructor() {}

    setUser(user: User): void {
        this._user = user;
        this.token = user.token;
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
        return 'http://127.0.0.1:8080/api';
    }
}

class User {
    _id: string;
    login: string;
    firstname: string;
    lastname: string;
    rights: any;
    token: string;
}
