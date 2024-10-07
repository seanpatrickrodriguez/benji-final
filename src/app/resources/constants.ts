// Methods


export const ERRORS                                      : { [key         : string]: string } = {
  'auth/internal-error'                                  : "An internal error has occurred. Please try again later. If the error persists, please contact AAPCHO's system administrator.",
  'auth/app-deleted'                                     : 'The authentication database was deleted.',
  'auth/expired-action-code'                             : 'The action code has expired.',
  'auth/invalid-action-code'                             : 'The action code is invalid.',
  'auth/user-disabled'                                   : 'This user has been disabled.',
  'auth/user-not-found'                                  : 'User not found.',
  'auth/weak-password'                                   : 'The password is too weak.',
  'auth/email-already-in-use'                            : 'This email is already in use.',
  'auth/invalid-email'                                   : 'The email address is not valid.',
  'auth/operation-not-allowed'                           : 'Operation is not allowed.',
  'auth/account-exists-with-different-credential'        : 'Account exists with different credentials.',
  'auth/auth-domain-config-required'                     : 'Auth domain configuration required.',
  'auth/credential-already-in-use'                       : 'This credential is already in use.',
  'auth/operation-not-supported-in-this-environment'     : 'This operation is not supported in your environment.',
  'auth/timeout'                                         : 'Request timed out. Try again.',
  'auth/missing-android-pkg-name'                        : 'An Android package name must be provided if the Android app is required to be installed.',
  'auth/missing-continue-uri'                            : 'A continue URL must be provided in the request.',
  'auth/missing-ios-bundle-id'                           : 'An iOS Bundle ID must be provided if an App Store ID is provided.',
  'auth/invalid-continue-uri'                            : 'The continue URL provided in the request is invalid.',
  'auth/unauthorized-continue-uri'                       : 'The domain of the continue URL is not whitelisted.',
  'auth/invalid-dynamic-link-domain'                     : 'The provided dynamic link domain is not configured or authorized.',
  'auth/argument-error'                                  : 'Invalid argument provided.',
  'auth/invalid-persistence-type'                        : 'The specified persistence type is invalid.',
  'auth/unsupported-persistence-type'                    : 'The current environment does not support the specified persistence type.',
  'auth/invalid-credential'                              : 'The credential provided is invalid.',
  'auth/wrong-password'                                  : 'Incorrect password.',
  'auth/invalid-verification-code'                       : 'The SMS verification code used to create the phone auth credential is invalid.',
  'auth/invalid-verification-id'                         : 'The verification ID used to create the phone auth credential is invalid.',
  'auth/custom-token-mismatch'                           : 'The custom token corresponds to a different audience.',
  'auth/invalid-custom-token'                            : 'The custom token format is incorrect.',
  'auth/captcha-check-failed'                            : 'The CAPTCHA check failed.',
  'auth/invalid-phone-number'                            : 'The phone number is invalid.',
  'auth/missing-phone-number'                            : 'The phone number is missing.',
  'auth/quota-exceeded'                                  : 'Quota for this operation has been exceeded.',
  'auth/provider-already-linked'                         : 'This provider is already linked to another account.',
  'auth/no-such-provider'                                : 'User has not linked to this provider.',
  'auth/admin-restricted-operation'                      : 'Admin restricted this operation.',
  'auth/too-many-requests'                               : 'We have blocked all requests from this device due to unusual activity. Try again later.',
  'auth/requires-recent-login'                           : 'This operation is sensitive and requires recent authentication.',
  'auth/email-change-needs-verification'                 : 'Multi-factor users must always have a verified email.',
  'functions/internal'                                   : 'An unexpected error occurred.',
  'permission-denied'                                    : 'Permission denied.',
  //
  required                                               : 'This field is required.',
  email                                                  : 'Invalid email.',
  noPasswordMatch                                        : 'Passwords must match.',
  noEmailMatch                                           : 'Emails must match.',
  passwordHasMinLength                                   : 'Eight (8) characters',
  passwordHasUpperCase                                   : 'One (1) uppercase letter',
  passwordHasLowerCase                                   : 'One (1) lowercase letter',
  passwordHasNumeric                                     : 'One (1) number',
  passwordHasSpecialChar                                 : 'One (1) symbol or special character',
};

// Forms

export const ID_FIELD                                    = {
  USER                                                   : 'uid',
  ORGANIZATION                                           : 'organizationId',
  PROGRAM                                                : 'programId',
  COHORT                                                 : 'cohortId',
  SESSION                                                : 'sessionId',
  PARTICIPANT                                            : 'participantId',
  STAFF                                                  : 'staffId',
} as const;

