import { DIABETES_TYPES, EDUCATION_LEVELS, ETHNICITIES, GENDERS, MARITAL_STATUSES, NATIONS, RACES, SEXES } from "../resources/constants/constants";
import { ValueOf } from "../resources/types";

// Types for delivery mode and status
type DPRPDeliveryMode = 'In Person' | 'Distance Learning' | 'Online' | 'Hybrid' | 'Combo';
type DPRPStatus = 'Pending' | 'Preliminary' | 'Full' | 'FullPlus' | 'Probation' | 'Expired';

// Roles for different contexts
type PIDPPRole = 'Lifestyle Change Coach' | 'Data Specialist' | 'Program Coordinator' | 'Master Trainer';
type BENJIRole = 'Lifestyle Change Coach' | 'Data Specialist' | 'Program Coordinator' | 'Master Trainer' | 'Staff' | 'Researcher' | 'Guest' | 'Administrator';

/**
 * @description Database structure for the application.
 * The keys represent Firestore collections, and the values represent corresponding data structures.
 */
export interface DatabaseStructure {
  organization: { [key: string]: Organization };
  program: { [key: string]: PacificIslanderDiabetesPreventionProgram | DiabetesPreventionRecognitionProgram };
  user: { [key: string]: User };
  staff: { [key: string]: Staff };
  registrant: { [key: string]: Registrant<any> };
  cohort: { [key: string]: pidppCohort };
  participant: { [key: string]: Participant<any> };
  session: { [key: string]: PIDPPSession };
}

/**
 * @description Metadata attached to most entities for tracking creation and modification.
 */
interface Metadata {
  createdBy: string;
  createdOn: number;
  modifiedBy?: string;
  modifiedOn?: number;
}

/**
 * @description An organization entity in the system.
 */
export interface Organization {
  display: {
    name: string;
    acronym?: string;
  }
  metadata: Metadata;
  identifier: {
    organization?: string; // One-to-One: Organization ID
    program?: string[];    // One-to-Many: Organization can have multiple programs
    staff?: string[];      // One-to-Many: Organization can have multiple staff members
  };
  address: {
    headquarter?: string;
    mailing?: string;
  };
  phone?: string;
}

export type Program<T> = ProgramBase & T;

interface ProgramBase {
  type: 'PIDPP' | 'DPRP';
  metadata: Metadata;
  identifier: {
    organization: string; // One-to-One: Program belongs to one organization
    program: string;      // One-to-One: The program itself
    staff: string[];      // One-to-Many: Program can have multiple staff members
  };
};

/**
 * @description A program entity in the system.
 */
export interface PacificIslanderDiabetesPreventionProgram {
  type: 'PIDPP';
  name: string;
  identifier: {
    orgCode: string[];
  };
  startDate: number | string;
  endDate?: number | string;
}

/**
 * @description Recognition details for the Diabetes Prevention Recognition Program (DPRP).
 */
export interface DiabetesPreventionRecognitionProgram {
  type: 'DPRP';
  identifier: {
    orgCode: string;
  };
  recognition: DPRPRecognition;
  deliveryMode: DPRPDeliveryMode;
  approvalDate?: number | string;
  effectiveDate?: number | string;
}

interface DPRPRecognition {
  file?: string;
  status: DPRPStatus;
  beginDate?: number | string;
  expirationDate?: number | string;
}

/**
 * @description Staff entity with references to multiple programs.
 */
interface Staff {
  metadata: Metadata;
  identifier: {
    organization: string;  // One-to-One: Staff belongs to one organization
    program: string[];     // One-to-Many: Staff may work in multiple programs
    staff: string;         // One-to-One: Staff ID
  };
  contact: Contact;
  role: {
    benji: BENJIRole[];
    pidpp?: PIDPPRole[];
  };
  trainings: {
    [key: string]: {
      date: string;
      name: string;
      instructor?: string;
      location?: string;
      provider?: string;
      type: 'In-Person' | 'Online' | 'Hybrid';
    } | undefined
  };
  certifications: {
    lifestyleChangeCoach?: LifestyleChangeCoachCertification;
    [key: string]: any;
  };
}

export interface AdvancedLifestyleChangeCoach {
  metadata: Metadata;
  name: string;
  trainingBody?: string;
  certifyingBody?: string;
  instructor?: string[];
  certificationDate?: string;
  expirationDate?: string;
  additionalComment?: string;
}

export interface LifestyleChangeCoachCertification {
  metadata: Metadata;
  trainingBody?: string;
  certifyingBody?: string;
  certificationDate?: string;
  expirationDate?: string;
}

/**
 * @description User entity with references to cohorts, programs, and organizations.
 */
interface User {
  metadata: Metadata;
  identifier: {
    organization: string;  // One-to-One: User belongs to one organization
    program: string[];     // One-to-Many: User may participate in multiple programs
    staff: string;         // One-to-One: Staff ID (if applicable)
    cohort?: string[];     // One-to-Many: User may belong to multiple cohorts
  };
  contact: Contact;
  role: {
    benji: BENJIRole[];
    pidpp?: PIDPPRole[];
  };
  permissions: {
    [key: string]: { [key: string]: string } | undefined; // Object of accessible IDs (e.g., program, cohort)
  };
}

