// import { UserCredential } from 'firebase/auth';
import { OPERATION } from './access';
import {
  ALZHEIMERS_AND_DEMENTIA_TYPES,
  ASTHMA_TYPES,
  COPD_TYPES,
  CANCER_TYPES,
  CHRONIC_DISEASES,
  CHRONIC_PAIN_TYPES,
  DIABETES_TYPES,
  HEART_DISEASE_TYPES,
  HYPERTENSION_TYPES,
  KIDNEY_DISEASE_TYPES,
  LIVER_DISEASE_TYPES,
  MENTAL_HEALTH_CONDITION_TYPES,
  OSTEOPOROSIS_TYPES,
  STROKE_TYPES,
  ID_FIELD,
  ROLES,
  COLLECTIONS,
} from './constants';

import { QueryConstraint, UserProfile } from './interfaces';

export type IdList = ValueOf<typeof ID_FIELD>;
export type Partial<T extends string | number | symbol, P> = { [K in T]?: P };
export type testList = Partial<IdList, string>;
export type PartialIdList = { [P in IdList]?: string };

export type Collection = ValueOf<typeof COLLECTIONS>;

export type QueryConstraints = {
  [collection in Collection]:
  { [role in Role]?: QueryConstraint } & { 'default': QueryConstraint }
};

export type CoachRoles = 'Assistant' | 'Primary' | 'Secondary';

export type DeliveryMode =
  | 'Combination'
  | 'In Person'
  | 'Video Call'
  | 'Video Recording';

export type DeliveryMethod = 'In Person' | 'Video Call' | 'Video Recording';

export type DiseaseTypes = {
  [CHRONIC_DISEASES.DIABETES]: ValueOf<typeof DIABETES_TYPES>[];
  [CHRONIC_DISEASES.HEART_DISEASE]: ValueOf<typeof HEART_DISEASE_TYPES>[];
  [CHRONIC_DISEASES.ASTHMA]: ValueOf<typeof ASTHMA_TYPES>[];
  [CHRONIC_DISEASES.CANCER]: ValueOf<typeof CANCER_TYPES>[];
  [CHRONIC_DISEASES.HYPERTENSION]: ValueOf<typeof HYPERTENSION_TYPES>[];
  [CHRONIC_DISEASES.CHRONIC_OBSTRUCTIVE_PULMONARY_DISEASE]: ValueOf<
    typeof COPD_TYPES
  >[];
  [CHRONIC_DISEASES.STROKE]: ValueOf<typeof STROKE_TYPES>[];
  [CHRONIC_DISEASES.ALZHEIMERS_AND_DEMENTIA]: ValueOf<
    typeof ALZHEIMERS_AND_DEMENTIA_TYPES
  >[];
  [CHRONIC_DISEASES.KIDNEY_DISEASE]: ValueOf<typeof KIDNEY_DISEASE_TYPES>[];
  [CHRONIC_DISEASES.LIVER_DISEASE]: ValueOf<typeof LIVER_DISEASE_TYPES>[];
  [CHRONIC_DISEASES.OSTEOPOROSIS]: ValueOf<typeof OSTEOPOROSIS_TYPES>[];
  [CHRONIC_DISEASES.CHRONIC_PAIN]: ValueOf<typeof CHRONIC_PAIN_TYPES>[];
  [CHRONIC_DISEASES.MENTAL_HEALTH_CONDITION]: ValueOf<
    typeof MENTAL_HEALTH_CONDITION_TYPES
  >[];
  [CHRONIC_DISEASES.OTHER]: string[];
};

export type MedicalEvent<T> = {
  date?: string;
  type: T;
};

export type ProgramTypes =
  | 'Clinical Services'
  | 'Food Access and Services'
  | 'Pacific Islander Diabetes Prevention Program';

export type ValueOf<T> = T[keyof T];

export type PartialRecord<K extends keyof any, T> = { [P in K]?: T; };

export type IdField = ValueOf<typeof ID_FIELD>;

export type Message = { message: string };

export type OrganizationProfile = {
  abbreviation: string;
  organizationId: string;
  mask: string;
  name: string;
  services: ProgramProfile[];
};

export type Organization = {
  abbreviation: string;
  name: string;
};

export type OrganizationNames =
  | 'Arkansas Coalition of Marshallese'
  | 'Association of Asian Pacific Community Health Organizations'
  | 'Belau Medical Clinic'
  | 'Chuuk Community Health Center'
  | "Chuuk Women's Council"
  | 'Kosrae Community Health Center'
  | 'Kwajalein Diak Coalition'
  | 'Majuro Wellness Center (Canvasback)'
  | 'Malama I Ke Ola Health Center'
  | 'Marianas Health'
  | 'National Tongan American Society'
  | 'Palau Ministry of Health and Human Services';


export type Role = ValueOf<typeof ROLES>;

export type ProgramProfile = {
  approvalDate?: string;
  deliveryMode: DeliveryMode;
  effectiveDate: string;
  name: string;
  serviceId: string;
};

export type UserCredentialJson = {
  apiKey: string;
  appName: string;
  createdAt: string;
  displayName: string | undefined;
  email: string;
  emailVerified: boolean;
  lastLoginAt: string;
  phoneNumber: string | number | undefined;
  photoUrl: string | undefined;
  uid: string;
};

export type CustomClaim =
  & { [K in IdField]?: string }
  & { approved?: boolean }
  & { sharedWithMe?: { collection: string, matchField: string, matchValue: string, operation: string[] }[] };

export type User =
  & UserCredentialJson
  & UserProfile
  & CustomClaim;

export type ConvertedOperation = 'read' | 'write';

export type Operation = ValueOf<typeof OPERATION>;