export const ALZHEIMERS_AND_DEMENTIA_TYPES               = {
  ALZHEIMERS                                             : "Alzheimer's",
  VASCULAR_DEMENTIA                                      : 'Vascular Dementia',
  DEMENTIA_WITH_LEWY_BODIES                              : 'Dementia with Lewy Bodies',
  FRONTOTEMPORAL_DEMENTIA                                : 'Frontotemporal Dementia',
  OTHER                                                  : 'Other',
} as const;

export const ASTHMA_TYPES                                = {
  INTERMITTENT                                           : 'Intermittent',
  MILD_PERSISTENT                                        : 'Mild Persistent',
  MODERATE_PERSISTENT                                    : 'Moderate Persistent',
  SEVERE_PERSISTENT                                      : 'Severe Persistent',
  OTHER                                                  : 'Other',
} as const;

export const ROLES                                       = {
  ADMINISTRATOR                                          : 'Administrator',
  ANALYST                                                : 'Analyst',
  GUEST                                                  : 'Guest',
  STAFF                                                  : 'Staff',
  COACH                                                  : 'Coach',
  COACH_1                                                : 'Coach 1',
  COACH_2                                                : 'Coach 2',
  DATA_SPECIALIST                                        : 'Data Specialist',
  DATA_SPECIALIST_1                                      : 'Data Specialist 1',
  DATA_SPECIALIST_2                                      : 'Data Specialist 2',
  MANAGER                                                : 'Manager',
  MANAGER_1                                              : 'Manager 1',
  COORDINATOR                                            : 'Coordinator',
  DEFAULT                                                : 'default',
} as const;

export const CANCER_TYPES                                = {
  BREAST                                                 : 'Breast',
  LUNG                                                   : 'Lung',
  COLON                                                  : 'Colon',
  SKIN                                                   : 'Skin',
  PROSTATE                                               : 'Prostate',
  OTHER                                                  : 'Other',
} as const;

export const CHRONIC_DISEASES                            = {
  DIABETES                                               : 'Diabetes',
  HEART_DISEASE                                          : 'Heart Disease',
  ASTHMA                                                 : 'Asthma',
  CANCER                                                 : 'Cancer',
  HYPERTENSION                                           : 'Hypertension',
  CHRONIC_OBSTRUCTIVE_PULMONARY_DISEASE                  : 
    'Chronic Obstructive Pulmonary Disease',
  STROKE                                                 : 'Stroke',
  ALZHEIMERS_AND_DEMENTIA                                : "Alzheimer's and Dementia",
  KIDNEY_DISEASE                                         : 'Kidney Disease',
  LIVER_DISEASE                                          : 'Liver Disease',
  OSTEOPOROSIS                                           : 'Osteoporosis',
  CHRONIC_PAIN                                           : 'Chronic Pain',
  MENTAL_HEALTH_CONDITION                                : 'Mental Health Condition',
  OTHER                                                  : 'Other',
} as const;

export const CHRONIC_PAIN_TYPES                          = {
  ARTHRITIS                                              : 'Arthritis',
  FIBROMYALGIA                                           : 'Fibromyalgia',
  NEUROPATHIC_PAIN                                       : 'Neuropathic Pain',
  OTHER                                                  : 'Other',
} as const;

export const CNMI_MUNICIPALITIES                         = {
  SAIPAN                                                 : 'Saipan',
  TINIAN                                                 : 'Tinian',
  ROTA                                                   : 'Rota',
  AGRIHAN                                                : 'Agrihan',
  PAGAN                                                  : 'Pagan',
} as const;

export const COFA_NATIONS                                = {
  FM                                                     : 'Federated States of Micronesia',
  MH                                                     : 'Marshall Islands',
  PW                                                     : 'Palau',
} as const;

export const MAP_COLLECTIONS_TO_ID_FIELDS                = {
  users                                                  : ID_FIELD.USER,
  userProfiles                                           : ID_FIELD.USER,
  userStates                                             : ID_FIELD.USER,
  organizations                                          : ID_FIELD.ORGANIZATION,
  organizationProfiles                                   : ID_FIELD.ORGANIZATION,
  programs                                               : ID_FIELD.PROGRAM,
  programProfiles                                        : ID_FIELD.PROGRAM,
  cohorts                                                : ID_FIELD.COHORT,
  cohortProfiles                                         : ID_FIELD.COHORT,
  sessions                                               : ID_FIELD.SESSION,
  participants                                           : ID_FIELD.PARTICIPANT,
  participantProfiles                                    : ID_FIELD.PARTICIPANT,
} as const;

