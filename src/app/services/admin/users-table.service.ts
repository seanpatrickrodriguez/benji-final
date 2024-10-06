import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  role: string;
  rank: number;
}


@Injectable({
  providedIn: 'root',
})
export class UsersTableService {
  constructor(private firestore: Firestore) {}

  /**
   * Fetches all users from the 'users' collection in Firestore.
   * @returns An observable of User array.
   */
  getUsers(): Observable<User[]> {
    const usersCollection = collection(this.firestore, 'users');
    return collectionData(usersCollection, { idField: 'uid' }) as Observable<User[]>;
  }

}
