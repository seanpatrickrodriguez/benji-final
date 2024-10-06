import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  userForm: FormGroup;
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      staffId: ['', Validators.required],
    });
  }

  /**
   * Creates a new user using the information provided in the form.
   */
  createNewUser() {
    if (this.userForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const { email, password, role, phoneNumber, staffId } = this.userForm.value;
    this.adminService
      .createUser(email, password, role, phoneNumber, staffId)
      .then(() => {
        this.successMessage = 'User created successfully';
        this.userForm.reset();
      })
      .catch((error) => {
        this.errorMessage = 'Error creating user: ' + error.message;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
