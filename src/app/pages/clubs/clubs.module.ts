import { DetailClubComponent } from './detail/detail-club.component';
import { ClubsComponent } from './clubs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClubService } from './services/club.service';
import { RouterModule } from '@angular/router';
import { ROUTES } from './clubs.routing';
import { ListClubsComponent } from './list/list-clubs.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CreateClubModalComponent } from './list/create/create-club.component';
import { DeleteClubModalComponent } from './detail/delete/delete-club.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES)
    ],
    declarations: [
        ListClubsComponent,
        DetailClubComponent,
        ClubsComponent,
        CreateClubModalComponent,
        DeleteClubModalComponent
    ],
    entryComponents: [CreateClubModalComponent, DeleteClubModalComponent],
    exports: [ClubsComponent]
})
export class ClubModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ClubModule,
            providers: [ClubService]
        };
    }
}
