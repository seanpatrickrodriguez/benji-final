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

interface ParticipantData {
  participantId?: string;
  name: string;
  age: number;
  email: string;
  phoneNumber: string;
  cohortId: string;
}

/**
 * Cloud Function to get all participants.
 */
export const getParticipants = functions.https.onCall(async () => {
  try {
    const participantsSnapshot = await admin.firestore().collection('participants').get();
    const participants = participantsSnapshot.docs.map((doc) => ({ participantId: doc.id, ...doc.data() }));
    return participants;
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to fetch participants', error.message);
  }
});

/**
 * Cloud Function to create a participant.
 */
export const createParticipant = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const data: ParticipantData = request.data;
  if (!data.name || !data.age || !data.email || !data.phoneNumber || !data.cohortId) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields to create a participant.');
  }

  try {
    const newParticipantRef = await admin.firestore().collection('participants').add(data);
    return { participantId: newParticipantRef.id };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to create participant', error.message);
  }
});

/**
 * Cloud Function to update a participant.
 */
export const updateParticipant = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const { participantId, ...updatedData } = request.data;
  if (!participantId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid participant ID.');
  }

  try {
    await admin.firestore().collection('participants').doc(participantId).update(updatedData);
    return { message: 'Participant updated successfully.' };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to update participant', error.message);
  }
});

/**
 * Cloud Function to delete a participant.
 */
export const deleteParticipant = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const participantId = request.data.participantId;
  if (!participantId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid participant ID.');
  }

  try {
    await admin.firestore().collection('participants').doc(participantId).delete();
    return { message: 'Participant deleted successfully.' };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to delete participant', error.message);
  }
});