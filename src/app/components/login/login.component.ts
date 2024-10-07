import { Component } from '@angular/core';
import { UsernamePasswordFormComponent } from "../username-password-form/username-password-form.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UsernamePasswordFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login(username: string, password: string) {
    this.error = null;
    this.authService.login(username, password)
      .then(() => {
        this.router.navigate(['/dashboard']);  // Assuming you have a dashboard component
      })
      .catch((error: any) => {
        this.error = error.message;
      });
  }

  goToRecovery() {
    this.router.navigate(['/account-recovery']);
  }
}
