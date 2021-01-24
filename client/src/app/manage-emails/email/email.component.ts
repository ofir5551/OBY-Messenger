import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {
  @Input() email: Message;
  msgIdToBeDeleted: number;

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {}

  onPrintId() {
    console.log(this.msgIdToBeDeleted);
  }

  onDeleteMessage(msgId) {
    this.messagesService.deleteMessage(msgId).subscribe(
      (response) => {
        this.messagesService.getMessages();
      },
      (err) => {
        console.log('There was an error deleting the message.');
      }
    );
  }
}
