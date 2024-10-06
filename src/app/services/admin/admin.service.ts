import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Functions, httpsCallable, HttpsCallableResult } from '@angular/fire/functions';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { WithLoading } from '../../decorators/with-loading.decorator';

/**
 * Service for managing administrative operations, such as user creation.
 * This service provides methods to manage users within an internal admin panel.
 */
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  /**
   * Signal representing the error state of the current operation.
   */
  error: WritableSignal<string | null> = signal(null);

  /**
   * Signal representing the success state of the current operation.
   */
  success: WritableSignal<string | null> = signal(null);

  /**
   * Constructs the AdminService.
   * @param {Functions} functions - The Firebase Functions instance used for calling backend functions.
   */
  constructor(
    private functions: Functions
  ) { }

  /**
   * Creates a new user in the system with specified information.
   * This method ensures the user is created via an admin panel.
   *
   * @param {string} email - The user's email address.
   * @param {string} phoneNumber - The user's phone number.
   * @param {string} id - The unique staff ID assigned to the user.
   * @param {string} role - The role assigned to the user (e.g., 'staff', 'coordinator', 'admin').
   * @param {number} rank - The rank assigned to the user.
   */
  @WithLoading()
  async createUser(email: string, phoneNumber: string, id: string, role: string, rank: number) {
    this.error.set(null);
    this.success.set(null);

    try {
      const createUserFunction = httpsCallable(this.functions, 'createUser');
      const userCredential = await createUserFunction({ email, phoneNumber, id, role, rank }) as HttpsCallableResult<{ uid: string }>;
      this.success.set('User created successfully.');
    } catch (error: any) {
      this.error.set(error.message);
    }
  }

  /**
   * Deletes a user from the system with the specified email address.
   * This method ensures the user is deleted via an admin panel.
   *
   * @param {string} email - The email address of the user to delete.
   */
  @WithLoading()
  async deleteUser(email: string) {
    this.error.set(null);
    this.success.set(null);

    try {
      const deleteUserFunction = httpsCallable(this.functions, 'deleteUser');
      const response = await deleteUserFunction({ email }) as HttpsCallableResult<{ uid: string }>;
      this.success.set('User deleted successfully.');
    } catch (error: any) {
      this.error.set(error.message);
    }
  }

  /**
   * Updates a user in the system with the specified information.
   * This method ensures the user is updated via an admin panel.
   *
   * @param {string} email - The user's email address.
   * @param {string} phoneNumber - The user's phone number.
   * @param {string} id - The unique staff ID assigned to the user.
   * @param {string} role - The role assigned to the user (e.g., 'staff', 'coordinator', 'admin').
   * @param {number} rank - The rank assigned to the user.
   */
  @WithLoading()
  async updateUser(email: string, phoneNumber: string, id: string, role: string, rank: number) {
    this.error.set(null);
    this.success.set(null);

    try {
      const updateUserFunction = httpsCallable(this.functions, 'updateUser');
      const response = await updateUserFunction({ email, phoneNumber, id, role, rank }) as HttpsCallableResult<{ uid: string }>;
      this.success.set('User updated successfully.');
    } catch (error: any) {
      this.error.set(error.message);
    }
  }
}

/**
 * Example usage in admin panel component:
 *
 * import { Component, Signal } from '@angular/core';
 * import { AdminService } from './services/admin.service';
 *
 * @Component({
 *   selector: 'app-admin-panel',
 *   templateUrl: './admin-panel.component.html',
 *   styleUrls: ['./admin-panel.component.scss'],
 * })
 * export class AdminPanelComponent {
 *   error: Signal<string | null>;
 *   success: Signal<string | null>;
 *
 *   constructor(public adminService: AdminService) {
 *     this.error = adminService.error;
 *     this.success = adminService.success;
 *   }
 *
 *   createNewUser() {
 *     this.adminService.createUser('test@example.com', '+1234567890', 'STAFF001', 'staff', 1);
 *   }
 *
 *   deleteUser() {
 *     this.adminService.deleteUser('test@example.com');
 *   }
 *
 *   updateUser() {
 *     this.adminService.updateUser('test@example.com', '+1234567890', 'STAFF001', 'staff', 2);
 *   }
 * }
 */