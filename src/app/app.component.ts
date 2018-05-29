import { User } from './pages/classes/user.class';
import { TournamentProvider } from './providers/tournament.provider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public user: User;

  constructor(
    private tounament: TournamentProvider) {
    this.user = this.tounament.user;
  }

  ngOnInit() {
    this.tounament.getUser().subscribe(
      (response: any) => this.user = response.user
    );
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }
}
