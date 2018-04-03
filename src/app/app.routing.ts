import { ListTeamsComponent } from './pages/teams/list/list-teams.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/authentications/auth/auth.component';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    { path: '**', component: AuthComponent }
];
