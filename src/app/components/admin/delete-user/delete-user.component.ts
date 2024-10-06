import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {
  form: FormGroup;
  error: string | null = null;
  success: string | null = null;
  showConfirmation: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Handles the delete action, asking for confirmation first.
   */
  confirmDelete() {
    if (this.form.invalid) {
      this.error = 'Please provide a valid email address.';
      return;
    }
    this.showConfirmation = true;
  }

  /**
   * Deletes a user after receiving confirmation.
   */
  deleteUser() {
    this.error = null;
    this.success = null;

    try {
      const { email } = this.form.value;
      this.adminService.deleteUser(email).then(() => {
        this.success = 'User deleted successfully.';
        this.form.reset();
        this.showConfirmation = false;
      }).catch((error) => {
        this.error = `Error deleting user: ${error.message}`;
      });
    } catch (error: any) {
      this.error = `Error deleting user: ${error.message}`;
    }
  }

  /**
   * Cancels the delete action.
   */
  cancelDelete() {
    this.showConfirmation = false;
  }
}
