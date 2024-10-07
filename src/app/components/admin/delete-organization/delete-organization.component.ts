import { Component } from '@angular/core';
import { WithLoading } from '../../../decorators/with-loading.decorator';
import { OrganizationService } from '../../../services/admin/organization.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-organization',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './delete-organization.component.html',
  styleUrls: ['./delete-organization.component.scss']
})
export class DeleteOrganizationComponent {
  error: string | null = null;
  success: string | null = null;
  showConfirmation: boolean = false;
  organizationId: string = '';
  form = new FormGroup({});

  constructor(private orgAdminService: OrganizationService) { }

  /**
   * Sets the organization ID and displays the confirmation dialog.
   * @param {string} id - The ID of the organization to delete.
   */
  confirmDelete(id: string) {
    this.organizationId = id;
    this.showConfirmation = true;
  }

  /**
   * Deletes the organization after confirmation.
   */
  @WithLoading()
  deleteOrganization() {
    this.error = null;
    this.success = null;

    this.orgAdminService.deleteOrganization(this.organizationId)
      .then(() => {
        this.success = 'Organization deleted successfully.';
        this.showConfirmation = false;
      })
      .catch((error: any) => {
        this.error = `Error deleting organization: ${error.message}`;
      });
  }

  /**
   * Cancels the delete action.
   */
  cancelDelete() {
    this.showConfirmation = false;
  }
}
