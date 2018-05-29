import { TournamentProvider } from './../../../providers/tournament.provider';
import { User } from './../../classes/user.class';
import { Club } from './../../classes/clubs.class';
import { ClubService } from './../services/club.service';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DeleteClubModalComponent } from './delete/delete-club.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-detail-club',
    templateUrl: './detail-club.component.html',
    styleUrls: ['./../../../app.component.scss']
})
export class DetailClubComponent implements AfterViewInit {
    club: Club;
    fg_club: FormGroup;
    colors: String[];
    message: string;
    user: User;

    constructor(
        private fb: FormBuilder,
        private service: ClubService,
        private tournament: TournamentProvider,
        private modalCtrl: NgbModal) {

        this.user = this.tournament.user;
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

    ngAfterViewInit() {
        this.service.getClub().subscribe(
            (_club: Club) => {
                this.club = _club;

                this.fg_club.patchValue({
                    acronym: _club.acronym,
                    name: _club.name,
                    color: _club.color,
                    fileSend: _club.fileSend,
                    fileReceived: _club.fileReceived,
                    caution: _club.caution,
                    comments: _club.comments
                });
            }
        );
    }

    save(): void {
        const club: Club = { ...this.fg_club.value };
        club._id = this.club._id;
        this.service.http_put_club(club).subscribe(
            () => this.notification(`Le club : ${club.name} à bien été mise à jour`, 2000)
        );
    }

    notification(message: string, time: Number): void {
        this.message = message;
        setTimeout(() => {
            this.message = null;
        }, time);
    }

    delete_club() {
        const modalClub = this.modalCtrl.open(DeleteClubModalComponent);
        modalClub.componentInstance.club_id = this.club._id;
        modalClub.result.then(
            () => console.log('delete club closed'),
            () => console.log('delete club dismiss')
        );
    }
}
