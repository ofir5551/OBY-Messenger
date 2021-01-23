import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  registrationError:string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const credentials = {
      username: this.signupForm.get('username').value,
      password: this.signupForm.get('password').value,
    };

    this.authService.signup(credentials).subscribe(
      (response) => {
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.registrationError = err.error.error;
      }
    );
  }
}
