import { Division } from './../classes/division.class';
import { Team, TeamSmall, TeamFull } from './../classes/teams.class';
import { TeamService } from './services/team.service';
import { Club } from './../classes/clubs.class';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Category } from '../classes/category.class';
import * as _ from 'lodash';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.html']
})
export class TeamsComponent implements OnInit {
    public teams: TeamSmall[];
    public team: Team;

    constructor(private service: TeamService) {
    }

    ngOnInit() {
        this.service.http_get_parameters().subscribe();
    }

    public set_team(team: Team) {
        this.team = team;
    }

    public add_team(team: TeamSmall) {
        this.teams.push(team);
    }
}
