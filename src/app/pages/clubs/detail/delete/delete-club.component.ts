import * as _ from 'lodash';
import { Club } from '../../../classes/clubs.class';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClubService } from './../../services/club.service';

@Component({
    selector: 'app-delete-club-modal',
    templateUrl: './delete-club.component.html'
})
export class DeleteClubModalComponent {
    @Input() club_id: string;
    constructor(
        private service: ClubService,
        public modal: NgbActiveModal) {
    }

    delete_club() {
        this.service.http_delete_club(this.club_id).subscribe(() => this.modal.close());
    }
}
