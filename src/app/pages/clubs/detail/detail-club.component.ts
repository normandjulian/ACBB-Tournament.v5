import { Club } from './../../classes/clubs.class';
import { ClubService } from './../services/club.service';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DeleteClubModalComponent } from './delete/delete-club.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-detail-club',
    templateUrl: './detail-club.component.html',
    styleUrls: ['./../../../app.component.scss']
})
export class DetailClubComponent implements OnChanges {
    @Input() club: Club;
    @Output() updated_club = new EventEmitter<Club>();
    @Output() deleted_club = new EventEmitter<Club>();
    public fg_club: FormGroup;
    public colors: String[];
    public message: string;

    constructor(
        private fb: FormBuilder,
        private service: ClubService,
        private modalCtrl: NgbModal) {

        this.colors = this.service.colors;
        this.fg_club = this.fb.group({
            acronym: fb.control('', [Validators.required]),
            name: fb.control(''),
            color: fb.control(this.colors[0], [Validators.required]),
            fileSend: fb.control(false),
            fileReceived: fb.control(false),
            caution: fb.control(false),
            comments: fb.control('')
        });
    }

    ngOnChanges(chgm: SimpleChanges) {
        if (chgm.club && chgm.club.currentValue) {
            this.fg_club.patchValue({
                acronym: chgm.club.currentValue.acronym,
                name: chgm.club.currentValue.name,
                color: chgm.club.currentValue.color,
                fileSend: chgm.club.currentValue.fileSend,
                fileReceived: chgm.club.currentValue.fileReceived,
                caution: chgm.club.currentValue.caution,
                comments: chgm.club.currentValue.comments
            });
        }
    }

    public save(): void {
        const club: Club = this.fg_club.value;
        club._id = this.club._id;
        this.update_club(club);
    }

    private update_club(club: Club) {
        this.service.http_put_club(club).subscribe(
            (response: Club) => {
                this.updated_club.emit(response);
                this.notification(`Le club : ${response.name} à bien été mise à jour`, 2000);
            }
        );
    }

    public notification(message: string, time: Number): void {
        this.message = message;
        setTimeout(() => {
            this.message = null;
        }, time);
    }

    public delete_club() {
        const modalClub = this.modalCtrl.open(DeleteClubModalComponent);
        modalClub.result.then(
            () => this.deleted_club.emit(this.club),
            () => console.log('delete club dismiss')
        );
    }
}
