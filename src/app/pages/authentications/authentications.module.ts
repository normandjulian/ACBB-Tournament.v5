import { ROUTES } from './authentications.routing';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES)
    ],
    declarations: [
        AuthComponent
    ],
    exports: [AuthComponent]
})
export class AuthenticationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthenticationModule,
            providers: [AuthService]
        };
    }
}
