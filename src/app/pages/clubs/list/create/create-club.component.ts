import * as _ from 'lodash';
import { Club } from '../../../classes/clubs.class';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClubService } from './../../services/club.service';

@Component({
    selector: 'app-create-club-modal',
    templateUrl: './create-club.component.html'
})
export class CreateClubModalComponent {
    @Input() club_id: string;
    @Input() category_id: string;

    colors: String[];
    alert_club: String = null;
    alert_global: String = null;
    fg_club: FormGroup;

    constructor(
        private service: ClubService,
        private fb: FormBuilder,
        private modal: NgbActiveModal) {

        this.colors = this.service.colors;
        this.fg_club = this.fb.group({
            acronym: fb.control(null, [Validators.required]),
            name: fb.control(null, [Validators.required]),
            color: fb.control(null, [Validators.required]),
            fileSend: fb.control(false),
            fileReceived: fb.control(false),
            caution: fb.control(false),
            comments: fb.control(null)
        });
    }

    save() {
        if (this.fg_club.invalid) {
            this.notification('club', 2000);
        } else {
            this.service.http_post_club(this.fg_club.value).subscribe(
                (response: any) => {
                    this.notification('success', 2000);

                    setTimeout(() => {
                        this.modal.close(response);
                    }, 2100);
                },
                (err: any) => console.log(err)
            );
        }
    }

    private notification(type: String, time: Number) {
        if (type === 'club') {
            this.alert_club = `Il manque des données obligatoire`;
        } else if (type === 'success') {
            this.alert_global = `Équipe créée`;
        }

        setTimeout(() => {
            this.alert_club = null;
            this.alert_global = null;
        }, time);
    }
}
