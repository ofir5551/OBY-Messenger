import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signup(credentials): Observable<User> {
    return this.http
      .post<User>('http://localhost:3000/users/signup', credentials)
      .pipe(
        tap((response) => {
          const user = new User(
            response.username,
            response.userId,
            response.token
          );

          localStorage.setItem('userData', JSON.stringify(user));

          this.currentUser.next(user);
        })
      );
  }

  login(credentials): Observable<User> {
    return this.http
      .post<User>('http://localhost:3000/users/login', credentials)
      .pipe(
        tap((response) => {
          const user = new User(
            response.username,
            response.userId,
            response.token
          );

          localStorage.setItem('userData', JSON.stringify(user));

          this.currentUser.next(user);
        })
      );
  }

  logout(): void {
    const token = JSON.parse(localStorage.getItem('userData')).token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .post('http://localhost:3000/users/logout', {}, { headers: headers })
      .subscribe((response) => {
        this.currentUser.next(null);
        localStorage.removeItem('userData');
      });
  }

  // This keeps the user logged in until he manually logs out
  autoLogin(): void {
    const userData: {
      username: string;
      userId: number;
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const user = new User(
      userData.username,
      userData.userId,
      userData.token
    );

    this.currentUser.next(user);
  }

  getCurrentUserDetails() {
    return this.currentUser.value;
  }
}
