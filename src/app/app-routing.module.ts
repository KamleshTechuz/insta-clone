import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserGuard } from './services/user.guard';
import { AppComponent } from './app.component';
import { InstaComponent } from './insta/insta.component';
import { PassResetComponent } from './pass-reset/pass-reset.component';
import { EmailSignupComponent } from './email-signup/email-signup.component';

const routes: Routes = [
  {path:'', component: AppComponent},
  {path:'insta', component: InstaComponent},
  {path:'accounts/password/reset', component: PassResetComponent},
  {path:'accounts/emailsignup', component: EmailSignupComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/:name', component: ProfileComponent, canActivate: [UserGuard] },
  { path: 'profile/:name/edit-profile', component: EditProfileComponent,  canActivate: [UserGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = [LoginComponent, EmailSignupComponent,
  SignupComponent, ProfileComponent, EditProfileComponent, InstaComponent,PassResetComponent]