import { TournamentProvider } from './providers/tournament.provider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public rights: any;
  constructor(private provider: TournamentProvider) { }

  ngOnInit() {
    this.provider.getUser().subscribe(
      (response: any) => this.rights = response.rights
    );
  }
}
