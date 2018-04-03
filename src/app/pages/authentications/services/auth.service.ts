import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient) { }

    authentication(guest: Guest): Observable<User> {
        return this.http.post<User>(`${environment.uri}/authentication`, guest);
    }
}

class Guest {
    login: string;
    password: string;
}
class User {
    firstname: string;
    lastname: string;
    rights: any;
    token: any;
}