export const COLLECTIONS                                 = {
  USERS                                                  : 'users',
  USER_PROFILES                                          : 'userProfiles',
  USER_STATES                                            : 'userStates',
  ORGANIZATIONS                                          : 'organizations',
  ORGANIZATION_PROFILES                                  : 'organizationProfiles',
  PROGRAMS                                               : 'programs',
  PROGRAM_PROFILES                                       : 'programProfiles',
  COHORTS                                                : 'cohorts',
  // COHORT_STATES                                       : 'cohortStates',
  COHORT_PROFILES                                        : 'cohortProfiles',
  SESSIONS                                               : 'sessions',
  // SESSION_PROFILES                                    : 'sessionProfiles',
  PARTICIPANTS                                           : 'participants',
  PARTICIPANT_PROFILES                                   : 'participantProfiles',
} as const;

export const COPD_TYPES                                  = {
  MILD                                                   : 'Mild',
  MODERATE                                               : 'Moderate',
  SEVERE                                                 : 'Severe',
  VERY_SEVERE                                            : 'Very Severe',
  OTHER                                                  : 'Other',
} as const;

export const COUNTRY_TERRITORY_NATION_OPTIONS            = {
  UNITED_STATES                                          : ['United States'],
  US_TERRITORIES                                         : [
    'American Samoa',
    'Guam',
    'Northern Mariana Islands',
    'Puerto Rico',
    'U.S. Virgin Islands',
  ],
  COFA_NATIONS                                           : ['Federated States of Micronesia', 'Marshall Islands', 'Palau'],
} as const;

export const DIABETES_TYPES                              = {
  TYPE_1                                                 : 'Type 1',
  TYPE_2                                                 : 'Type 2',
  GESTATIONAL                                            : 'Gestational',
  PREDIABETES                                            : 'Prediabetes',
  OTHER                                                  : 'Other',
} as const;

export const DELIVERY_MODES                              = {
  COMBINATION                                            : 'Combination',
  IN_PERSON                                              : 'In Person',
  VIDEO_CALL                                             : 'Video Call',
  VIDEO_RECORDING                                        : 'Video Recording',
} as const;

export const GENDERS                                     = {
  MALE                                                   : 'Male',
  FEMALE                                                 : 'Female',
  TRANSGENDER                                            : 'Transgender',
  PREFER_NOT_TO_SAY                                      : 'Prefer not to say',
} as const;

export const EDUCATION_LEVELS                            = {
  NO_FORMAL_EDUCATION                                    : 'No formal education',
  PRIMARY_EDUCATION                                      : 'Primary education',
  SECONDARY_EDUCATION                                    : 'High School Diploma or GED (Secondary education)',
  TRADE_CERTIFICATE                                      : 'Trade certificate',
  BACHELORS_DEGREE                                       : "Bachelor's degree",
  MASTERS_DEGREE                                         : "Master's degree",
  DOCTORATE_DEGREE                                       : 'Doctorate degree',
  OTHER                                                  : 'Other',
} as const;

export const ENROLLMENT_MOTIVATION                       = {
  HEALTH_CARE_PROFESSIONAL                               : 'Health Care Professional',
  BLOOD_TEST_RESULTS                                     : 'Blood test results',
  PREDIABETES_RISK_TEST                                  : 'Prediabetes Risk Test',
  COMMUNITY_BASED_ORGANIZATION                           : 'Someone at a community-based organization',
  FAMILY_OR_FRIENDS                                      : 'Family or Friends',
  CURRENT_OR_PAST_PARTICIPANT                            : 
    'Current or past participants in the National DPP LCP',
  EMPLOYER_OR_EMPLOYER_WELLNESS_PLAN                     : "Employer or employer's wellness plan",
  HEALTH_INSURANCE_PLAN                                  : 'Health insurance plan',
  MEDIA_ADVERTISEMENTS                                   : 'Media advertisements',
} as const;

