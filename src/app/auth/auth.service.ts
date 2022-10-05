import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = JSON.parse(
    localStorage.getItem('isAuthenticated') || 'false'
  );

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    console.log(this.isAuthenticated);
  }

  // sign up with email and password using firebase auth
  async register(email: string, password: string) {
    try {
      const result = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (result.user) {
        localStorage.setItem('userId', result.user.uid);
        localStorage.setItem('isAuthenticated', 'true');
        this.isAuthenticated =
          localStorage.getItem('isAuthenticated') === 'true';
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
        localStorage.setItem('userId', result.user.uid);
        localStorage.setItem('isAuthenticated', 'true');
        this.isAuthenticated =
          localStorage.getItem('isAuthenticated') === 'true';
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
      localStorage.removeItem('userId');
      localStorage.removeItem('isAuthenticated');
      this.isAuthenticated = false;

      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
}
