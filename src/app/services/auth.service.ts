import { inject, Injectable, Signal, signal } from '@angular/core';
import { WithLoading } from '../decorators/with-loading.decorator';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, user } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingService } from './loading.service';
import { Functions, httpsCallable } from '@angular/fire/functions';

/**
 * Service for managing authentication operations and user state.
 * This service provides methods for user sign-up, login, password recovery, and other authentication features.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Signal representing the login state of the user.
   * @type {Signal<boolean>}
   */
  isLoggedIn = signal(false);

  /**
   * Instance of LoadingService to manage loading state.
   * @type {LoadingService}
   */
  loadingService = inject(LoadingService);

  /**
   * Signal representing the current authenticated user.
   * The signal updates automatically based on the Firebase Auth state.
   * @type {Signal<User | undefined | null>}
   */
  user$: Signal<User | undefined | null>;

  /**
   * Constructs the AuthService.
   * @param {Auth} auth - The Firebase Auth instance used for authentication.
   * @param {Functions} functions - The Firebase Functions instance used for calling backend functions.
   */
  constructor(
    private auth: Auth,
    private functions: Functions,
  ) {
    this.user$ = toSignal(user(this.auth));
  }

  /**
   * Signs up a new user with the given email and password.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns A promise that resolves with the user's credentials.
   */
  @WithLoading()
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Logs in a user with the given email and password.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns A promise that resolves with the user's credentials.
   */
  @WithLoading()
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Sends a password recovery request using email or phone number.
   * This request will be verified with a staffId after finding the user.
   * @param {string} email - The user's email address.
   * @param {string} phoneNumber - The user's phone number.
   * @returns A promise that resolves with the response from the backend function.
   */
  @WithLoading()
  sendPasswordReset(staffId: string, email?: string, phoneNumber?: string) {
    return httpsCallable(this.functions, 'sendPasswordReset')({ staffId, email, phoneNumber });
  }
}
