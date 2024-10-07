import { Injectable, WritableSignal, signal } from '@angular/core';
import { Functions, httpsCallable, HttpsCallableResult } from '@angular/fire/functions';
import { WithLoading } from '../../decorators/with-loading.decorator';

export interface Organization {
  organizationId?: string;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  participants: string[];
}

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  organizations: WritableSignal<Organization[]> = signal([]);
  error: WritableSignal<string | null> = signal(null);
  success: WritableSignal<string | null> = signal(null);

  constructor(private functions: Functions) {}

  @WithLoading()
  async getOrganizations(): Promise<Organization[]> {
    this.error.set(null);
    this.success.set(null);

    try {
      const getOrganizationsFunction = httpsCallable(this.functions, 'getOrganizations');
      const result = await getOrganizationsFunction() as HttpsCallableResult<Organization[]>;
      this.organizations.set(result.data);
      this.success.set('Organizations fetched successfully.');
      return result.data;
    } catch (error: any) {
      this.error.set('Error fetching organizations: ' + error.message);
      throw new Error('Error fetching organizations: ' + error.message);
    }
  }

  @WithLoading()
  async createOrganization(organization: Organization): Promise<void> {
    this.error.set(null);
    this.success.set(null);

    try {
      const createOrganizationFunction = httpsCallable(this.functions, 'createOrganization');
      await createOrganizationFunction(organization);
      const updatedOrganizations = [...this.organizations(), organization];
      this.organizations.set(updatedOrganizations);
      this.success.set('Organization created successfully.');
    } catch (error: any) {
      this.error.set('Error creating organization: ' + error.message);
      throw new Error('Error creating organization: ' + error.message);
    }
  }

  @WithLoading()
  async updateOrganization(organizationId: string, updatedData: Partial<Organization>): Promise<void> {
    this.error.set(null);
    this.success.set(null);

    try {
      const updateOrganizationFunction = httpsCallable(this.functions, 'updateOrganization');
      await updateOrganizationFunction({ organizationId, ...updatedData });
      const updatedOrganizations = this.organizations().map(org =>
        org.organizationId === organizationId ? { ...org, ...updatedData } : org
      );
      this.organizations.set(updatedOrganizations);
      this.success.set('Organization updated successfully.');
    } catch (error: any) {
      this.error.set('Error updating organization: ' + error.message);
      throw new Error('Error updating organization: ' + error.message);
    }
  }

  @WithLoading()
  async deleteOrganization(organizationId: string): Promise<void> {
    this.error.set(null);
    this.success.set(null);

    try {
      const deleteOrganizationFunction = httpsCallable(this.functions, 'deleteOrganization');
      await deleteOrganizationFunction({ organizationId });
      const updatedOrganizations = this.organizations().filter(org => org.organizationId !== organizationId);
      this.organizations.set(updatedOrganizations);
      this.success.set('Organization deleted successfully.');
    } catch (error: any) {
      this.error.set('Error deleting organization: ' + error.message);
      throw new Error('Error deleting organization: ' + error.message);
    }
  }
}
