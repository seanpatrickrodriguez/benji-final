import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WithLoading } from '../../../decorators/with-loading.decorator';
import { OrganizationService } from '../../../services/admin/organization.service';

@Component({
  selector: 'app-create-organization',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent {
  form: FormGroup;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private orgAdminService: OrganizationService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
    });
  }

  @WithLoading()
  createOrganization() {
    if (this.form.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }
    this.error = null;
    this.orgAdminService.createOrganization(this.form.value)
      .then(() => {
        this.success = 'Organization created successfully.';
        this.form.reset();
      })
      .catch((error: any) => {
        this.error = error.message;
      });
  }
}