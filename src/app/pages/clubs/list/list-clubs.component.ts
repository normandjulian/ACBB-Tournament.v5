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
export class ListClubsComponent implements OnChanges {
    @Input() clubs: Club[];
    @Output() selected_club = new EventEmitter<Club>();
    @Output() add_club = new EventEmitter<Club>();
    public club: Club;

    constructor(
        private service: ClubService,
        private modalCtrl: NgbModal) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.clubs && !changes.clubs.isFirstChange() && !this.club) {
            this.select_club(_.first(this.clubs));
        }
    }

    public select_club(club: Club) {
        this.club = club;
        this.selected_club.emit(club);
    }

    public create_new_club() {
        const modalClub = this.modalCtrl.open(CreateClubModalComponent);
        modalClub.result.then(
            (response: Club) => this.add_new_club(response),
            () => console.log('create club dismiss')
        );
    }

    private add_new_club(club: Club) {
        this.add_club.emit(club);
        this.select_club(club);
    }
}
