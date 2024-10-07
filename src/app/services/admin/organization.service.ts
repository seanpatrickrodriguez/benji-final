import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, deleteDoc, updateDoc, doc, collectionData, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { WithLoading } from '../../decorators/with-loading.decorator';

export interface Organization {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private orgCollection: CollectionReference<DocumentData>

  constructor(private firestore: Firestore) {
    this.orgCollection = collection(this.firestore, 'organizations');
  }

  @WithLoading()
  createOrganization(organization: Organization): Promise<void> {
    return addDoc(this.orgCollection, organization).then(() => { });
  }

  @WithLoading()
  deleteOrganization(id: string): Promise<void> {
    const orgDocRef = doc(this.firestore, `organizations/${id}`);
    return deleteDoc(orgDocRef);
  }

  @WithLoading()
  updateOrganization(id: string, organization: Partial<Organization>): Promise<void> {
    const orgDocRef = doc(this.firestore, `organizations/${id}`);
    return updateDoc(orgDocRef, organization);
  }

  getOrganizations(): Observable<Organization[]> {
    return collectionData(this.orgCollection, { idField: 'id' }) as Observable<Organization[]>;
  }
}