import { TournamentProvider } from './../../../providers/tournament.provider';
import { User } from './../../classes/user.class';
import * as _ from 'lodash';
import { Club } from './../../classes/clubs.class';
import { ClubService } from './../services/club.service';
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { CreateClubModalComponent } from './create/create-club.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-list-clubs',
    templateUrl: './list-clubs.component.html',
    styleUrls: ['./../../../app.component.scss']
})
export class ListClubsComponent {
    clubs: Club[];
    club: Club;
    user: User;

    constructor(
        private service: ClubService,
        private modalCtrl: NgbModal,
        private tournament: TournamentProvider) {

        this.user = { ...this.tournament.user };

        this.service.getClub().subscribe((response: Club) => this.club = response);

        this.service.getClubs().subscribe(
            (response: Club[]) => {
                if (response.length !== 0) {
                    this.clubs = [...response];
                    this.select_club(_.first(this.clubs));
                }
            });
    }

    select_club(club: Club) {
        this.service.setClub(club);
    }

    create_new_club() {
        const modalClub = this.modalCtrl.open(CreateClubModalComponent);
        modalClub.result.then(
            (response: Club) => this.select_club(response),
            () => console.log('create club dismiss')
        );
    }
}
