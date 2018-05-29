import { User } from './../pages/classes/user.class';
import { TournamentProvider } from './tournament.provider';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class FeaturesGuard implements CanActivate {

    constructor(
        private tournament: TournamentProvider) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user: User = this.tournament.user;
        const feature: string = state.url.substring(1, state.url.length);

        return !!user.rights[feature];
    }
}
