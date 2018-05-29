import { Subject } from 'rxjs/Subject';
import { Club } from './../../classes/clubs.class';
import { TournamentProvider } from './../../../providers/tournament.provider';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../../environments/environment';
import * as _ from 'lodash';

@Injectable()
export class ClubService {
    private _colors: String[];
    private _clubs: Array<Club>;
    private _club: Club;
    private clubs$: Subject<Array<Club>> = new Subject<Array<Club>>();
    private club$: Subject<Club> = new Subject<Club>();

    constructor(
        private http: HttpClient,
        private tournament: TournamentProvider) {

        this._colors = ['Tango', 'Orange', 'Blanc', 'Violet', 'Rouge', 'Bleu', 'Noir', 'Bleu', 'Vert', 'Jaune'];
    }

    getClubs(): Observable<Club[]> {
        return this.clubs$.asObservable();
    }

    setClubs(clubs: Club[]) {
        this._clubs = [...clubs];
        this.clubs$.next(this._clubs);
    }

    getClub(): Observable<Club> {
        return this.club$.asObservable();
    }

    setClub(club: Club) {
        this._club = club;
        this.club$.next(this._club);
    }

    get colors(): String[] {
        return this._colors;
    }

    http_get_clubs(): Observable<any> {
        return this.http.get<Club[]>(`${environment.uri}/clubs`)
            .map((response: Array<Club>) => this.setClubs(response));
    }

    http_post_club(club: Club): Observable<Club> {
        return this.http.post<Club>(`${environment.uri}/clubs`, club)
            .map((response: Club) => {
                this.setClubs([...this._clubs, response]);
                return response;
            });
    }

    http_put_club(club: Club): Observable<void> {
        return this.http.put<Club>(`${environment.uri}/clubs/${club._id}`, club)
            .map((response: Club) => {
                const index = _.findIndex(this._clubs, { _id: response._id });

                this._clubs[index].acronym = response.acronym;
                this._clubs[index].name = response.name;
                this._clubs[index].color = response.color;
                this._clubs[index].comments = response.comments;
                this._clubs[index].fileSend = response.fileSend;
                this._clubs[index].fileReceived = response.fileReceived;
                this._clubs[index].caution = response.caution;

                this.setClubs(this._clubs);

                setTimeout(() => {
                    this.setClub(this._clubs[index]);
                }, 500);
            });
    }

    http_delete_club(club_id: string): Observable<any> {
        return this.http.delete<any>(`${environment.uri}/clubs/${club_id}`)
            .delay(1500)
            .map(() => {
                this.http_get_clubs().subscribe();
            });
    }
}
