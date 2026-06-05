import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { AuthResponse } from '../../shared/models';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html'
})
export class LoginComponent {
  error = '';
  form;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['admin', Validators.required],
      password: ['admin123', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.api.post<AuthResponse>('/auth/login', this.form.value).subscribe({
      next: (response) => {
        this.authService.login(response);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Invalid credentials';
      }
    });
  }
}
