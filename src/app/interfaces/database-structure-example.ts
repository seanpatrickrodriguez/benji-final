import { DatabaseStructure } from "./database-interfaces";

export const DATABASE_STRUCTURE_EXAMPLE: DatabaseStructure = {
  organization: {
    'org1': {
      name: 'Pacific Health Org',
      metadata: {
        createdBy: 'admin1',
        createdOn: Date.now(),
      },
      identifier: {
        organization: 'org1',
        program: ['prog1', 'prog2'],
        staff: ['staff1', 'staff2', 'staff3'],
      },
    },
  },
  program: {
    'prog1': {
      name: 'Pacific Islander Diabetes Prevention Program',
      metadata: {
        createdBy: 'admin1',
        createdOn: Date.now(),
      },
      identifier: {
        organization: 'org1',
        program: 'prog1',
        staff: ['staff1', 'staff3'],
      },
      startDate: Date.now(),
      endDate: undefined,
    },
    'prog2': {
      metadata: {
        createdBy: 'admin2',
        createdOn: Date.now(),
      },
      orgCode: 'PHDPP',
      recognition: {
        file: 'recognitionFile.pdf',
        status: 'Preliminary',
        beginDate: Date.now(),
        expirationDate: undefined,
      },
      deliveryMode: 'In Person',
    },
  },
  user: {
    'user1': {
      metadata: {
        createdBy: 'admin1',
        createdOn: Date.now(),
      },
      identifier: {
        organization: 'org1',
        program: ['prog1'],
        staff: 'staff1',
        cohort: ['cohort1', 'cohort2'],
      },
      contact: {
        name: {
          first: 'John',
          last: 'Doe',
        },
        email: 'john.doe@example.com',
        phoneNumber: '555-1234',
      },
      role: {
        benji: ['Lifestyle Change Coach'],
        pidpp: ['Program Coordinator'],
      },
      permissions: {
        organization: { org1: 'org1' },
        program: { prog1: 'prog1' },
        cohort: { cohort1: 'cohort1', cohort2: 'cohort2' },
      },
    },
  },
  staff: {
    'staff1': {
      metadata: {
        createdBy: 'admin1',
        createdOn: Date.now(),
      },
      identifier: {
        organization: 'org1',
        program: ['prog1'],
        staff: 'staff1',
      },
      contact: {
        name: {
          first: 'Jane',
          last: 'Smith',
        },
        email: 'jane.smith@example.com',
        phoneNumber: '555-5678',
      },
      role: {
        benji: ['Staff'],
        pidpp: ['Lifestyle Change Coach'],
      },
    },
  },
  registrant: {
    'registrant1': {
      metadata: {
        createdBy: 'admin1',
        createdOn: Date.now(),
      },
      identifier: {
        organization: 'org1',
        program: ['prog1'],
        staff: ['staff1', 'staff2'],
        cohort: ['cohort1'],
        registrant: 'registrant1',
        participant: ['participant1', 'participant2'],
        samePerson: ['samePerson1'],
      },
      contact: {
        name: {
          first: 'Mary',
          last: 'Johnson',
        },
        email: 'mary.johnson@example.com',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
      health: {
        healthInsurance: {},
        diabetes: {
          type: 'Type 2',
          diagnosisDate: '2020-01-01',
          treatment: 'Insulin',
        },
        hypertension: true,
        familyMedicalHistory: {
          diabetes: { type: 'Type 2', relation: 'Mother' },
        },
        registrationBMI: 29.5,
      },
      demographic: {
        birthDate: '1985-05-10',
        gender: 'Female',
        education: 'High School Diploma or GED (Secondary education)',
        ethnicity: 'Micronesian',
        maritalStatus: 'Married',
        nation: 'United States',
        race: 'Micronesian',
        sex: 'Female',
      },
    },
  },
  cohort: {
    'cohort1': {
      metadata: {
        createdBy: 'admin1',
        createdOn: Date.now(),
      },
      name: 'Cohort 1',
      identifier: {
        organization: 'org1',
        program: ['prog1'],
        staff: ['staff1'],
        cohort: 'cohort1',
        participant: ['participant1', 'participant2'],
        primaryCoach: 'staff1',
        secondaryCoach: 'staff2',
      },
      startDate: '2023-01-01',
      endDate: undefined,
    },
  },
  participant: {
    'participant1': {
      identifier: {
        organization: 'org1',
        program: ['prog1'],
        staff: ['staff1'],
      },
      registrationSnapshot: {
        '2023': {
          metadata: {
            createdBy: 'admin1',
            createdOn: Date.now(),
          },
          identifier: {
            organization: 'org1',
            program: ['prog1'],
            staff: ['staff1'],
            cohort: ['cohort1'],
            registrant: 'registrant1',
            participant: ['participant1'],
          },
          contact: {
            name: {
              first: 'Mary',
              last: 'Johnson',
            },
            email: 'mary.johnson@example.com',
            city: 'New York',
            state: 'NY',
            zip: '10001',
          },
          health: {
            healthInsurance: {},
            diabetes: {
              type: 'Type 2',
              diagnosisDate: '2020-01-01',
              treatment: 'Insulin',
            },
            registrationBMI: 29.5,
          },
          demographic: {
            birthDate: '1985-05-10',
            gender: 'Female',
            ethnicity: 'Micronesian',
            maritalStatus: 'Married',
            nation: 'United States',
            race: 'Micronesian',
            sex: 'Female',
          },
        },
      },
    },
  },
  session: {
    'session1': {
      metadata: {
        createdBy: 'admin1',
        createdOn: Date.now(),
      },
      identifier: {
        organization: 'org1',
        program: 'prog1',
        staff: ['staff1'],
        cohort: 'cohort1',
        participant: ['participant1'],
        session: 'session1',
        instructor: 'staff1',
        instructorAssistant: 'staff2',
      },
      date: '2023-02-01',
      module: {
        id: 'module1',
        name: 'Introduction to Diabetes',
        description: 'Basics of managing Type 2 diabetes',
        duration: 60,
      },
      isMakeup: false,
      transportationService: ['Bus'],
      wellnessActivity: ['Walking'],
      weeklyPhysicalActivityMinutes: 150,
      previousBodyWeightPounds: 180,
      currentBodyWeightPounds: 175,
    },
  },
} as const;
