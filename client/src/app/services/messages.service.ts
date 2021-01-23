import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../models/message.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  userMessagesSubject = new Subject<Message[]>();
  constructor(private http: HttpClient) {}

  sendMessage(newMessage: Message): Observable<Message> {
    return this.http.post<Message>(
      'http://localhost:3000/messages/send',
      newMessage
    );
  }

  getMessages() {
    const token = JSON.parse(localStorage.getItem('userData')).token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<Message[]>('http://localhost:3000/messages/get', {
        headers: headers,
      })
      .subscribe((response) => {
        this.userMessagesSubject.next(response);
      });
  }

  deleteMessage(messageId: number) {
    return this.http.delete(
      `http://localhost:3000/messages/delete/${messageId}`
    );
  }
}
