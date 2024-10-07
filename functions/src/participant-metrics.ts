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
admin.initializeApp();

// interface ParticipantMetricsData {
//   participantId: string;
//   affiliateSiteAcronym: string;
//   region: string;
//   cohortId: string;
//   coachId: string;
//   programYear: string;
//   finalEligibility: boolean;
//   completer: boolean;
//   riskReduced: boolean;
//   riskReducedA: boolean;
//   riskReducedB: boolean;
//   riskReducedC: boolean;
//   riskReducedD: boolean;
//   age: number;
//   state: string;
//   gdm: boolean;
//   riskTest: boolean;
//   t1t2Diabetes: boolean;
//   cohortStartDate: string;
//   startDate: string;
//   finalDate: string;
//   participationTimespan: number;
//   participationCount: number;
//   regularSessionCount: number;
//   makeupCount: number;
//   coreCount: number;
//   coreMaintenanceCount: number;
//   weightRecordCount: number;
//   pamRecordCount: number;
//   initialWeight: number;
//   finalWeight: number;
//   weightChangePounds: number;
//   weightChangePercent: number;
//   initialBmi: number;
//   finalBmi: number;
//   initialHba1c: number;
//   finalHba1c: number;
//   hba1cChange: number;
//   averageWeeklyPhysicalActivityMinutes: number;
//   estimatedTotalPam: number;
// }

/**
 * Cloud Function to get metrics for a participant.
 */
export const getParticipantMetrics = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const participantId = request.data.participantId;
  if (!participantId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid participant ID.');
  }

  try {
    const metricsSnapshot = await admin.firestore().collection('participantMetrics').where('participantId', '==', participantId).get();
    const metrics = metricsSnapshot.docs.map(doc => ({ metricId: doc.id, ...doc.data() }));
    return metrics;
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to fetch participant metrics', error.message);
  }
});

/**
 * Cloud Function to update metrics for a participant.
 */
export const updateParticipantMetrics = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const { participantId, ...updatedData } = request.data;
  if (!participantId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid participant ID.');
  }

  try {
    const metricsSnapshot = await admin.firestore().collection('participantMetrics').where('participantId', '==', participantId).get();
    if (metricsSnapshot.empty) {
      throw new functions.https.HttpsError('not-found', 'Metrics not found for the specified participant ID.');
    }

    const batch = admin.firestore().batch();
    metricsSnapshot.docs.forEach(doc => {
      batch.update(doc.ref, updatedData);
    });
    await batch.commit();

    return { message: 'Participant metrics updated successfully.' };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to update participant metrics', error.message);
  }
});