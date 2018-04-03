import { TeamService } from './../../services/team.service';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delete-team-modal',
    templateUrl: './delete-team.component.html'
})
export class DeleteTeamModalComponent {
    @Input() team_id: string;
    constructor(
        public activeModal: NgbActiveModal,
        private service: TeamService) {
    }

    public delete_team() {
        this.service.http_delete_team(this.team_id).subscribe(() => this.activeModal.close());
    }
}
