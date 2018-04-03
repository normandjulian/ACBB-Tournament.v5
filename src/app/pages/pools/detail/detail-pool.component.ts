import { Pool, PoolSmall, Game } from './../../classes/pool.class';
import { PoolService } from './../services/pool.service';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-detail-pool',
    templateUrl: './detail-pool.component.html',
    styleUrls: ['./../../../app.component.scss', '../pools.component.scss']
})
export class DetailPoolComponent implements OnInit {
    pool: Pool;
    fg_pool: FormGroup;
    colors: String[];
    message: string;
    ranking: any;
    sort: RankSort;
    fields: Array<any>;

    constructor(
        private fb: FormBuilder,
        private service: PoolService,
        private modalCtrl: NgbModal) {

        this.sort = { order: 'desc', predicate: 'score' };
        this.fg_pool = this.fb.group({
            name: fb.control(null, [Validators.required]),
            start_date: fb.control(null, [Validators.required]),
            field: fb.control(null),
            back: fb.control(null),
            category_id: fb.control(null, [Validators.required]),
            teams: fb.control([], [Validators.required])
        });
    }

    ngOnInit() {
        this.fields = this.service.fields;
        console.log(this.fields);
        this.service.getPool().subscribe(
            (_pool: PoolSmall) => {
                this.service.hGetPool(_pool._id).subscribe(
                    (response: Pool) => {
                        this.pool = { ...response };
                        this.fg_pool.patchValue({
                            name: response.name,
                            start_date: response.start_date,
                            field: response.field,
                            back: response.back,
                            category_id: response.category_id,
                            teams: response.teams
                        });
                    }
                );

                if (!this.fields) {
                    this.fields = this.service.fields;
                }
                this.get_ranking(_pool._id);
            }
        );
    }

    save_game(game: Game): void {
        this.service.hPutGame(game).subscribe(
            () => {
                game.isSaved = true;
                setTimeout(() => {
                    game.isSaved = false;
                }, 2000);
            }
        );
    }

    notification(message: string, time: Number): void {
        this.message = message;
        setTimeout(() => {
            this.message = null;
        }, time);
    }

    get_ranking(pool_id: string) {
        const _id: string = pool_id || this.pool._id;
        this.service.hGetRanking(_id).subscribe(
            (response: any) => this.ranking = response
        );
    }

    printGame(game_id: string) {
        console.log('id', game_id);
        this.service.hGetPrintGame(game_id).subscribe();
    }

    orderBy(predicate: string) {
        let order: string;
        if (predicate === this.sort.predicate) {
            order = (this.sort.order === 'asc') ? 'desc' : 'asc';
            this.sort = { order: order, predicate: predicate };
        } else {
            this.sort = { order: 'desc', predicate: predicate };
        }
    }
}

interface RankSort {
    predicate: string;
    order: string;
}
