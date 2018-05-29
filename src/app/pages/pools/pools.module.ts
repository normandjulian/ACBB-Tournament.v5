import { OrderPoolPipe } from './../../pipes/order-pool.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PoolsComponent } from './pools.component';
import { ListPoolsComponent } from './list/list-pools.component';
import { PoolService } from './services/pool.service';
import { CreatePoolModalComponent } from './list/create/create-pool.component';
import { DetailPoolComponent } from './detail/detail-pool.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { RankPipe } from '../../pipes/rank.pipe';
import { FeaturesGuard } from '../../providers/features-guard.service';

const ROUTES: Routes = [
    { path: 'pools', component: PoolsComponent, canActivate: [FeaturesGuard] }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(ROUTES),
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    declarations: [
        PoolsComponent,
        ListPoolsComponent,
        CreatePoolModalComponent,
        DetailPoolComponent,
        RankPipe,
        OrderPoolPipe
    ],
    providers: [
        { provide: OWL_DATE_TIME_LOCALE, useValue: 'fr' }
    ],
    entryComponents: [CreatePoolModalComponent]
})
export class PoolModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PoolModule,
            providers: [PoolService]
        };
    }
}
