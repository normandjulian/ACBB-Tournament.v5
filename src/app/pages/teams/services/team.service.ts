import { Player } from './../../classes/players.class';
import { Team, TeamSmall, TeamFull } from './../../classes/teams.class';
import { Division } from './../../classes/division.class';
import { Category } from './../../classes/category.class';
import { Club } from './../../classes/clubs.class';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import { environment } from '../../../../environments/environment';
import * as _ from 'lodash';

@Injectable()
export class TeamService {
  private teams: TeamSmall[];
  private teams$: Subject<TeamSmall[]> = new Subject<TeamSmall[]>();
  private team: TeamSmall;
  private team$: Subject<TeamSmall> = new Subject<TeamSmall>();

  private _divisions: Division[];
  private _categories: Category[];
  private _clubs: Club[];

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<TeamSmall[]> {
    return this.teams$.asObservable();
  }

  setTeams(teams: TeamSmall[]) {
    this.teams = [...teams];
    this.teams$.next(this.teams);
  }

  getTeam(): Observable<TeamSmall> {
    return this.team$.asObservable();
  }

  setTeam(team: TeamSmall) {
    this.team = team;
    this.team$.next(this.team);
  }

  get categories(): Category[] {
    return this._categories;
  }

  set categories(categories: Category[]) {
    this._categories = categories;
  }

  get divisions(): Division[] {
    return this._divisions;
  }

  set divisions(divisions: Division[]) {
    this._divisions = divisions;
  }

  get clubs(): Club[] {
    return this._clubs;
  }

  set clubs(clubs: Club[]) {
    this._clubs = clubs;
  }

  http_get_parameters(): Observable<any> {
    return this.http.get<any>(`${environment.uri}/teams-parameters`)
      .map((response: any) => {
        this.clubs = response.clubs;
        this.divisions = response.divisions;
        this.categories = response.categories;
        this.setTeams(response.teams);
      });
  }

  http_get_teams(): Observable<TeamSmall[]> {
    return this.http.get<TeamSmall[]>(`${environment.uri}/teams`);
  }

  http_get_team(team_id: String): Observable<Team> {
    return this.http.get<Team>(`${environment.uri}/teams/${team_id}`);
  }

  http_post_team(team: TeamSmall): Observable<TeamSmall> {
    return this.http.post<TeamSmall>(`${environment.uri}/teams`, team)
      .map((response: TeamSmall) => {
        this.setTeams([...this.teams, response]);
        return response;
      });
  }

  http_put_team(team: Team): Observable<any> {
    return this.http.put<Team>(`${environment.uri}/teams/${team._id}`, team)
      .map((response: TeamFull) => {
        const teams: TeamSmall[] = [...this.teams];
        const index = _.findIndex(this.teams, { _id: response._id });

        this.teams[index].category_id = response.category_id;
        this.teams[index].category = response.category;
        this.teams[index].club_id = response.club_id;
        this.teams[index].club = response.club;
        this.teams[index].division_id = response.division_id;
        this.teams[index].division = response.division;
        this.teams[index].name = response.name;

        this.setTeams(teams);

        setTimeout(() => {
          this.setTeam(this.teams[index]);
        }, 500);
      });
  }

  http_delete_team(team_id: String): Observable<any> {
    return this.http.delete<any>(`${environment.uri}/teams/${team_id}`)
      .delay(1500)
      .map(() => {
        this.http_get_teams().subscribe(
          (response: TeamSmall[]) => this.setTeams([...response])
        );
      });
  }

  /** PLAYERS */
  http_post_player(player: Player): Observable<Player> {
    return this.http.post<Player>(`${environment.uri}/players`, player);
  }

  http_put_player(player: Player): Observable<Player> {
    return this.http.put<Player>(`${environment.uri}/players/${player._id}`, player);
  }

  http_delete_player(player_id: String): Observable<any> {
    return this.http.delete<any>(`${environment.uri}/players/${player_id}`);
  }
}
