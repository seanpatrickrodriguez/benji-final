import {
  CNMI_MUNICIPALITIES,
  COUNTRY_TERRITORY_NATION_OPTIONS,
  EDUCATION_LEVELS,
  ENROLLMENT_MOTIVATION,
  ETHNICITIES,
  FSM_STATES,
  GENDERS,
  HOSPITALIZATION_REASONS,
  IMMUNIZATION_TYPES,
  LIFESTYLE,
  MARITAL_STATUSES,
  MEDICATION_TYPES,
  NATIONS,
  PALAU_STATES,
  PAYER_SOURCE,
  RMI_MUNICIPALITIES,
  RACES,
  SEXES,
  SURGERY_TYPES,
  US_STATES_AND_TERRITORIES,
} from './constants';
import {
  CoachRoles,
  DeliveryMethod,
  DeliveryMode,
  DiseaseTypes,
  MedicalEvent,
  Organization,
  ProgramTypes,
  Role,
  ValueOf,
  Partial,
  IdList,
  IdField,
  Operation
} from './types';

// Methods


export interface CRUDPermissions {
  create: boolean,
  read: boolean,
  update: boolean,
  delete: boolean,
}

export interface QueryConstraint {
  matchField: IdField;
  operations: Operation;
}

export interface CallbackOrigin {
  class: string;
  section: string;
}

export interface ColumnDef {
  key: string;
  label: string;
  type: 'FormControl' | 'FormGroup' | 'FormArray';
}

export interface CustomClaims {
  approved: boolean;
  organizationId: string;
  role: string[];
}

