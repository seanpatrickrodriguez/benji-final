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

interface OrganizationData {
  organizationId?: string;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  participants: string[];
}

/**
 * Cloud Function to create a new organization.
 */
export const createOrganization = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const data: OrganizationData = request.data;
  if (!data.name || !data.address || !data.contactNumber || !data.email) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields to create an organization.');
  }

  try {
    const newOrgRef = await admin.firestore().collection('organizations').add(data);
    return { organizationId: newOrgRef.id };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to create organization', error.message);
  }
});

/**
 * Cloud Function to update an existing organization.
 */
export const updateOrganization = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const { organizationId, ...updatedData } = request.data;
  if (!organizationId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid organization ID.');
  }

  try {
    await admin.firestore().collection('organizations').doc(organizationId).update(updatedData);
    return { message: 'Organization updated successfully.' };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to update organization', error.message);
  }
});

/**
 * Cloud Function to delete an organization.
 */
export const deleteOrganization = functions.https.onCall(async (request: functions.https.CallableRequest) => {
  const organizationId = request.data.organizationId;
  if (!organizationId) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid organization ID.');
  }

  try {
    await admin.firestore().collection('organizations').doc(organizationId).delete();
    return { message: 'Organization deleted successfully.' };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to delete organization', error.message);
  }
});

/**
 * Cloud Function to get all organizations.
 */
export const getOrganizations = functions.https.onCall(async () => {
  try {
    const orgSnapshot = await admin.firestore().collection('organizations').get();
    const organizations = orgSnapshot.docs.map((doc) => ({ organizationId: doc.id, ...doc.data() }));
    return organizations;
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', 'Unable to fetch organizations', error.message);
  }
});