import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    if (!this.email || !this.password) {
      alert('Please enter your email and password');
      return;
    }
    this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
