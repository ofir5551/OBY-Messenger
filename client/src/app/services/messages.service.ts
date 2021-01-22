import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  public sendMessage(newMessage: Message): Observable<Message> {
    return this.http
      .post<Message>('http://localhost:3000/messages/send', newMessage);
  }
}
