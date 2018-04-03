import {TeamSmall} from './../../classes/teams.class';
import {Club} from './../../classes/clubs.class';
import {Component} from '@angular/core';
import {Category} from '../../classes/category.class';
import * as _ from 'lodash';
import {CreateTeamModalComponent} from './create/create-team.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TeamService} from '../services/team.service';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./../../../app.component.scss', '../teams.component.scss']
})
export class ListTeamsComponent {
  public teams: TeamSmall[];
  public team: TeamSmall;
  public categories: Category[];
  public clubs: Club[];
  public teams_filtered: TeamSmall[];
  private fClub: string;
  private fCategory: string;

  constructor(private modalCtrl: NgbModal, private service: TeamService) {
    this.clubs = this.service.clubs;
    this.categories = this.service.categories;

    this.service.getTeam().subscribe((response: TeamSmall) => this.team = response);

    this.service.getTeams().subscribe(
      (response: TeamSmall[]) => {
        this.teams = [...response];
        this.teams_filtered = [...response];

        this.filter();

        if (_.size(this.teams_filtered) !== 0) {
          this.select_team(_.first(this.teams_filtered));
        }

        this.clubs = this.service.clubs;
        this.categories = this.service.categories;
      });
  }

  public filter_club(club_id: string) {
    this.fClub = club_id;
    this.filter();
  }

  public filter_category(category_id: string) {
    this.fCategory = category_id;
    this.filter();
  }

  private filter() {
    let params: any;

    if (this.fCategory && this.fClub) {
      params = {club_id: this.fClub, category_id: this.fCategory};
    } else if (this.fCategory && !this.fClub) {
      params = {category_id: this.fCategory};
    } else if (!this.fCategory && this.fClub) {
      params = {club_id: this.fClub};
    } else if (!this.fCategory && !this.fClub) {
      params = {};
    }

    this.teams_filtered = _.filter(this.teams, params);
  }

  public select_team(team: TeamSmall) {
    this.service.setTeam(team);
  }

  public create_new_team() {
    const modal = this.modalCtrl.open(CreateTeamModalComponent);
    modal.componentInstance.club_id = this.fClub || null;
    modal.componentInstance.category_id = this.fCategory || null;

    modal.result.then(
      (response: TeamSmall) => this.select_team(response),
      () => console.log('create team dismiss')
    );
  }
}
