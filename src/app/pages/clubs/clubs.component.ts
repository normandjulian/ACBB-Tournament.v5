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
    public clubs: Club[];
    public club: Club;

    constructor(private service: ClubService) { }

    ngOnInit() {
        this.service.http_get_clubs().subscribe(
            (response: Club[]) => this.clubs = response,
            (error: any) => console.log(error)
        );
    }

    public set_club(club: Club) {
        this.club = club;
    }

    public add_club(club: Club) {
        this.clubs.push(club);
    }

    public updated_club(club: Club) {
        const index = _.findIndex(this.clubs, { _id: club._id });

        if (index !== -1) {
            this.clubs[index] = club;
        }
    }

    public deleted_club(club: Club) {
        this.service.http_delete_club(club._id).subscribe(
            () => {
                const index = _.findIndex(this.clubs, { _id: club._id });

                if (index !== -1) {
                    this.clubs.splice(index, 1);
                    this.club = null;
                }
            }
        );
    }
}
