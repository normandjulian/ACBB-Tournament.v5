import { Subject } from 'rxjs/Subject';
import { Club } from './../../classes/clubs.class';
import { TournamentProvider } from './../../../providers/tournament.provider';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ClubService {
    private _colors: String[];

    constructor(
        private http: HttpClient,
        private tournament: TournamentProvider) {

        this._colors = ['Tango', 'Orange', 'Blanc', 'Violet', 'Rouge', 'Bleu', 'Noir', 'Bleu', 'Vert', 'Jaune'];
    }

    public get colors(): String[] {
        return this._colors;
    }

    public http_get_clubs(): Observable<Club[]> {
        return this.http.get<Club[]>(`${environment.uri}/clubs`);
    }

    public http_post_club(club: Club): Observable<Club> {
        return this.http.post<Club>(`${environment.uri}/clubs`, club);
    }

    public http_put_club(club: Club): Observable<Club> {
        return this.http.put<Club>(`${environment.uri}/clubs/${club._id}`, club);
    }

    public http_delete_club(club_id: string): Observable<any> {
        return this.http.delete<any>(`${environment.uri}/clubs/${club_id}`);
    }
}
