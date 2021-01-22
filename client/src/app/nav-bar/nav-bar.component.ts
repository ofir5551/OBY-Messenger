import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSubscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(
      (user) => {
        this.isAuthenticated = user ? true : false;
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