export const ETHNICITIES                                 = {
  ABORIGINAL_AUSTRALIAN                                  : 'Aboriginal Australian',
  AFRICAN                                                : 'African',
  BANABAN                                                : 'Banaban',
  BIKINIANS                                              : 'Bikinians',
  CAROLINIAN                                             : 'Carolinian',
  CHAMORRO                                               : 'Chamorro',
  CHINESE                                                : 'Chinese',
  CHUUKESE                                               : 'Chuukese',
  COOK_ISLAND_MAORI                                      : 'Cook Island Maori',
  FIJIAN                                                 : 'Fijian',
  FILIPINO                                               : 'Filipino',
  GILBERTESE                                             : 'Gilbertese',
  GUAMANIAN                                              : 'Guamanian',
  HAWAIIAN                                               : 'Hawaiian',
  HISPANIC_OR_LATINO                                     : 'Hispanic or Latino',
  I_KIRIBATI                                             : 'I-Kiribati',
  INDIGENOUS_FIJIAN                                      : 'Indigenous Fijian',
  INDIGENOUS_PAPUA_NEW_GUINEAN                           : 'Indigenous Papua New Guinean',
  JAPANESE                                               : 'Japanese',
  KANAK                                                  : 'Kanak',
  KOREAN                                                 : 'Korean',
  KOSRAEAN                                               : 'Kosraean',
  MAORI                                                  : 'Maori',
  MARSHALLESE                                            : 'Marshallese',
  MELANESIAN                                             : 'Melanesian',
  MICRONESIAN                                            : 'Micronesian',
  MIDDLE_EASTERN                                         : 'Middle Eastern',
  NAURUAN                                                : 'Nauruan',
  NIUEAN                                                 : 'Niuean',
  OKINAWAN                                               : 'Okinawan',
  PALAUAN                                                : 'Palauan',
  PAPUA_NEW_GUINEAN                                      : 'Papua New Guinean',
  PITCAIRN_ISLANDER                                      : 'Pitcairn Islander',
  POHNPEIAN                                              : 'Pohnpeian',
  POLYNESIAN                                             : 'Polynesian',
  ROTUMAN                                                : 'Rotuman',
  SAMOAN                                                 : 'Samoan',
  SOLOMON_ISLANDER                                       : 'Solomon Islander',
  TAHITIAN                                               : 'Tahitian',
  THAI                                                   : 'THAI',
  TOKELAUAN                                              : 'Tokelauan',
  TONGAN                                                 : 'Tongan',
  TORRES_STRAIT_ISLANDER                                 : 'Torres Strait Islander',
  TUVALUAN                                               : 'Tuvaluan',
  VANUATUAN                                              : 'Vanuatuan',
  VIETNAMESE                                             : 'Vietnamese',
  WALLIS_AND_FUTUNA                                      : 'Wallis and Futuna Islander',
  YAPESE                                                 : 'Yapese',
} as const;

export const FSM_STATES                                  = {
  Y                                                      : 'Yap',
  C                                                      : 'Chuuk',
  P                                                      : 'Pohnpei',
  K                                                      : 'Kosrae',
} as const;

export const HEART_DISEASE_TYPES                         = {
  CORONARY_ARTERY_DISEASE                                : 'Coronary Artery Disease',
  HEART_FAILURE                                          : 'Heart Failure',
  ARRHYTHMIAS                                            : 'Arrhythmias',
  VALVULAR_HEART_DISEASES                                : 'Valvular Heart Diseases',
  CONGENITAL_HEART_DISEASES                              : 'Congenital Heart Diseases',
  OTHER                                                  : 'Other',
} as const;

export const HOSPITALIZATION_REASONS                     = {
  CARDIAC                                                : 'Cardiac',
  RESPIRATORY                                            : 'Respiratory',
  NEUROLOGICAL                                           : 'Neurological',
  GASTROINTESTINAL                                       : 'Gastrointestinal',
  INFECTION                                              : 'Infection',
  INJURY                                                 : 'Injury',
  OTHER                                                  : 'Other',
} as const;

export const HYPERTENSION_TYPES                          = {
  NORMAL                                                 : 'Normal',
  ELEVATED                                               : 'Elevated',
  HYPERTENSION_STAGE_1                                   : 'Hypertension Stage 1',
  HYPERTENSION_STAGE_2                                   : 'Hypertension Stage 2',
  HYPERTENSIVE_CRISIS                                    : 'Hypertensive Crisis',
  OTHER                                                  : 'Other',
} as const;

export const IMMUNIZATION_TYPES                          = {
  INFLUENZA                                              : 'Influenza',
  PNEUMOCOCCAL                                           : 'Pneumococcal',
  HEPATITIS_A                                            : 'Hepatitis A',
  HEPATITIS_B                                            : 'Hepatitis B',
  MEASLES_MUMPS_RUBELLA                                  : 'Measles, Mumps, Rubella',
  VARICELLA                                              : 'Varicella',
  HUMAN_PAPILLOMAVIRUS                                   : 'Human Papillomavirus',
  TETANUS_DIPHTHERIA_PERTUSSIS                           : 'Tetanus, Diphtheria, Pertussis',
  ZOSTER                                                 : 'Zoster',
  MENINGOCOCCAL                                          : 'Meningococcal',
  COVID_19                                               : 'COVID-19',
  OTHER                                                  : 'Other',
} as const;

export const KIDNEY_DISEASE_TYPES                        = {
  CHRONIC_KIDNEY_DISEASE                                 : 'Chronic Kidney Disease',
  KIDNEY_STONES                                          : 'Kidney Stones',
  POLYCYSTIC_KIDNEY_DISEASE                              : 'Polycystic Kidney Disease',
  GLOMERULONEPHRITIS                                     : 'Glomerulonephritis',
  OTHER                                                  : 'Other',
} as const;

