import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<User>(null);
  // isAuthenticated: Subject<boolean>;

  constructor(private http: HttpClient) {}

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

          // this.isAuthenticated.next(true);
          this.currentUser.next(user);
        })
      );
  }

  logout() {
    const token = JSON.parse(localStorage.getItem('userData')).token;
    const headers = new HttpHeaders()
            .set("Authorization", `Bearer ${token}`);
    this.http
      .post('http://localhost:3000/users/logout', {}, {headers: headers})
      .subscribe((response) => {
        this.currentUser.next(null);
        localStorage.removeItem('userData');
      });
  }
}
