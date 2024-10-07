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


interface CohortData {
  cohortId?: string;
  coachId: string;
  cohortName: string;
  participants: string[];
  startDate: string;
  endDate: string;
}

/**
 * Cloud Function to get all cohorts.
 */
export const getCohorts = functions.https.onCall(async () => {
  try {
    const cohortsSnapshot = await admin.firestore().collection('cohorts').get();
    const cohorts = cohortsSnapshot.docs.map((doc) => ({ cohortId: doc.id, ...doc.data() }));
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