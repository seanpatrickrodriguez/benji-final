/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable semi */

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

interface CreateUserData {
  id: string;
  email: string;
  phoneNumber: string;
  role: string;
  rank: number;
}

interface SessionData {
  participantId: string;
  sessionId?: string;
  sessionDate: string;
  sessionNumber: number;
  isMakeup: boolean;
  transportationService: string;
  wellnessActivity: string[];
  bodyWeight: number;
  weeklyPhysicalActivityMinutes: number;
}

interface CohortData {
  cohortId?: string;
  coachId: string;
  cohortName: string;
  participants: string[];
  startDate: string;
  endDate: string;
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

/**
 * Cloud Function to get sessions for a participant.
 */
export const getSessions = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const participantId = request.data.participantId;
  if (!participantId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid participant ID.');
  }

  try {
    const sessionsSnapshot = await admin.firestore().collection('sessions').where('participantId', '==', participantId).get();
    const sessions = sessionsSnapshot.docs.map(doc => ({ sessionId: doc.id, ...doc.data() }));
    return sessions;
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to fetch sessions', error.message);
  }
});

/**
 * Cloud Function to create a session.
 */
export const createSession = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const data: SessionData = request.data;
  if (!data.participantId || !data.sessionDate || !data.sessionNumber) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields to create a session.');
  }

  try {
    const newSessionRef = await admin.firestore().collection('sessions').add(data);
    return { sessionId: newSessionRef.id };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to create session', error.message);
  }
});

/**
 * Cloud Function to update a session.
 */
export const updateSession = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const { sessionId, ...updatedData } = request.data;
  if (!sessionId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid session ID.');
  }

  try {
    await admin.firestore().collection('sessions').doc(sessionId).update(updatedData);
    return { message: 'Session updated successfully.' };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to update session', error.message);
  }
});

/**
 * Cloud Function to delete a session.
 */
export const deleteSession = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const sessionId = request.data.sessionId;
  if (!sessionId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid session ID.');
  }

  try {
    await admin.firestore().collection('sessions').doc(sessionId).delete();
    return { message: 'Session deleted successfully.' };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to delete session', error.message);
  }
});

/**
 * Cloud Function to get all cohorts.
 */
export const getCohorts = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  try {
    const cohortsSnapshot = await admin.firestore().collection('cohorts').get();
    const cohorts = cohortsSnapshot.docs.map(doc => ({ cohortId: doc.id, ...doc.data() }));
    return cohorts;
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to fetch cohorts', error.message);
  }
});

/**
 * Cloud Function to create a cohort.
 */
export const createCohort = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const data: CohortData = request.data;
  if (!data.coachId || !data.cohortName || !data.startDate || !data.endDate) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields to create a cohort.');
  }

  try {
    const newCohortRef = await admin.firestore().collection('cohorts').add(data);
    return { cohortId: newCohortRef.id };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to create cohort', error.message);
  }
});

/**
 * Cloud Function to update a cohort.
 */
export const updateCohort = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const { cohortId, ...updatedData } = request.data;
  if (!cohortId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid cohort ID.');
  }

  try {
    await admin.firestore().collection('cohorts').doc(cohortId).update(updatedData);
    return { message: 'Cohort updated successfully.' };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to update cohort', error.message);
  }
});

/**
 * Cloud Function to delete a cohort.
 */
export const deleteCohort = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const cohortId = request.data.cohortId;
  if (!cohortId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid cohort ID.');
  }

  try {
    await admin.firestore().collection('cohorts').doc(cohortId).delete();
    return { message: 'Cohort deleted successfully.' };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to delete cohort', error.message);
  }
});
