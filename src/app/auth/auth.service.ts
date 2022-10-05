import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  // sign up with email and password using firebase auth
  async register(email: string, password: string) {
    try {
      const result = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (result.user) {
        localStorage.setItem('token', result.user.uid);
        this.isAuthenticated = true;
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // sign in with email and password using firebase auth
  async login(email: string, password: string) {
    try {
      const result = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (result.user) {
        localStorage.setItem('token', result.user.uid);
        this.isAuthenticated = true;
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // sign out using firebase auth
  async logout() {
    try {
      await this.fireAuth.signOut();
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
}