export interface ErrorMessages {
  [key: string]: string[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface BloodSugar {
  fastingBloodSugar?: number;
  randomBloodSugar?: number;
  oralGlucoseToleranceTest?: number;
  hemoglobinA1c?: number;
}

export interface Client {
  authorizationInclusions: string[];
  authorizationExclusions: string[];
  organizationId: string;
  contact: Contact;
  enrollment: Enrollment;
  demographic: Demographic;
  health: Health;
}

export interface ClientGroup {
  // Identifiers
  coachIds: string & { role: CoachRoles }[];
  groupId: string;
  //
  deliveryMode: DeliveryMode;
  name: string;
  organizationId: string;
  participantIds: string[];
  programId: string;
  projectedStartDate: string;
}

export interface Contact {
  address: Address;
  email: string;
  location: Location;
  name: PersonName;
  phone: Phone;
  preferredContactMethod?: string;
}

export interface Demographic {
  birthDate: string;
  gender: ValueOf<typeof GENDERS>;
  education: ValueOf<typeof EDUCATION_LEVELS>;
  ethnicity: ValueOf<typeof ETHNICITIES>;
  maritalStatus: ValueOf<typeof MARITAL_STATUSES>;
  nation: ValueOf<typeof NATIONS>;
  race: ValueOf<typeof RACES>;
  sex: ValueOf<typeof SEXES>;
}

export interface DocumentMetadata {
  created: string;
  createdBy: string;
  updated: string;
  updatedBy: string;
}

export interface Enrollment {
  referredByHealthcareProfessional: boolean;
  enrollmentMotivation: ValueOf<typeof ENROLLMENT_MOTIVATION>;
  payerSource: ValueOf<typeof PAYER_SOURCE>;
}

export interface Health {
  allergies?: string[];
  currentMedications?: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  familyMedicalHistory?: MedicalHistory;
  healthInsurance?: {};
  medicalHistory?: MedicalHistory;
  primaryCarePhysician?: {
    name?: string;
    phone?: string;
    address?: string;
  };
}

export interface HealthScreening {
  alcoholConsumption?: number | '0-1';

  bloodGlucoseLevel?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  bloodSugar?: BloodSugar;
  bloodUreaNitrogen?: number;
  bodyMassIndex?: number;
  bodyTemperature?: number;
  cholesterolLevel?: number;
  cReactiveProtein?: number;
  creatinine?: number;
  diet?: string;

  hdlCholesterol?: number;
  heartRate?: number;
  height?: string;
  ldlCholesterol?: number;
  oxygenSaturation?: number;
  physicalActivity?: number;

  respirationRate?: number;
  smokingStatus?: boolean;
  stressLevel?: number;

  thyroidStimulatingHormone?: number;
  triglycerides?: number;
  vitaminD?: number;
  waistCircumference?: number;
  weight?: number;
}

export interface Location {
  city: string;
  country: ValueOf<typeof COUNTRY_TERRITORY_NATION_OPTIONS>;
  postalCode: string;
  state: ValueOf<
    | typeof CNMI_MUNICIPALITIES
    | typeof FSM_STATES
    | typeof PALAU_STATES
    | typeof RMI_MUNICIPALITIES
    | typeof US_STATES_AND_TERRITORIES
  >;
  streetAddress?: {
    address1?: string;
    address2?: string;
  };
}

export interface MedicalHistory<
  Disease extends keyof DiseaseTypes = keyof DiseaseTypes
> {
  chronicDiseases?: {
    [Key in Disease]?: {
      type?: DiseaseTypes[Disease];
    };
  };
  immunizations?: MedicalEvent<ValueOf<typeof IMMUNIZATION_TYPES>>[];
  hospitalizations?: MedicalEvent<ValueOf<typeof HOSPITALIZATION_REASONS>>[];
  lifestyle?: MedicalEvent<ValueOf<typeof LIFESTYLE>>[];
  medications?: ValueOf<typeof MEDICATION_TYPES>[];
  surgeries?: MedicalEvent<ValueOf<typeof SURGERY_TYPES>>[];
}

export interface UserMetadata {
  lastSignIn: string;
  created: string;
}

export interface ParticipantSessionData extends SessionDetails {
  //Identifiers
  coachIds: string & { role: CoachRoles }[];
  groupId: string;
  organizationId: string;
  participantId: string;
  programId: string;
  sessionId: string;
  // Data
  deliveryMethod: DeliveryMethod;
  isMakeUp: boolean;
  physicalActivityMinutes: number | undefined;
  strategicActivities: StrategicActivities;
  weight: number | undefined;
}

export interface PI_DPP_Module {
  number: number;
  title: string;
}

export interface PersonName {
  first: string;
  middle?: string;
  last: string;
  nick?: string;
}

export interface Phone {
  home?: string;
  mobile?: string;
}

export interface PrediabetesRiskTest {
  age: number | string;
  diagnosedHighBloodPressure: boolean;
  gestationalDiabetes: boolean;
  hasFamilyHistoryDiabetes: boolean;
  isPhysicallyActive: boolean;
  sex: ValueOf<typeof SEXES>;
  score: number[];
  weightCategory: { height: string; weight: number };
}

export interface Program {
  // Identifiers
  programId: string;
  organizationId: string;
  //
  mode: DeliveryMode;
  title: ProgramTypes;
}

export interface Session extends SessionDetails {
  //Identifiers
  coachIds: (string & { role: CoachRoles })[];
  groupId: string;
  organizationId: string;
  participantIds: string[];
  programId: string;
  sessionId: string;
}

export interface SessionDetails {
  date: string;
  module: PI_DPP_Module;
  number: number;
}

export interface StrategicActivities {
  communityEngagement?: boolean;
  educationalWorkshop?: boolean;
  healthScreenings?: boolean;
  mentalHealthSupport?: boolean;
  nutritionClass?: boolean;
  physicalActivity?: boolean;
  smokingCessation?: boolean;
  substanceAbuseTreatment?: boolean;
  transportation?: boolean;
}

export interface TableConfig {
  headers: string[];
  footers?: string[];
  styles?: any;
}

export interface UserProfile extends NewUserProfile {
  organizationId: string;
  role: Role[];
}

export interface NewUserProfile extends NewSignUpProfile, Partial<IdList, string> {
  approved: boolean;
  email: string;
  name: PersonName;
  organization: Organization;
  uid: string;
  metadata: {
    document: DocumentMetadata;
    user: UserMetadata;
  };
  phone?: string;
}

export interface accessCard {
  type: 'hub' | 'sub' | 'analyst' | 'admin';
  role: Role[];
  rank: 0 | 1 | 2 | 3;
  sharedWithMe: string[];
}

export interface NewSignUpProfile {
  email: string,
  name: PersonName,
  organization: Organization
}



