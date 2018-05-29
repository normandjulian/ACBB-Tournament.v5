import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DetailTeamComponent } from './detail/detail-team.component';
import { TeamService } from './services/team.service';
import { ListTeamsComponent } from './list/list-teams.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { TeamsComponent } from './teams.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CreateTeamModalComponent } from './list/create/create-team.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteTeamModalComponent } from './detail/delete/delete.team.component';
import { FeaturesGuard } from '../../providers/features-guard.service';

const ROUTES: Routes = [
    { path: 'teams', component: TeamsComponent, canActivate: [FeaturesGuard] }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(ROUTES),
        ReactiveFormsModule,
        NgbModule.forRoot(),
        FormsModule
    ],
    declarations: [
        TeamsComponent,
        ListTeamsComponent,
        DetailTeamComponent,
        CreateTeamModalComponent,
        DeleteTeamModalComponent
    ],
    exports: [TeamsComponent],
    entryComponents: [CreateTeamModalComponent, DeleteTeamModalComponent]
})
export class TeamModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TeamModule,
            providers: [TeamService]
        };
    }
}
