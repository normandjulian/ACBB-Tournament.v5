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
    constructor(
        public activeModal: NgbActiveModal) {
    }
}