export const LIFESTYLE                                   = {
  SMOKER                                                 : 'Smoker',
  NON_SMOKER                                             : 'Non-smoker',
  EX_SMOKER                                              : 'Ex-smoker',
  ALCOHOL_CONSUMPTION                                    : 'Alcohol Consumption',
  VEGETARIAN                                             : 'Vegetarian',
  VEGAN                                                  : 'Vegan',
  PHYSICAL_ACTIVITY_LEVEL                                : 'Physical Activity Level',
  OTHER                                                  : 'Other',
} as const;

export const LIVER_DISEASE_TYPES                         = {
  HEPATITIS                                              : 'Hepatitis',
  CIRRHOSIS                                              : 'Cirrhosis',
  LIVER_CANCER                                           : 'Liver Cancer',
  ALCOHOLIC_LIVER_DISEASE                                : 'Alcoholic Liver Disease',
  OTHER                                                  : 'Other',
} as const;

export const MEDICATION_TYPES                            = {
  ANTIBIOTICS                                            : 'Antibiotics',
  ANTIDEPRESSANTS                                        : 'Antidepressants',
  ANTIHYPERTENSIVES                                      : 'Antihypertensives',
  STATINS                                                : 'Statins',
  INSULIN                                                : 'Insulin',
  ANALGESICS                                             : 'Analgesics',
  OTHER                                                  : 'Other',
} as const;

export const MENTAL_HEALTH_CONDITION_TYPES               = {
  DEPRESSION                                             : 'Depression',
  ANXIETY                                                : 'Anxiety',
  BIPOLAR_DISORDER                                       : 'Bipolar Disorder',
  SCHIZOPHRENIA                                          : 'Schizophrenia',
  OTHER                                                  : 'Other',
} as const;

export const NAVIGATION                                  = {
  ADMIN                                                  : {
    DISPLAY                                              : 'Admin',
    PATH                                                 : 'admin',
  },
  ROOT                                                   : {
    DISPLAY                                              : 'Root',
    PATH                                                 : 'root',
  },
  AUTH                                                   : {
    DISPLAY                                              : 'Authentication',
    PATH                                                 : 'auth',
  },
  CLIENTS                                                : {
    DISPLAY                                              : 'Clients',
    PATH                                                 : 'clients',
  },
  DASHBOARD                                              : {
    DISPLAY                                              : 'Dashboard',
    PATH                                                 : 'dashboard',
  },
  EDIT_CLIENT                                            : {
    DISPLAY                                              : 'Edit Client',
    PATH                                                 : 'edit-client',
  },
  EDIT_GROUP                                             : {
    DISPLAY                                              : 'Edit Group',
    PATH                                                 : 'edit-group',
  },
  GROUPS                                                 : {
    DISPLAY                                              : 'Groups',
    PATH                                                 : 'groups',
  },
  HOME                                                   : {
    DISPLAY                                              : 'Home',
    PATH                                                 : 'home',
  },
  MUST_VERIFY_EMAIL                                      : {
    DISPLAY                                              : 'Must Verify Email',
    PATH                                                 : 'must-verify-email',
  },
  NEW_CLIENT                                             : {
    DISPLAY                                              : 'New Client',
    PATH                                                 : 'new-client',
  },
  NEW_GROUP                                              : {
    DISPLAY                                              : 'New Group',
    PATH                                                 : 'new-group',
  },
  ORGANIZATIONS                                          : {
    DISPLAY                                              : 'Organizations',
    PATH                                                 : 'organizations',
  },
  USERS                                                  : {
    DISPLAY                                              : 'Users',
    PATH                                                 : 'users',
  },
  USER_APPROVAL                                          : {
    DISPLAY                                              : 'User Approval',
    PATH                                                 : 'user-approval',
  },
  RESET_PASSWORD                                         : {
    DISPLAY                                              : 'Reset Password',
    PATH                                                 : 'reset-password',
    MODE                                                 : 'resetPassword',
  },
  RECOVER_ACCOUNT                                        : {
    DISPLAY                                              : 'Recover Account',
    PATH                                                 : 'recover-account',
  },
  RECOVER_EMAIL                                          : {
    DISPLAY                                              : 'Recover Email',
    PATH                                                 : 'recover-email',
    MODE                                                 : 'recoverEmail',
  },
  SIGN_IN                                                : {
    DISPLAY                                              : 'Sign In',
    PATH                                                 : 'sign-in',
  },
  SIGN_UP                                                : {
    DISPLAY                                              : 'Sign Up',
    PATH                                                 : 'sign-up',
  },
  USER_EDITOR                                            : {
    DISPLAY                                              : 'User Editor',
    PATH                                                 : 'user-editor',
  },
  USER_ONBOARDING                                        : {
    DISPLAY                                              : 'User Onboarding',
    PATH                                                 : 'user-onboarding',
  },
  USER_PROFILE                                           : {
    DISPLAY                                              : 'Profile',
    PATH                                                 : 'user-profile',
  },
  VERIFY_EMAIL                                           : {
    DISPLAY                                              : 'Verify Email',
    PATH                                                 : 'verify-email',
    MODE                                                 : 'verifyEmail',
  },
} as const;

