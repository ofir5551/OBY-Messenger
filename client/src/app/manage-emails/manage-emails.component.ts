import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../models/message.model';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-manage-emails',
  templateUrl: './manage-emails.component.html',
  styleUrls: ['./manage-emails.component.css'],
})
export class ManageEmailsComponent implements OnInit, OnDestroy {
  userMessagesSubscription: Subscription;
  userMessagesArray: Message[] = [];
  sentMessagesArray: Message[] = [];
  receivedMessagesArray: Message[] = [];

  displayReceived: boolean = true;
  displaySent: boolean = true;
  isLoggedIn: boolean;

  constructor(
    private messagesService: MessagesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userMessagesSubscription = this.messagesService.userMessagesSubject.subscribe(
      (messages) => {
        this.sortMessages(messages);
      }
    );

    if (this.isLoggedIn) {
      this.onGetMessages();
    }
  }

  private sortMessages(messages: Message[]) {
    if (messages.length > 0) {
      this.userMessagesArray = messages;

      this.sentMessagesArray = this.userMessagesArray.filter(
        (msg) =>
          Number(msg.sender) == this.authService.getCurrentUserDetails().userId
      );

      this.receivedMessagesArray = this.userMessagesArray.filter(
        (msg) =>
          Number(msg.receiver) ==
          this.authService.getCurrentUserDetails().userId
      );
    } else {
      this.sentMessagesArray = [];
      this.receivedMessagesArray = [];
    }
  }

  onGetMessages() {
    this.messagesService.getMessages();
  }

  ngOnDestroy(): void {
    this.userMessagesSubscription.unsubscribe();
  }
}
