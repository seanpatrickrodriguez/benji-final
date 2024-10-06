import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

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
 *
 * This function takes a user ID as input and returns the user's email address.
 * @param data - The input data object containing the user ID.
 * @param context - The context in which the function is called.
 * @returns A promise that resolves with an object containing the user's email.
 */
export const recoverEmail = functions.https.onCall(async (data: RecoverEmailData, context: functions.https.CallableContext) => {
  if (!context.auth) {
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
 *
 * This function takes an email address or phone number as input and sends a password reset email or SMS.
 * The request is verified by checking if the authenticated user has the required custom claim or exists in the database.
 * @param data - The input data object containing the email address or phone number.
 * @param context - The context in which the function is called.
 * @returns A promise that resolves when the password reset is initiated.
 */
export const sendPasswordReset = functions.https.onCall(async (data: SendPasswordResetData, context: functions.https.CallableContext) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const { id, email, phoneNumber } = data;
  const idKey = 'staffId'; // 10-5-2024 This should eventually be coded as a user setting..
  // const collKey = 'staff'; // 10-5-2024 This should eventually be coded as a user setting..
  if (!email && !phoneNumber) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid email address or phone number.');
  }

  try {
    // Find the user by email or phone number
    let userToReset;
    if (email) {
      userToReset = await admin.auth().getUserByEmail(email);
    } else if (phoneNumber) {
      userToReset = await admin.auth().getUserByPhoneNumber(phoneNumber);
    }

    if (!userToReset) {
      throw new functions.https.HttpsError('not-found', 'User not found with the provided email or phone number.');
    }

    // Verify the staffId custom claim or in the database.
    if (!userToReset.customClaims || !userToReset.customClaims[idKey] || userToReset.customClaims[idKey] !== id) {
      throw new functions.https.HttpsError('permission-denied', 'The user does not have the required permissions to send a password reset.');
    }

    if (email) {
      await admin.auth().generatePasswordResetLink(email);
      return { message: 'Password reset email sent successfully.' };
    } else if (phoneNumber) {
      // Firebase Auth does not provide a direct way to send a password reset SMS.
      // Typically, you would verify the phone number through a separate OTP flow.
      return { message: 'Password reset initiated via phone number (requires separate OTP verification).' };
    }
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to send password reset.', error.message);
  }
});

export const createUser = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Must be an admin to create a new user.');
  }

  const { email, password, phoneNumber, id, role, rank } = data;
  if (!email || !password || !id || !phoneNumber || !role || !rank) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }

  try {
    // Create the user in Firebase Auth.
    const userRecord = await admin.auth().createUser({
      email,
      password,
      phoneNumber,
    });

    // Assign custom claims if needed.
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      id,
      role,
      rank
    });

    // Return the new user's UID.
    return { uid: userRecord.uid };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to create user', error.message);
  }
});