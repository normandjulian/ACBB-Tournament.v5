import * as _ from 'lodash';
import { Category } from '../../../classes/category.class';
import { Club } from '../../../classes/clubs.class';
import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Division } from '../../../classes/division.class';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { TeamService } from '../../services/team.service';
import { FormArray } from '@angular/forms/src/model';
import { Player } from '../../../classes/players.class';
import { TeamSmall } from '../../../classes/teams.class';

@Component({
    selector: 'app-create-team-modal',
    templateUrl: './create-team.component.html',
    styleUrls: ['../../../../app.component.scss', '../../teams.component.scss']
})
export class CreateTeamModalComponent implements OnInit {
    @Input() club_id: string;
    @Input() category_id: string;
    @ViewChild('diff') private diff: ElementRef;
    clubs: Club[];
    divisions: Division[];
    categories: Category[];

    alert_team: String = null;
    alert_player: String = null;
    alert_global: String = null;

    fg_team: FormGroup;
    fa_players: FormArray;

    constructor(
        private service: TeamService,
        private fb: FormBuilder,
        private modal: NgbActiveModal) {

        this.clubs = this.service.clubs;
        this.divisions = this.service.divisions;
        this.categories = this.service.categories;

        this.fa_players = fb.array([]);

        this.fg_team = this.fb.group({
            coach: fb.control(null),
            referee: fb.control(null),
            division_id: fb.control(null, [Validators.required]),
            comments: fb.control(null),
            club_id: fb.control(null, [Validators.required]),
            category_id: fb.control(null, [Validators.required]),
            players: this.fa_players
        });
    }

    ngOnInit() {
        this.fg_team.patchValue({
            club_id: this.club_id || null,
            category_id: this.category_id || null,
        });
    }
    private initPlayerCtrl() {
        return this.fb.group({
            number: this.fb.control(null, [Validators.required]),
            lastname: this.fb.control(null, [Validators.required]),
            firstname: this.fb.control(null, [Validators.required])
        });
    }

    save() {
        if (this.fg_team.invalid) {
            this.notification('team', 3000);
        } else {
            this.service.http_post_team(this.fg_team.value).subscribe(
                (response: TeamSmall) => {
                    this.notification('success', 2000);
                    setTimeout(() => {
                        this.modal.close(response);
                    }, 2000);
                },
                (err: any) => this.notification('error', 3000)
            );
        }
    }

    add_player() {
        if (this.fg_team.controls.players.valid) {
            this.fa_players.push(this.initPlayerCtrl());
        } else {
            this.notification('player', 3000);
        }
    }

    division_change(division_id: string) {
        const diff = _.find(this.divisions, { _id: division_id }).score;
        this.diff.nativeElement.value = diff;
    }

    private notification(type: String, time: number) {
        if (type === 'player') {
            this.alert_player = `Il manque des données obligatoire`;
        } else if (type === 'team') {
            this.alert_team = `Il manque des données obligatoire`;
        } else if (type === 'success') {
            this.alert_global = `Équipe créée`;
        }

        setTimeout(() => {
            this.alert_player = null;
            this.alert_team = null;
            this.alert_global = null;
        }, time);
    }
}
