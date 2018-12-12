import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, FormService, ModalService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ForgotPasswordComponent} from './forgot-password';
import { CompareValidatorDirective } from './_directives/compare-validator.directive';
import { ResetPasswordComponent } from './reset-password';
import { FormTemplate } from './formtemplate';
import { NavigationComponent } from './navBar/nav-bar.component';
import { ProfileComponent } from './profile';
import { ArchiveComponent } from './archive';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        CompareValidatorDirective,
        FormTemplate,
        NavigationComponent,
        ProfileComponent,
        ArchiveComponent  
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        FormService,
        ModalService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }