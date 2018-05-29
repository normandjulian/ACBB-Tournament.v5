import { InitializationService } from './providers/initialization.provider';
import { InterceptorService } from './providers/interceptor.provider';
import { ClubModule } from './pages/clubs/clubs.module';
import { ROUTES } from './app.routing';
import { RouterModule } from '@angular/router';
import { TeamModule } from './pages/teams/teams.module';
import { TournamentProvider } from './providers/tournament.provider';
import { AuthenticationModule } from './pages/authentications/authentications.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PoolModule } from './pages/pools/pools.module';
import { FeaturesGuard } from './providers/features-guard.service';

export function initilization(service: InitializationService) {
  return () => service.initilization();
}

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
    InitializationService,
    FeaturesGuard,
    { provide: APP_INITIALIZER, useFactory: initilization, deps: [InitializationService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    TournamentProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
