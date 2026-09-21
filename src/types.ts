export type NavSection = 'home' | 'proprietor' | 'council' | 'courses' | 'portal' | 'gallery' | 'admissions' | 'about' | 'registrar' | 'hod_compsci' | 'contact' | 'admin';

export interface LevelAdviser {
  level: 'ND I' | 'ND II' | 'HND I' | 'HND II';
  name: string;
  titles: string;
  phone: string;
  email: string;
  office: string;
}

export interface DepartmentNotice {
  id: string;
  title: string;
  date: string;
  category: 'Course Registration' | 'Exam Clearance' | 'Lab Timetable' | 'SIWES' | 'General';
  urgent: boolean;
  content: string;
}

export interface HodComputerScienceInfo {
  name: string;
  titles: string;
  position: string;
  photoUrl: string;
  email: string;
  phone: string;
  officeLocation: string;
  officeHours: string;
  welcomeStatement: string;
  departmentMission: string;
  academicSession: string;
  activeSemester: '1st Semester' | '2nd Semester';
  courseFormDeadline: string;
  courseRegistrationInstructions: string;
  levelAdvisers: LevelAdviser[];
  notices: DepartmentNotice[];
  requiredSubmissionDocuments: string[];
}

export interface CourseFormSubmission {
  id: string;
  matricNo: string;
  fullName: string;
  level: 'ND I' | 'ND II' | 'HND I' | 'HND II';
  session: string;
  semester: '1st Semester' | '2nd Semester';
  phone: string;
  email: string;
  registeredCourses: string[];
  totalCredits: number;
  fileDataUrl: string; // Base64 data URL or preview image of uploaded signed course form
  fileName: string;
  fileSize: string;
  submittedAt: string;
  status: 'Pending Review' | 'Approved' | 'Requires Correction' | 'Rejected';
  hodRemarks?: string;
  reviewedAt?: string;
}

export interface Announcement {
  id: string;
  date: string;
  title: string;
  badge: string;
  urgent: boolean;
  content?: string;
}

export interface CampusStatItem {
  label: string;
  value: string;
  suffix: string;
}

export interface RegistrarUnitItem {
  name: string;
  head: string;
  description: string;
}

export interface RegistrarInfo {
  name: string;
  titles: string;
  position: string;
  photoUrl: string;
  email: string;
  phone: string;
  officeLocation: string;
  officeHours: string;
  welcomeQuote: string;
  welcomeMessage1: string;
  welcomeMessage2: string;
  statutoryDuties: string[];
  registryUnits: RegistrarUnitItem[];
  transcriptGuidelines: string;
  matriculationPledge: string;
}

export interface CampusGeneralInfo {
  institutionName: string;
  motto: string;
  address: string;
  town: string;
  state: string;
  phonePrimary: string;
  phoneSecondary: string;
  admissionsEmail: string;
  registrarEmail: string;
  rectorName: string;
  rectorTitles: string;
  rectorPosition: string;
  rectorPhotoUrl: string;
  rectorQuoteHeadline: string;
  rectorSpeechParagraph1: string;
  rectorSpeechParagraph2: string;
  screeningHours: string;
  travelDirections: string;
  admissionApplicationHeadline?: string;
  admissionApplicationSubheadline?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  schoolId: string;
  schoolName: string;
  level: 'ND' | 'HND' | 'Certificate';
  duration: string;
  description: string;
  careerProspects: string[];
  entryRequirements: string[];
  curriculumHighlights: {
    semester: string;
    modules: string[];
  }[];
  totalCredits: number;
  accreditationStatus: 'Full NBTE Accreditation' | 'Interim Accreditation' | 'Approved';
  tuitionPerSession: number;
  featured?: boolean;
}

export interface School {
  id: string;
  name: string;
  shortName: string;
  dean: string;
  description: string;
  iconName: string;
  courseCount: number;
}

export interface StudentProfile {
  id: string;
  matricNo: string;
  fullName: string;
  department: string;
  school: string;
  level: 'ND I' | 'ND II' | 'HND I' | 'HND II';
  session: string;
  currentSemester: '1st Semester' | '2nd Semester';
  cgpa: number;
  status: 'Good Standing' | 'Probation';
  avatarUrl: string;
  phone: string;
  email: string;
  stateOfOrigin: string;
  lga: string;
  registeredCourses: RegisteredCourse[];
  resultsHistory: SemesterResult[];
  paymentRecords: PaymentReceipt[];
}

export interface RegisteredCourse {
  code: string;
  title: string;
  creditUnits: number;
  lecturer: string;
  lectureHall: string;
  schedule: string;
  status: 'Registered' | 'Pending';
}

export interface SemesterResult {
  session: string;
  semester: string;
  gpa: number;
  cgpa: number;
  totalUnits: number;
  courses: {
    code: string;
    title: string;
    units: number;
    score: number;
    grade: 'A' | 'AB' | 'B' | 'BC' | 'C' | 'CD' | 'D' | 'E' | 'F';
    points: number;
  }[];
}

export interface PaymentReceipt {
  referenceNo: string;
  purpose: string;
  amount: number;
  datePaid: string;
  status: 'Paid' | 'Pending';
  session: string;
  channel: 'Remita' | 'Interswitch' | 'Bank Transfer';
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'Ceremony' | 'Engineering & Tech' | 'Sports' | 'Cultural' | 'Academic' | 'Student Union';
  date: string;
  time: string;
  venue: string;
  description: string;
  attendeesCount: number;
  imageUrl: string;
  featured?: boolean;
  tags: string[];
}

export interface CampusFacility {
  id: string;
  name: string;
  category: 'Engineering Labs' | 'ICT & Computing' | 'Workshops' | 'Library' | 'Recreation';
  description: string;
  keyEquipments: string[];
  imageUrl: string;
}

export interface AdmissionApplication {
  fullName: string;
  email: string;
  phone: string;
  jambRegNo?: string;
  programmeType: 'ND Full-Time' | 'ND Part-Time' | 'HND' | 'Vocational Certificate';
  firstChoiceCourse: string;
  secondChoiceCourse: string;
  stateOfOrigin: string;
  oLevelResults: {
    examBody: 'WAEC' | 'NECO' | 'NABTEB';
    examYear: string;
    subjects: { subject: string; grade: string }[];
  };
}

export interface ProprietorInfo {
  name: string;
  titles: string;
  position: string;
  photoUrl: string;
  quote: string;
  biography: string;
  foundingVision: string;
  philanthropyAndScholarships: string;
  corePillars: string[];
  educationAndCredentials: string[];
  honorsAndRecognitions: string[];
  officeContact: {
    email: string;
    phone: string;
    location: string;
  };
}

export interface CouncilMember {
  id: string;
  name: string;
  titles: string;
  role: string;
  category: 'Executive' | 'Academic' | 'Government & NBTE' | 'Industry & Private Sector' | 'Community & Stakeholders';
  photoUrl: string;
  profileSummary: string;
  fullBiography: string;
  qualifications: string[];
  tenure: string;
  committees: string[];
  email?: string;
}

export interface CouncilGalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: 'Council Sittings' | 'Campus Inspections' | 'Ceremonial & Matriculation' | 'Accreditation & Governance';
  date: string;
  location: string;
}

export type FAQCategory = 'Admissions' | 'School Fees' | 'General Inquiries';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
  highlighted?: boolean;
}


