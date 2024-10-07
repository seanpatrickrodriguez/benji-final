import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WithLoading } from '../../../decorators/with-loading.decorator';
import { OrganizationService } from '../../../services/admin/organization.service';

@Component({
  selector: 'app-update-organization',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-organization.component.html',
  styleUrls: ['./update-organization.component.scss']
})
export class UpdateOrganizationComponent {
  form: FormGroup;
  error: string | null = null;
  success: string | null = null;
  organizationId: string = '';

  constructor(private fb: FormBuilder, private organizationsService: OrganizationService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
    });
  }

  @WithLoading()
  updateOrganization() {
    if (this.form.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }
    this.error = null;
    this.organizationsService.updateOrganization(this.organizationId, this.form.value)
      .then(() => {
        this.success = 'Organization updated successfully.';
        this.form.reset();
      })
      .catch((error: any) => {
        this.error = error.message;
      });
  }
}
