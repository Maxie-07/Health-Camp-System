import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'healthcamp_token';
  private readonly userKey = 'healthcamp_user';
  readonly currentUser = signal<string | null>(this.getStoredUser());

  constructor(private router: Router) {}

  login(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.accessToken);
    localStorage.setItem(this.userKey, response.username);
    this.currentUser.set(response.username);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private getStoredUser(): string | null {
    return localStorage.getItem(this.userKey);
  }
}
