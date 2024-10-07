import { DIABETES_TYPES, EDUCATION_LEVELS, ETHNICITIES, GENDERS, MARITAL_STATUSES, NATIONS, RACES, SEXES } from "../resources/constants";
import { MedicalHistory } from "../resources/interfaces";
import { ValueOf } from "../resources/types";

interface Metadata {
  createdBy: string;
  createdOn: string;
  modifiedBy?: string;
  modifiedOn?: string;
};

interface Organization {
  organizationId: string;
  name: string;
  programs: {}
  programYear: number;
  displayId: string;
  metadata: Metadata;
}

interface Program {
  metadata: Metadata
  programId: string;
  organizationId: string;
  staffIds?: string[];
  name: string;
  startDate: string;
  endDate?: string;
}

interface PacificIslanderDiabetesPreventionProgram {
  pidppId: string;
  organizationCodes: string[];
  roles: ('Lifestyle Change Coach' | 'Data Specialist' | 'Program Coordinator' | 'Master Trainer')[];
}

interface DiabetesPreventionRecognitionProgram {
  recognition: {
    status: 'Pending' | 'Preliminary' | 'Full' | 'FullPlus' | 'Probation' | 'Expired';
    beginDate: string;
    expirationDate: string;
  }
  organizationCode: string;
  deliveryMode: 'In Person' | 'Distance Learning' | 'Online' | 'Hybrid';
  approvalDate: string | null;
  effectiveDate: string | null;
  roles: ('Lifestyle Change Coach' | 'Data Specialist' | 'Program Coordinator')[];
  pidppId: string | null;
}


interface Coach {
  metadata: Metadata;
  coachId: string;
  organizationId: string;
  programId: string;
  name: string;
  email: string;
  phoneNumber: string;
  cohorts: string[];
}



interface RegistrantModel {
  metadata: Metadata;
  registrantId: string;
  participantIds: string[];
  organizationId: string;
  contact: Contact;
  health: Health;
  demographic: Demographic;

};

interface FullName {
  first: string;
  last: string;
  middle?: string;
  prefix?: string;
  suffix?: string;
  preferred?: string;
}

interface Contact {
  name: FullName;
  email?: string;
  phoneNumber?: string;
  address?: string;
  city: string;
  state: string;
  zip: string;
}

interface Health {
  healthInsurance?: {};
  diabetes: ValueOf<typeof DIABETES_TYPES>;
  hypertension?: boolean;
  physicallyActive: boolean;
  currentPregnancy: boolean;
  familyMedicalHistory: {
    diabetes: MedicalHistory;
    hypertension?: MedicalHistory;
    heartDisease?: MedicalHistory;
    stroke?: MedicalHistory;
    cancer?: MedicalHistory;
  }

}

interface Demographic {
  birthDate: string;
  gender: ValueOf<typeof GENDERS>;
  education: ValueOf<typeof EDUCATION_LEVELS>;
  ethnicity: ValueOf<typeof ETHNICITIES>;
  maritalStatus: ValueOf<typeof MARITAL_STATUSES>;
  contact: Contact;
  nation: ValueOf<typeof NATIONS>;
  race: ValueOf<typeof RACES>;
  sex: ValueOf<typeof SEXES>;
}

interface CohortModel {
  metadata: Metadata;
  cohortId: string;
  organizationId: string;
  programId: string;
  programs: Program[]
  name: string;
  participants?: string[];
  startDate?: string;
  endDate?: string;
}

interface pidppCohort extends CohortModel {
  primaryCoachId: string;
  secondaryCoachId: string;
}

interface ParticipantModel {
  participantId: string;
  organizationId: string;
  registrantId: string;
  cohortId: string;
  programId: string;
  initialMetrics: InitialMetricsPIDPP;
  finalMetrics: FinalMetricsPIDPP;
};

interface InitialMetricsPIDPP {
  startDate?: string;
  initialBodyWeightPounds?: number;
  initialBMI?: number;
  initialHbA1c?: number;
}

interface FinalMetricsPIDPP {
  finalBodyWeightPounds?: number;
  finalBMI?: number;
  finalHbA1c?: number;
  finalDate?: number;
  totalWeeklyPhysicalActivityMinutes?: number;
  sessionsAttended?: number;
  sessionsMissed?: number;
}

interface DPPModule {
  moduleId: string;
  name: string;
  description: string;
  duration: number;
}

interface SessionLog {
  sessionId: string;
  organizationId: string;
  programId: string;
  cohortId: string;
  participantId: string;
  date: string;
}

interface pidppSessionLog extends SessionLog{
  primaryCoachId: string;
  secondaryCoachId: string;
  instructorId: string;
  instructorAssistantId: string;
  module: DPPModule;
  isMakeup: boolean;
  transportationService: string[];
  wellnessActivity: string[];
  weeklyPhysicalActivityMinutes: number;
  previousBodyWeightPounds?: number;
  currentBodyWeightPounds?: number;

}