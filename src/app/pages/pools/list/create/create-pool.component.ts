import * as _ from 'lodash';
import { Category } from '../../../classes/category.class';
import { Club } from '../../../classes/clubs.class';
import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Division } from '../../../classes/division.class';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormArray } from '@angular/forms/src/model';
import { Player } from '../../../classes/players.class';
import { PoolService } from '../../services/pool.service';
import { Team, TeamSmall } from '../../../classes/teams.class';

@Component({
    selector: 'app-create-pool-modal',
    templateUrl: './create-pool.component.html',
    styleUrls: ['../../pools.component.scss']
})
export class CreatePoolModalComponent implements OnInit {
    @Input() category_id: string;
    public teams: TeamSmall[];
    public categories: Category[];
    public alert_global: String = null;
    public alert_pool: String = null;
    public alert_teams: String = null;
    public fg_pool: FormGroup;

    constructor(
        private service: PoolService,
        private modal: NgbActiveModal,
        private fb: FormBuilder) {
        this.categories = this.service.categories;

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
        this.fg_pool.patchValue({
            category_id: this.category_id || null,
        });
    }

    public category_change(category_id: String): void {
        if (!!category_id) {
            this.service.http_get_category_teams(category_id).subscribe((response: TeamSmall[]) => this.teams = response);
        } else {
            this.teams = null;
        }
    }

    public save() {
        if (this.fg_pool.invalid) {
            this.notification('success', 2000);
        } else {
            console.log('save', this.fg_pool.value);
            this.service.http_post_pool(this.fg_pool.value).subscribe(
                (response: any) => {
                    this.notification('success', 2000);
                    setTimeout(() => {
                        this.modal.close();
                    }, 2000);
                    console.log('response', response);
                },
                (err: any) => this.notification('success', 2000)
            );
        }
    }

    public select_team(select_team: TeamSmall) {
        const fg_teams: TeamSmall[] = this.fg_pool.value.teams || null;
        const index: number = _.findIndex(fg_teams, { _id: select_team._id });

        const team: TeamSmall = _.find(this.teams, { _id: select_team._id });

        if (index !== -1) {
            fg_teams.splice(index, 1);
            team.isChecked = false;
        } else {
            fg_teams.push(select_team);
            team.isChecked = true;
        }

        this.fg_pool.patchValue({
            teams: fg_teams
        });
    }

    private notification(type: String, time: Number) {
        if (type === 'success') {
            this.alert_global = `Poule créée`;
        }

        setTimeout(() => {
            this.alert_global = null;
        }, time);
    }
}
