import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageEmailsComponent } from './manage-emails/manage-emails.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'compose',
    component: ComposeEmailComponent,
  },
  {
    path: 'manage',
    component: ManageEmailsComponent,
  },
  {
    path: 'usersList',
    component: UsersListComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
