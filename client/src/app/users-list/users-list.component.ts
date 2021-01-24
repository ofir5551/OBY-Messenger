import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  usersList: User[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.http
      .get<User[]>('/users/list')
      .subscribe((response) => {
        this.usersList = response;
      });
  }
}