export const MARITAL_STATUSES                            = {
  SINGLE                                                 : 'Single',
  MARRIED                                                : 'Married',
  SEPARATED                                              : 'Separated',
  DIVORCED                                               : 'Divorced',
  WIDOWED                                                : 'Widowed',
} as const;

export const NATIONS                                     = {
  AMERICAN_SAMOA                                         : 'American Samoa',
  AUSTRALIA                                              : 'Australia',
  COOK_ISLANDS                                           : 'Cook Islands',
  FIJI                                                   : 'Fiji',
  FRENCH_POLYNESIA                                       : 'French Polynesia',
  GUAM                                                   : 'Guam',
  KIRIBATI                                               : 'Kiribati',
  MARSHALL_ISLANDS                                       : 'Marshall Islands',
  MICRONESIA                                             : 'Federated States of Micronesia',
  NAURU                                                  : 'Nauru',
  NEW_CALEDONIA                                          : 'New Caledonia',
  NEW_ZEALAND                                            : 'New Zealand',
  NIUE                                                   : 'Niue',
  NORTHERN_MARIANA_ISLANDS                               : 'Northern Mariana Islands',
  PALAU                                                  : 'Palau',
  PAPUA_NEW_GUINEA                                       : 'Papua New Guinea',
  SAMOA                                                  : 'Samoa',
  SOLOMON_ISLANDS                                        : 'Solomon Islands',
  TONGA                                                  : 'Tonga',
  TUVALU                                                 : 'Tuvalu',
  UNITED_STATES                                          : 'United States',
  VANUATU                                                : 'Vanuatu',
  WAKE_ISLAND                                            : 'Wake Island',
  WALLIS_AND_FUTUNA                                      : 'Wallis and Futuna',
} as const;

export const ORGANIZATIONS                               = [
  {
    NAME                                                 : 'Arkansas Coalition of Marshallese',
    ABBREVIATION                                         : 'ACOM',
    MASK                                                 : 'A01',
  },
  {
    NAME                                                 : 'Association of Asian Pacific Community Health Organizations',
    ABBREVIATION                                         : 'AAPCHO',
    MASK                                                 : 'A06',
  },
  {
    NAME                                                 : 'Belau Medical Clinic',
    ABBREVIATION                                         : 'BMC',
    MASK                                                 : 'B09',
  },
  {
    NAME                                                 : 'Chuuk Community Health Center',
    ABBREVIATION                                         : 'CCHC',
    MASK                                                 : 'C12',
  },
  {
    NAME                                                 : "Chuuk Women's Council",
    ABBREVIATION                                         : 'CWC',
    MASK                                                 : 'A02',
  },
  {
    NAME                                                 : 'Kosrae Community Health Center',
    ABBREVIATION                                         : 'KCHC',
    MASK                                                 : 'A03',
  },
  {
    NAME                                                 : 'Kwajalein Diak Coalition',
    ABBREVIATION                                         : 'KDC',
    MASK                                                 : 'A04',
  },
  {
    NAME                                                 : 'Majuro Wellness Center (Canvasback)',
    ABBREVIATION                                         : 'MWC',
    MASK                                                 : 'B10',
  },
  {
    NAME                                                 : 'Malama I Ke Ola Health Center',
    ABBREVIATION                                         : 'MIKOHC',
    MASK                                                 : 'A05',
  },
  {
    NAME                                                 : 'Marianas Health',
    ABBREVIATION                                         : 'MH',
    MASK                                                 : 'C11',
  },
  {
    NAME                                                 : 'National Tongan American Society',
    ABBREVIATION                                         : 'NTAS',
    MASK                                                 : 'B07',
  },
  {
    NAME                                                 : 'Palau Ministry of Health and Human Services',
    ABBREVIATION                                         : 'PMHHS',
    MASK                                                 : 'B08',
  },
] as const;

export const OSTEOPOROSIS_TYPES                          = {
  PRIMARY_OSTEOPOROSIS                                   : 'Primary Osteoporosis',
  SECONDARY_OSTEOPOROSIS                                 : 'Secondary Osteoporosis',
  OTHER                                                  : 'Other',
} as const;

