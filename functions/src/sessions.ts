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
    const sessions = sessionsSnapshot.docs.map((doc) => ({ sessionId: doc.id, ...doc.data() }));
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
