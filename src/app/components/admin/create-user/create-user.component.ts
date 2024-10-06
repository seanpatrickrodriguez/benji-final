import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin/admin.service';
import { WithLoading } from '../../../decorators/with-loading.decorator';
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  form: FormGroup;
  success: string | null = null;
  error: string | null = null;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
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
   * Creates a new user using the information provided in the form.
   */
  @WithLoading()
  createNewUser() {
    try {
      if (this.form.invalid) {
        this.error = 'Please fill in all required fields correctly.';
        return;
      }

      this.success = null;
      this.error = null;

      const { email, phoneNumber, id, role, rank } = this.form.value;
      this.adminService.createUser(email, phoneNumber, id, role, rank)
      this.success = 'User created successfully';
      this.form.reset();
    } catch (error: any) {
      this.error = 'Error creating user: ' + error.message;
    }
  }
}
