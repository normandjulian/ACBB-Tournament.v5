import * as _ from 'lodash';
import { Category } from '../../classes/category.class';
import { Club } from '../../classes/clubs.class';
import {
  Component,
  ElementRef,
  EventEmitter,
  AfterViewInit,
  Output,
  ViewChild
} from '@angular/core';
import { Division } from '../../classes/division.class';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Team, TeamSmall, TeamFull } from './../../classes/teams.class';
import { TeamService } from './../services/team.service';
import { DeleteTeamModalComponent } from './delete/delete.team.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { Player } from '../../classes/players.class';

@Component({
  selector: 'app-detail-team',
  templateUrl: './detail-team.component.html',
  styleUrls: ['./../../../app.component.scss', './../teams.component.scss']
})
export class DetailTeamComponent implements AfterViewInit {
  @ViewChild('diff') private diff: ElementRef;
  team: Team;
  clubs: Club[];
  categories: Category[];
  divisions: Division[];
  fg_team: FormGroup;
  players: Player[];
  message: String;

  constructor(private service: TeamService,
    private fb: FormBuilder,
    private modalCtrl: NgbModal) {

    this.fg_team = this.fb.group({
      name: fb.control(null),
      coach: fb.control(null),
      referee: fb.control(null),
      division_id: fb.control(null, [Validators.required]),
      comments: fb.control(null),
      club_id: fb.control({ value: null, disabled: true }, [Validators.required]),
      category_id: fb.control(null, [Validators.required])
    });
  }

  ngAfterViewInit() {
    this.service.getTeam().subscribe(
      (_team: TeamSmall) => {
        this.service.http_get_team(_team._id).subscribe(
          (response: Team) => {
            this.team = { ...response };
            this.fg_team.patchValue({
              name: response.name,
              coach: response.coach,
              referee: response.referee,
              division_id: response.division_id,
              comments: response.comments,
              club_id: response.club_id,
              category_id: response.category_id
            });
            this.players = response.players;
            this.division_change(response.division_id);
          }
        );

        if (!this.clubs || !this.categories || !this.divisions) {
          this.clubs = this.service.clubs;
          this.categories = this.service.categories;
          this.divisions = this.service.divisions;
        }
      }
    );
  }

  save(): void {
    this.service.http_put_team({ ...this.fg_team.value, _id: this.team._id }).subscribe(
      () => this.notification('Equipe mise à jour', 2000)
    );
  }

  division_change(division_id: String) {
    const division: any = _.find(this.divisions, { _id: division_id });
    if (this.diff) {
      this.diff.nativeElement.value = division ? division.score : null;
    }
  }

  remove_team() {
    const modal = this.modalCtrl.open(DeleteTeamModalComponent);
    modal.componentInstance.team_id = this.team._id;
    modal.result.then(
      () => console.log('delete club closed'),
      () => console.log('delete club dismiss')
    );
  }

  private notification(message: String, time: Number): void {
    this.message = message;
    setTimeout(() => {
      this.message = null;
    }, time);
  }

  save_player(player: Player, index: number): void {
    if (player._id) {
      this.service.http_put_player(player).subscribe(
        (response: Player) => {
          this.players[index].firstname = response.firstname;
          this.players[index].lastname = response.lastname;
          this.players[index].number = response.number;
          this.players[index].saved = true;
          setTimeout(() => {
            this.players[index].saved = false;
          }, 1500);
        }
      );
    } else {
      this.service.http_post_player(player).subscribe(
        (response: Player) => {
          this.players[index]._id = response._id;
          this.players[index].firstname = response.firstname;
          this.players[index].lastname = response.lastname;
          this.players[index].number = response.number;
          this.players[index].saved = true;
          setTimeout(() => {
            this.players[index].saved = false;
          }, 1500);
        }
      );
    }
  }

  add_player() {
    this.players.unshift({
      number: null,
      lastname: null,
      firstname: null,
      team_id: this.team._id
    });
  }

  delete_player(player: Player, index: number) {
    if (player._id) {
      this.service.http_delete_player(player._id).subscribe(
        () => {
          this.players[index].saved = true;
          setTimeout(() => {
            this.players.splice(index, 1);
          }, 1500);
        }
      );
    } else {
      this.players[index].saved = true;
      setTimeout(() => {
        this.players.splice(index, 1);
      }, 1500);
    }
  }
}
