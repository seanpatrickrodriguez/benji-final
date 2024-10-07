import { Component, OnInit } from '@angular/core';
import { Organization, OrganizationService } from '../../../services/admin/organization.service';

@Component({
  selector: 'app-organizations-table',
  standalone: true,
  templateUrl: './organizations-table.component.html',
  styleUrls: ['./organizations-table.component.scss']
})
export class OrganizationsTableComponent implements OnInit {
  organizations: Organization[] = [];
  error: string | null = null;
  success: string | null = null;

  constructor(private orgAdminService: OrganizationService) { }

  ngOnInit(): void {
    this.fetchOrganizations();
  }

  fetchOrganizations() {
    this.error = null;

    this.orgAdminService.getOrganizations().subscribe({
      next: (organizations: Organization[]) => {
        this.organizations = organizations;
      },
      error: (error: any) => {
        this.error = 'Error fetching organizations: ' + error.message;
      }
    });
  }

  deleteOrganization(id: string) {
    if (confirm('Are you sure you want to delete this organization?')) {
      this.orgAdminService.deleteOrganization(id).then(() => {
        this.fetchOrganizations();
      }).catch((error) => {
        this.error = 'Error deleting organization: ' + error.message;
      });
    }
  }
}