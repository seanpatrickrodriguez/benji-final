import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-recovery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.scss']
})
export class AccountRecoveryComponent {
  form: FormGroup;
  error: string | null = null;
  success: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      email: ['', Validators.email],
      phoneNumber: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
    });
  }

  recoverAccount() {
    if (this.form.invalid || (!this.form.value.email && !this.form.value.phoneNumber)) {
      this.error = 'Please fill in all required fields correctly, and provide either an email or phone number.';
      return;
    }

    this.error = null;
    const { email, phoneNumber, id } = this.form.value;
    this.authService.sendPasswordReset(id, email, phoneNumber)
      .then(() => {
        this.success = 'Password reset email sent successfully.';
      })
      .catch((error: any) => {
        this.error = error.message;
      });
  }
}
