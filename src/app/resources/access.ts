// access.ts

import { ID_FIELD, ROLES } from "./constants";
import { QueryConstraints } from "./types";



export const OPERATION = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  ALL: 'write',
} as const;

export const QUERY_CONSTRAINTS: QueryConstraints = {
  // Collection Name
  users: {
    [ROLES.DEFAULT]: {
      matchField: ID_FIELD.USER,
      operations:OPERATION.ALL,
    },
  },
  userProfiles: {
    [ROLES.COORDINATOR]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.MANAGER_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.MANAGER]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.DATA_SPECIALIST_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.DEFAULT]: {
      matchField: ID_FIELD.USER,
      operations:OPERATION.ALL,
    },
  },
  userStates: {
    [ROLES.COORDINATOR]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.DEFAULT]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
  },
  organizations: {
    [ROLES.COORDINATOR]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DEFAULT]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
  },
  organizationProfiles: {
    [ROLES.COORDINATOR]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DEFAULT]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
  },
  programs: {
    [ROLES.COORDINATOR]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.COACH_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.COACH_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.ANALYST]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.DEFAULT]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.READ,
    },
  },
  programProfiles: {
    [ROLES.COORDINATOR]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.COACH_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.COACH_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.ANALYST]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.DEFAULT]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.READ,
    },
  },
  cohorts: {
    [ROLES.COORDINATOR]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.COACH_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.COACH_1]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.ANALYST]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.DEFAULT]: {
      matchField: ID_FIELD.COHORT,
      operations:OPERATION.READ,
    },
  },
  cohortProfiles: {
    [ROLES.COORDINATOR]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.COACH_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.COACH_1]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.ANALYST]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.DEFAULT]: {
      matchField: ID_FIELD.COHORT,
      operations:OPERATION.READ,
    },
  },
  sessions: {
    [ROLES.COORDINATOR]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.COACH_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.COACH_1]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.ANALYST]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.READ,
    },
    [ROLES.DEFAULT]: {
      matchField: ID_FIELD.COHORT,
      operations:OPERATION.READ,
    },
  },
  participants: {
    [ROLES.COORDINATOR]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.COACH_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.COACH_1]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.DEFAULT]: {
      matchField: ID_FIELD.COHORT,
      operations:OPERATION.READ,
    },
  },
  participantProfiles: {
    [ROLES.COORDINATOR]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.MANAGER]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST_1]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.DATA_SPECIALIST]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.COACH_2]: {
      matchField: ID_FIELD.ORGANIZATION,
      operations:OPERATION.ALL,
    },
    [ROLES.COACH_1]: {
      matchField: ID_FIELD.PROGRAM,
      operations:OPERATION.ALL,
    },
    [ROLES.DEFAULT]: {
      matchField: ID_FIELD.COHORT,
      operations:OPERATION.READ,
    },
  },
} as const;
