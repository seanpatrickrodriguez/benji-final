import { inject, Injectable, Signal, signal } from '@angular/core';
import { WithLoading } from '../decorators/with-loading.decorator';
import { Auth } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingService } from './loading.service';
import { Functions, httpsCallable, HttpsCallableResult } from '@angular/fire/functions';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

/**
 * Service for managing administrative operations, such as user creation.
 * This service provides methods to manage users within an internal admin panel.
 */
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  /**
   * Instance of LoadingService to manage loading state.
   * @type {LoadingService}
   */
  loadingService = inject(LoadingService);

  /**
   * Constructs the AdminService.
   * @param {Auth} auth - The Firebase Auth instance used for authentication.
   * @param {Functions} functions - The Firebase Functions instance used for calling backend functions.
   * @param {Firestore} firestore - The Firestore instance used for storing user information.
   */
  constructor(
    private auth: Auth,
    private functions: Functions,
    private firestore: Firestore
  ) { }

  /**
   * Creates a new user in the system with specified information.
   * This method ensures the user is created via an admin panel and adds relevant data to Firestore.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @param {string} role - The role assigned to the user (e.g., 'staff', 'coordinator', 'admin').
   * @param {string} phoneNumber - The user's phone number.
   * @param {string} staffId - The unique staff ID assigned to the user.
   * @returns A promise that resolves when the user is created and stored in Firestore.
   */
  @WithLoading()
  async createUser(email: string, password: string, role: string, phoneNumber: string, staffId: string) {
    // Create user in Firebase Auth using a cloud function to ensure security.
    const createUserFunction = httpsCallable(this.functions, 'createUser');
    const userCredential = await createUserFunction({ email, password, phoneNumber, staffId }) as HttpsCallableResult<{ uid: string }>;

    // Save additional user data to Firestore.
    const userId = userCredential.data.uid;
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return setDoc(userDocRef, {
      email,
      phoneNumber,
      role,
      staffId,
      createdAt: new Date().toISOString(),
    });
  }
}

/**
 * Example usage in admin panel component:
 *
 * import { Component } from '@angular/core';
 * import { AdminService } from './services/admin.service';
 *
 * @Component({
 *   selector: 'app-admin-panel',
 *   templateUrl: './admin-panel.component.html',
 *   styleUrls: ['./admin-panel.component.scss'],
 * })
 * export class AdminPanelComponent {
 *   constructor(private adminService: AdminService) {}
 *
 *   createNewUser() {
 *     this.adminService.createUser('test@example.com', 'password123', 'staff', '+1234567890', 'STAFF001')
 *       .then(() => {
 *         console.log('User created successfully');
 *       })
 *       .catch((error) => {
 *         console.error('Error creating user:', error);
 *       });
 *   }
 * }
 */