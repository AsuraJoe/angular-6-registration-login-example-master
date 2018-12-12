import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { ForgotPasswordComponent } from './forgot-password';
import { ResetPasswordComponent } from './reset-password';
import { FormTemplate } from './formtemplate';
import { ProfileComponent } from './profile';
import { ArchiveComponent } from './archive';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'reset_password', component: ResetPasswordComponent},
    { path: 'formtemplate', component: FormTemplate},
    { path: 'userProfile', component: ProfileComponent},
    { path: 'archive',  component: ArchiveComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);