export const PALAU_STATES                                = {
  AIMELIIK                                               : 'Aimeliik',
  AIRAI                                                  : 'Airai',
  ANGAUR                                                 : 'Angaur',
  HATOBOHEI                                              : 'Hatohobei',
  KAYANGEL                                               : 'Kayangel',
  KOROR                                                  : 'Koror',
  MELEKEOK                                               : 'Melekeok',
  NGARAARD                                               : 'Ngaraard',
  NGARCHELONG                                            : 'Ngarchelong',
  NGARDMAU                                               : 'Ngardmau',
  NGATPANG                                               : 'Ngatpang',
  NGCHESAR                                               : 'Ngchesar',
  NGOBEKET                                               : 'Ngobekeet',
  PELELIU                                                : 'Peleliu',
  SONSOROL                                               : 'Sonsorol',
} as const;

export const PAYER_SOURCE                                = {
  MEDICARE                                               : 'Medicare',
  MEDICAID                                               : 'Medicaid',
  PRIVATE_INSURER                                        : 'Private insurer',
  SELF_PAY                                               : 'Self pay',
  DUAL_ELIGIBLE                                          : 'Dual eligible',
  GRANT_FUNDING                                          : 'Grant funding',
  EMPLOYER                                               : 'Employer',
  FREE_OF_CHARGE                                         : 'Free of charge',
  OTHER                                                  : 'Other',
} as const;

export const PREDIABETES_RISK_TEST_RANGES                = {
  // Greater than or equal to the low
  // Less than the high
  AGE                                                    : [
                                                    { low: -Infinity, high: 40 },
                                                    { low: 40,        high: 49 },
                                                    { low: 50,        high: 59 },
                                                    { low: 60,        high: Infinity },
],
  BMI                                                    : [
                                                    { low: -Infinity, high: 25 },
                                                    { low: 25,        high: 29.8 },
                                                    { low: 29.8,      high: 39.8 },
                                                    { low: 39.8,      high: Infinity },
  ],
} as const;

export const RACES                                       = {
  ABORIGINAL_AUSTRALIAN                                  : 'Aboriginal Australian',
  AFRICAN_AMERICAN                                       : 'African American',
  ALASKA_NATIVE                                          : 'Alaska Native',
  AMERICAN_INDIAN                                        : 'American Indian',
  ASIAN                                                  : 'Asian',
  CAUCASIAN                                              : 'Caucasian',
  HISPANIC_OR_LATINO                                     : 'Hispanic or Latino',
  INDIGENOUS_CENTRAL_AMERICAN                            : 'Indigenous Central American',
  INDIGENOUS_SOUTH_AMERICAN                              : 'Indigenous South American',
  MAORI                                                  : 'Maori',
  MELANESIAN                                             : 'Melanesian',
  MICRONESIAN                                            : 'Micronesian',
  NATIVE_HAWAIIAN                                        : 'Native Hawaiian',
  POLYNESIAN                                             : 'Polynesian',
  OTHER_PACIFIC_ISLANDER                                 : 'Other Pacific Islander',
} as const;

export const RECOGNITION_STATUSES                        = {
  PENDING                                                : 'Pending',
  PRELIMINARY                                            : 'Preliminary',
  FULL                                                   : 'Full',
  FULL_PLUS                                              : 'Full Plus',
} as const;

export const RMI_MUNICIPALITIES                          = {
  AILINGLAPLAP                                           : 'Ailinglaplap Atoll',
  AILUK                                                  : 'Ailuk Atoll',
  ARNO                                                   : 'Arno Atoll',
  AUR                                                    : 'Aur Atoll',
  BIKAR                                                  : 'Bikar Atoll',
  BIKINI                                                 : 'Bikini Atoll',
  BOKAK                                                  : 'Bokak Atoll',
  EBON                                                   : 'Ebon Atoll',
  ENEWETAK                                               : 'Enewetak Atoll',
  ERIKUB                                                 : 'Erikub Atoll',
  JABAT                                                  : 'Jabat Island',
  JALUIT                                                 : 'Jaluit Atoll',
  JEMO                                                   : 'Jemo Island',
  KILI                                                   : 'Kili Island',
  KWAJALEIN                                              : 'Kwajalein Atoll',
  LAE                                                    : 'Lae Atoll',
  LIB                                                    : 'Lib Island',
  LIKIEP                                                 : 'Likiep Atoll',
  MAJURO                                                 : 'Majuro Atoll',
  MALOELAP                                               : 'Maloelap Atoll',
  MEJIT                                                  : 'Mejit Island',
  MILI                                                   : 'Mili Atoll',
  NAMDRIK                                                : 'Namdrik Atoll',
  NAMU                                                   : 'Namu Atoll',
  RONGELAP                                               : 'Rongelap Atoll',
  RONGRIK                                                : 'Rongrik Atoll',
  TOKE                                                   : 'Toke Atoll',
  UJAE                                                   : 'Ujae Atoll',
  UJELANG                                                : 'Ujelang Atoll',
  UTIRIK                                                 : 'Utirik Atoll',
  WOTHO                                                  : 'Wotho Atoll',
  WOTJE                                                  : 'Wotje Atoll',
} as const;

