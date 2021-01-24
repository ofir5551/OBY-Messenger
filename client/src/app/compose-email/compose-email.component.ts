import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
moment().format();
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
  @ViewChild('receiverUsername') receiverUsername: ElementRef;
  @ViewChild('senderUsername') senderUsername: ElementRef;

  constructor(
    private messagesService: MessagesService,
    private http: HttpClient
  ) {}

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
      creationDate: moment().format('DD/MM/YYYY - HH:mm'),
    };

    this.messagesService.sendMessage(this.newMessage).subscribe((response) => {
      this.sentSuccessfully = true;
      this.composeEmailForm.reset();
    });
  }

  onChangeInput(inputName: string) {
    let userId = this.composeEmailForm.get(inputName).value;
    let field: ElementRef =
      inputName == 'receiver' ? this.receiverUsername : this.senderUsername;

    this.http
      .get<{ username: string }>(
        `/users/getUsername/${userId}`
      )
      .subscribe(
        (response) => {
          field.nativeElement.innerHTML = `✓ ${response.username}`;
          field.nativeElement.style.color = 'green';
        },
        (err) => {
          field.nativeElement.innerHTML = `✕ User with id ${userId} not found. Please check the Users List`;
          field.nativeElement.style.color = 'red';
          this.composeEmailForm.get(inputName).setErrors({'invalid_username': true});
        }
      );
  }
}
