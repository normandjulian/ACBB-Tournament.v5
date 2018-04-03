import { Club } from './../../classes/clubs.class';
import { Subject } from 'rxjs/Subject';
import { Pool, PoolSmall, Game } from './../../classes/pool.class';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Category } from '../../classes/category.class';
import { Division } from '../../classes/division.class';
import { environment } from '../../../../environments/environment';
import { Team, TeamSmall } from '../../classes/teams.class';

@Injectable()
export class PoolService {
    private pool: PoolSmall;
    private pool$: Subject<PoolSmall> = new Subject<PoolSmall>();
    private pools: PoolSmall[];
    private pools$: Subject<PoolSmall[]> = new Subject<PoolSmall[]>();
    private _categories: Category[];
    private _fields: Array<any>;

    constructor(private http: HttpClient) { }

    getPools(): Observable<PoolSmall[]> {
        return this.pools$.asObservable();
    }

    setPools(pools: PoolSmall[]) {
        this.pools = [...pools];
        this.pools$.next(this.pools);
    }

    getPool(): Observable<PoolSmall> {
        return this.pool$.asObservable();
    }

    setPool(pool: PoolSmall) {
        this.pool = pool;
        this.pool$.next(this.pool);
    }

    get categories(): Category[] {
        return this._categories;
    }

    set categories(categories: Category[]) {
        this._categories = categories;
    }

    get fields(): any[] {
        return this._fields;
    }

    set fields(fields: any[]) {
        this._fields = fields;
    }

    http_get_pools(): Observable<Pool[]> {
        return this.http.get<Pool[]>(`${environment.uri}/pools`);
    }

    http_get_parameters(): Observable<any> {
        return this.http.get<any>(`${environment.uri}/pools-parameters`)
            .map((response: any) => {
                this.categories = response.categories;
                this.fields = response.fields;
                this.setPools(response.pools);
            });
    }

    hGetPool(pool_id: string): Observable<Pool> {
        return this.http.get<Pool>(`${environment.uri}/pools/${pool_id}`);
    }

    http_get_category_teams(category_id: String): Observable<TeamSmall[]> {
        return this.http.get<TeamSmall[]>(`${environment.uri}/categories/${category_id}/teams/`);
    }

    http_post_pool(pool: Pool): Observable<Pool> {
        return this.http.post<Pool>(`${environment.uri}/pools`, pool);
    }

    http_put_pool(pool: Pool): Observable<Pool> {
        return this.http.put<Pool>(`${environment.uri}/pools/${pool._id}`, pool);
    }

    http_delete_pool(pool_id: String): Observable<any> {
        return this.http.delete<any>(`${environment.uri}/pools/${pool_id}`);
    }

    hPutGame(game: Game) {
        return this.http.put(`${environment.uri}/games/${game._id}`, game);
    }

    hGetPrintGame(game_id: string) {
        return this.http.get(`${environment.uri}/games/${game_id}/print`)
            .map((response: any) => window.open(response.path));
    }

    hGetRanking(pool_id: string) {
        return this.http.get(`${environment.uri}/pools/${pool_id}/ranking`);
    }
}