export const ROOT_COLLECTIONS                            = {
  ATTENDANCE_RECORDS                                     : 'attendanceRecords',
  AUDIT_LOGS                                             : 'auditLogs',
  GROUPS                                                 : 'groups',
  CLIENTS                                                : 'clients',
  DASHBOARD                                              : 'dashboard',
  HEALTH_CHECKUPS                                        : 'healthCheckups',
  ORGANIZATIONS                                          : 'organizations',
  STAFF                                                  : 'staff',
  USERS                                                  : 'users',
} as const;

export const SEXES                                       = {
  MALE                                                   : 'Male',
  FEMALE                                                 : 'Female',
  INTERSEX                                               : 'Intersex',
  PREFER_NOT_TO_SAY                                      : 'Prefer not to say',
} as const;

export const STROKE_TYPES                                = {
  ISCHEMIC                                               : 'Ischemic',
  HEMORRHAGIC                                            : 'Hemorrhagic',
  TRANSIENT_ISCHEMIC_ATTACK                              : 'Transient Ischemic Attack',
  OTHER                                                  : 'Other',
} as const;

export const SURGERY_TYPES                               = {
  CARDIAC                                                : 'Cardiac',
  ORTHOPEDIC                                             : 'Orthopedic',
  NEUROSURGERY                                           : 'Neurosurgery',
  GASTROINTESTINAL                                       : 'Gastrointestinal',
  UROLOGIC                                               : 'Urologic',
  PLASTIC                                                : 'Plastic',
  OTHER                                                  : 'Other',
} as const;

export const US_STATES_AND_TERRITORIES                   = {
  AL                                                     : 'Alabama',
  AK                                                     : 'Alaska',
  AZ                                                     : 'Arizona',
  AR                                                     : 'Arkansas',
  CA                                                     : 'California',
  CO                                                     : 'Colorado',
  CT                                                     : 'Connecticut',
  DE                                                     : 'Delaware',
  FL                                                     : 'Florida',
  GA                                                     : 'Georgia',
  HI                                                     : 'Hawaii',
  ID                                                     : 'Idaho',
  IL                                                     : 'Illinois',
  IN                                                     : 'Indiana',
  IA                                                     : 'Iowa',
  KS                                                     : 'Kansas',
  KY                                                     : 'Kentucky',
  LA                                                     : 'Louisiana',
  ME                                                     : 'Maine',
  MD                                                     : 'Maryland',
  MA                                                     : 'Massachusetts',
  MI                                                     : 'Michigan',
  MN                                                     : 'Minnesota',
  MS                                                     : 'Mississippi',
  MO                                                     : 'Missouri',
  MT                                                     : 'Montana',
  NE                                                     : 'Nebraska',
  NV                                                     : 'Nevada',
  NH                                                     : 'New Hampshire',
  NJ                                                     : 'New Jersey',
  NM                                                     : 'New Mexico',
  NY                                                     : 'New York',
  NC                                                     : 'North Carolina',
  ND                                                     : 'North Dakota',
  OH                                                     : 'Ohio',
  OK                                                     : 'Oklahoma',
  OR                                                     : 'Oregon',
  PA                                                     : 'Pennsylvania',
  RI                                                     : 'Rhode Island',
  SC                                                     : 'South Carolina',
  SD                                                     : 'South Dakota',
  TN                                                     : 'Tennessee',
  TX                                                     : 'Texas',
  UT                                                     : 'Utah',
  VT                                                     : 'Vermont',
  VA                                                     : 'Virginia',
  WA                                                     : 'Washington',
  WV                                                     : 'West Virginia',
  WI                                                     : 'Wisconsin',
  WY                                                     : 'Wyoming',
  AS                                                     : 'American Samoa',
  GU                                                     : 'Guam',
  MP                                                     : 'Northern Mariana Islands',
  PR                                                     : 'Puerto Rico',
  VI                                                     : 'Virgin Islands',
  FM                                                     : 'Federated States of Micronesia',
  MH                                                     : 'Marshall Islands',
  PW                                                     : 'Palau',
} as const;
