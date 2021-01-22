import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../models/message.model';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.css'],
})
export class ComposeEmailComponent implements OnInit {
  public composeEmailForm: FormGroup;
  newMessage: Message;
  sentSuccessfully: boolean;

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.composeEmailForm = new FormGroup({
      sender: new FormControl('', Validators.required),
      receiver: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });

    this.sentSuccessfully = false;
  }

  onSubmit(): void {
    this.newMessage = {
      sender: this.composeEmailForm.get('sender').value,
      receiver: this.composeEmailForm.get('receiver').value,
      subject: this.composeEmailForm.get('subject').value,
      message: this.composeEmailForm.get('message').value,
      creationDate: new Date(),
    };

    this.messagesService.sendMessage(this.newMessage).subscribe((response) => {
      this.sentSuccessfully = true;
      this.composeEmailForm.reset();
    });
  }
}
