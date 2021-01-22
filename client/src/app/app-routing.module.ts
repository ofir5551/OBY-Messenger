import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { LoginComponent } from './login/login.component';
import { ManageEmailsComponent } from './manage-emails/manage-emails.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'compose',
    component: ComposeEmailComponent,
  },
  {
    path: 'manage',
    component: ManageEmailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
