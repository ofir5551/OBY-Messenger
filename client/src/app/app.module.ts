import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { ManageEmailsComponent } from './manage-emails/manage-emails.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EmailComponent } from './manage-emails/email/email.component';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ComposeEmailComponent,
    ManageEmailsComponent,
    LoginComponent,
    SignupComponent,
    NavBarComponent,
    EmailComponent,
    HomeComponent,
    UsersListComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
