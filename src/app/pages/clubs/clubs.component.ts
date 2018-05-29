import { Club } from './../classes/clubs.class';
import { ClubService } from './services/club.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'app-clubs',
    templateUrl: './clubs.component.html'
})
export class ClubsComponent implements OnInit {
    constructor(private service: ClubService) { }

    ngOnInit() {
        this.service.http_get_clubs().subscribe();
    }
}
