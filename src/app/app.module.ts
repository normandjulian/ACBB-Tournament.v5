import { InterceptorService } from './providers/interceptor.provider';
import { ClubModule } from './pages/clubs/clubs.module';
import { ROUTES } from './app.routing';
import { RouterModule } from '@angular/router';
import { TeamModule } from './pages/teams/teams.module';
import { TournamentProvider } from './providers/tournament.provider';
import { AuthenticationModule } from './pages/authentications/authentications.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PoolModule } from './pages/pools/pools.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthenticationModule.forRoot(),
    ClubModule.forRoot(),
    TeamModule.forRoot(),
    PoolModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    TournamentProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