/**
 * @description Registrant entity, extended with specific program-related fields using generics.
 */
export type Registrant<T> = RegistrantBase & T;

interface RegistrantBase {
  metadata: Metadata;
  identifier: {
    organization: string;    // One-to-One: Registrant belongs to one organization
    program: string[];       // One-to-Many: Registrant may belong to multiple programs
    staff: string[];         // One-to-Many: Staff related to the registrant
    cohort: string[];        // One-to-Many: Registrant can be in multiple cohorts
    registrant: string;      // One-to-One: Registrant ID
    participant?: string[];  // One-to-Many: Related participants
    samePerson?: string[];   // One-to-Many: Linked records for the same individual
  };
  contact: Contact;
  health: Health;
  demographic: Demographic;
}

/**
 * @description Participant entity, extended with specific program-related fields using generics.
 */
export type Participant<T> = ParticipantBase & T;

export interface ParticipantBase {
  identifier: {
    organization: string;    // One-to-One: Participant belongs to one organization
    program: string[];       // One-to-Many: Participant may belong to multiple programs
    staff: string[];         // One-to-Many: Staff related to the participant
  };
  registrationSnapshot: {
    [key: string]: Registrant<any> | undefined;
  };
}

/**
 * @description PIDPP-specific participant details.
 */
export interface PIDPPParticipant {
  identifier: {
    cohort: string;            // One-to-One: Participant belongs to one cohort
    participant: string;       // One-to-One: Participant ID
    primaryCoach?: string;     // One-to-One: Primary coach
    secondaryCoach?: string;   // One-to-One: Secondary coach (optional)
    instructor?: string[];     // One-to-Many: Multiple instructors (optional)
    instructorAssistant?: string[]; // One-to-Many: Multiple assistants (optional)
    samePerson?: string[];     // One-to-Many: Linked records for the same individual
  };
}

/**
 * @description Contact details for individuals in the system.
 */
export interface Contact {
  name: FullName;
  email: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface FullName {
  first: string;
  last: string;
  middle?: string;
  prefix?: string;
  suffix?: string;
  preferred?: string;
}

/**
 * @description Health information for registrants and participants.
 */
export interface Health {
  healthInsurance?: {};
  diabetes?: {
    type?: ValueOf<typeof DIABETES_TYPES>;
    diagnosisDate?: string;
    treatment?: string;
  };
  hypertension?: boolean;
  physicallyActive?: boolean;
  currentPregnancy?: boolean;
  familyMedicalHistory?: FamilyMedicalHistory;
  registrationBMI?: number;
}

interface FamilyMedicalHistory {
  diabetes?: HistoryDetail;
  hypertension?: HistoryDetail;
  heartDisease?: HistoryDetail;
  stroke?: HistoryDetail;
  cancer?: HistoryDetail;
}

interface HistoryDetail {
  type?: string;
  relation?: string;
}

/**
 * @description Demographic details for registrants and participants.
 */
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

/**
 * @description Cohort details for PIDPP programs.
 */
export interface pidppCohort {
  metadata: Metadata;
  name: string;
  identifier: {
    organization: string;       // One-to-One: Cohort belongs to one organization
    program: string[];          // One-to-Many: Cohort may belong to multiple programs
    staff: string[];            // One-to-Many: Staff associated with the cohort
    cohort: string;             // One-to-One: Cohort ID
    participant?: string[];     // One-to-Many: Participants in the cohort
    primaryCoach?: string;      // One-to-One: Primary coach
    secondaryCoach?: string;    // One-to-One: Secondary coach (optional)
    instructor?: string[];      // One-to-Many: Instructors (optional)
    instructorAssistant?: string[]; // One-to-Many: Instructor assistants (optional)
  };
  startDate?: string;
  endDate?: string;
}

export type Session<T> = SessionBase & T;

interface SessionBase {
  metadata: Metadata;
  identifier: {
    organization: string;
    program: string[];
    staff: string[];
    cohort: string;
    participant?: string[];
    session: string;
  };
  date: string;
}

/**
 * @description Session details for PIDPP programs.
 */
export interface PIDPPSession {
  metadata: Metadata;
  identifier: {
    instructor: string;           // One-to-One: Instructor
    instructorAssistant: string;  // One-to-One: Instructor assistant
  };
  module: DPPModule;
  transportationService?: string[];
  wellnessActivity?: string[];
}

export type Log<T> = LogBase & T;

interface LogBase {
  metadata: Metadata;
  identifier: {
    organization: string;
    program: string[];
    staff: string[];
    cohort: string;
    participant: string;
    session: string;
  };
  date: string;
}

export interface PIDPPLog {
  identifier: {
    instructor: string;
    instructorAssistant: string;
    makeupFor?: string;
  };
  isMakeup: boolean;
  homework: any;
  notes?: string;
  transportationService?: string[];
  wellnessActivity?: string[];
  weeklyPhysicalActivityMinutes?: number;
  currentBodyWeightPounds?: number;
}


/**
 * @description Module details for sessions.
 */
export interface DPPModule {
  id: string;
  name: string;
  description: string;
  duration: number;
  url?: string;
}