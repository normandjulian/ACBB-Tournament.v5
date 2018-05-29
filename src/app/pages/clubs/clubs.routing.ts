import { ClubsComponent } from './clubs.component';
import { ListClubsComponent } from './list/list-clubs.component';
import { Routes } from '@angular/router';
import { FeaturesGuard } from '../../providers/features-guard.service';

export const ROUTES: Routes = [
    { path: 'clubs', component: ClubsComponent, canActivate: [FeaturesGuard] }
];
