import { Router } from '@angular/router';
import { TournamentProvider } from './tournament.provider';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import 'rxjs/add/observable/throw';

@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(private tournament: TournamentProvider, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // debugger;
        if (this.tournament.token) {
            const clone = req.clone({ setHeaders: { 'x-access-token': this.tournament.token } });
            return next.handle(clone).catch((errorResponse: HttpErrorResponse) => {
                if (errorResponse.status === 403) {
                    this.router.navigateByUrl('/login');
                }
                return Observable.throw(errorResponse);
            });
        }
        return next.handle(req).catch(
            (errorResponse: HttpErrorResponse) => {
                if (errorResponse.status === 403) {
                    this.router.navigateByUrl('/login');
                }
                return Observable.throw(errorResponse);
            });
    }
}
