import { Component } from '@angular/core';
import { WithLoading } from '../../../decorators/with-loading.decorator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  form: FormGroup
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      id: ['', Validators.required],
    });
  }

  /**
   * Updates an existing user using the information provided in the form.
   */
  @WithLoading()
  updateUser() {
    try {
      if (this.form.invalid) {
        this.error = 'Please fill in all required fields correctly.';
        return;
      }

      this.success = null;
      this.error = null;

      const { email, phoneNumber, id, role, rank } = this.form.value;
      this.adminService.updateUser(email, phoneNumber, id, role, rank)
      this.success = 'User updated successfully';
      this.form.reset();

    } catch (error: any) {
      this.error = 'Error updating user: ' + error.message;
    }
  }
}
