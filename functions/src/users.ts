/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-parens */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

interface CreateUserData {
  id: string;
  email: string;
  phoneNumber: string;
  role: string;
  rank: number;
}

interface RecoverEmailData {
  id: string;
}

interface SendPasswordResetData {
  id: string;
  email?: string;
  phoneNumber?: string;
}

/**
 * Cloud Function to recover a user's email by their ID.
 */
export const recoverEmail = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const data: RecoverEmailData = request.data;
  if (!request.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const userId = data.id;
  if (!userId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid user ID.');
  }

  try {
    const userRecord = await admin.auth().getUser(userId);
    return { email: userRecord.email };
  } catch (error: any) {
    throw new functions.https.HttpsError('not-found', 'User not found.', error.message);
  }
});

/**
 * Cloud Function to send a password reset email or SMS.
 */
export const sendPasswordReset = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const data: SendPasswordResetData = request.data;
  if (!request.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const { id, email, phoneNumber } = data;
  const idKey = 'staffId';

  if (!email && !phoneNumber) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid email address or phone number.');
  }

  try {
    let userToReset;
    if (email) {
      userToReset = await admin.auth().getUserByEmail(email);
    } else if (phoneNumber) {
      userToReset = await admin.auth().getUserByPhoneNumber(phoneNumber);
    }

    if (!userToReset) {
      throw new functions.https.HttpsError('not-found', 'User not found with the provided email or phone number.');
    }

    if (!userToReset.customClaims || userToReset.customClaims[idKey] !== id) {
      throw new functions.https.HttpsError('permission-denied', 'The user does not have the required permissions to send a password reset.');
    }

    if (email) {
      await admin.auth().generatePasswordResetLink(email);
      return { message: 'Password reset email sent successfully.' };
    } else if (phoneNumber) {
      return { message: 'Password reset initiated via phone number (requires separate OTP verification).' };
    }
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to send password reset.', error.message);
  }
  return { message: 'Password reset initiated.' };
});

/**
 * Cloud Function to create a new user.
 */
export const createUser = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const data: CreateUserData = request.data;
  if (!request.auth || !request.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Must be an admin to create a new user.');
  }

  const { email, phoneNumber, id, role, rank } = data;
  if (!email || !id || !phoneNumber || !role || !rank) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      phoneNumber,
    });

    await admin.auth().setCustomUserClaims(userRecord.uid, {
      id,
      role,
      rank
    });

    await admin.firestore().collection('users').doc(userRecord.uid).set({ email, phoneNumber, id, role, rank });

    return { uid: userRecord.uid };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to create user', error.message);
  }
});

/**
 * Cloud Function to update an existing user.
 */
export const updateUser = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const data: CreateUserData = request.data;
  if (!request.auth || !request.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Must be an admin to update a user.');
  }

  const { email, phoneNumber, id, role, rank } = data;
  if (!email || !id || !phoneNumber || !role || !rank) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    await admin.auth().setCustomUserClaims(userRecord.uid, {
      id,
      role,
      rank
    });

    await admin.firestore().collection('users').doc(userRecord.uid).update({ email, phoneNumber, id, role, rank });

    return { uid: userRecord.uid };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to update user', error.message);
  }
});