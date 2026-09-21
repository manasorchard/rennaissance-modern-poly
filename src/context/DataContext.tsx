import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Course, 
  School, 
  CampusEvent, 
  CampusFacility, 
  Announcement, 
  CampusStatItem, 
  CampusGeneralInfo,
  RegistrarInfo,
  HodComputerScienceInfo,
  CourseFormSubmission,
  ProprietorInfo,
  CouncilMember,
  CouncilGalleryItem,
  FAQItem
} from '../types';
import { 
  COURSES as DEFAULT_COURSES, 
  SCHOOLS as DEFAULT_SCHOOLS, 
  CAMPUS_EVENTS as DEFAULT_EVENTS, 
  CAMPUS_FACILITIES as DEFAULT_FACILITIES, 
  ANNOUNCEMENTS as DEFAULT_ANNOUNCEMENTS, 
  CAMPUS_STATS as DEFAULT_STATS 
} from '../data/polytechnicData';
import {
  DEFAULT_PROPRIETOR_INFO,
  DEFAULT_COUNCIL_MEMBERS,
  DEFAULT_COUNCIL_GALLERY
} from '../data/councilAndProprietorData';
import { DEFAULT_FAQS } from '../data/faqData';


export const DEFAULT_CAMPUS_INFO: CampusGeneralInfo = {
  institutionName: 'Renaissance Modern Polytechnic Mbaukwu',
  motto: 'Technology for Self-Reliance',
  address: 'Off Old Awka Road, Mbaukwu Town',
  town: 'Awka South LGA',
  state: 'Anambra State, Nigeria',
  phonePrimary: '+234 814 892 3410',
  phoneSecondary: '+234 803 719 5502',
  admissionsEmail: 'admissions@renaissancemodern.edu.ng',
  registrarEmail: 'registrar@renaissancemodern.edu.ng',
  rectorName: 'Engr. Prof. E. C. Maduka',
  rectorTitles: 'FNSE, FNIEEE, COREN Reg.',
  rectorPosition: 'Rector, Renaissance Modern Polytechnic Mbaukwu',
  rectorPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  rectorQuoteHeadline: '"We Build Job Creators, Industrial Fabricators, and High-Tech Innovators."',
  rectorSpeechParagraph1: "Welcome to Renaissance Modern Polytechnic, strategically nestled in the vibrant community of Mbaukwu, Anambra State. Our institution was established on a radical conviction: that Africa's true economic revolution will be engineered in practical workshops, robotics labs, software incubators, and renewable energy centers.",
  rectorSpeechParagraph2: "Every student at Renaissance doesn't merely read theory; they cut steel on lathe machines, solder circuit boards, program microcontrollers, build web platforms, and design sustainable civil structures. When you graduate from Mbaukwu, you don't merely search for a job — you possess the technical mastery to create enterprise.",
  screeningHours: 'Monday – Friday: 8:00 AM – 4:30 PM (Saturday by appointment)',
  travelDirections: 'From Awka (Aroma Junction / Unizik Junction): Board commercial shuttle or cab heading towards Mbaukwu / Agulu road. Alight at Renaissance Modern Polytechnic Junction, Mbaukwu.',
  admissionApplicationHeadline: '2024/2025 Admission Application',
  admissionApplicationSubheadline: 'National Diploma (ND), HND & Professional Certificates',
};

export const DEFAULT_REGISTRAR_INFO: RegistrarInfo = {
  name: "Rev'd Can James",
  titles: 'B.A. (Ed), M.Ed (Educational Management), FCIA, FIPMA, JP',
  position: 'Registrar & Secretary to the Governing Council',
  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  email: 'registrar@renaissancemodern.edu.ng',
  phone: '+234 803 700 8821',
  officeLocation: 'Administrative Complex, Ground Floor, Senate Wing, Renaissance Modern Polytechnic, Mbaukwu, Anambra State',
  officeHours: 'Monday – Friday: 8:00 AM – 4:00 PM',
  welcomeQuote: '"The Registry is the administrative engine room dedicated to academic governance, sacred custody of records, and compassionate service to our students."',
  welcomeMessage1: "On behalf of the Registry of Renaissance Modern Polytechnic, Mbaukwu, I warmly welcome all scholars, prospective candidates, parents, and partners in technical education. As the Chief Administrative Officer and Secretary to the Governing Council, the Registry is tasked with ensuring that every administrative process—from admission to graduation—operates with impeccable transparency, speed, and integrity.",
  welcomeMessage2: "Our polytechnic is committed to grooming industrial innovators and technology champions. The Registry guarantees that your academic accomplishments are safeguarded, your transcripts are dispatched with international compliance, and your student welfare is prioritized through our dedicated divisions in Admissions, Examinations & Records, and Council Affairs.",
  statutoryDuties: [
    'Chief Administrative Officer of the Polytechnic responsible to the Rector for day-to-day administration.',
    'Secretary to the Polytechnic Governing Council, Academic Board, and statutory standing committees.',
    'Custodian of the Polytechnic Official Seal, legal deeds, charter statutes, and archives of academic records.',
    'Coordination of JAMB Central Admissions Processing System (CAPS), matriculation, and convocation ceremonies.',
    'Custody, generation, and international verification of official student academic transcripts and statements of results.',
    'Management of staff recruitment, statutory appointments, promotions, appraisals, and employee welfare.'
  ],
  registryUnits: [
    {
      name: 'Admissions & Matriculation Unit',
      head: 'Senior Assistant Registrar (Admissions)',
      description: 'Oversees JAMB CAPS portal approvals, National Diploma (ND) and Higher National Diploma (HND) screening, credential evaluation, and issuance of official admission letters.'
    },
    {
      name: 'Examinations & Academic Records Division',
      head: 'Principal Assistant Registrar (Exams & Records)',
      description: 'Maintains semester grade archives, coordinates examination logistics, processes graduation clearance dossiers, and issues official academic transcripts.'
    },
    {
      name: 'Council Affairs & Board Secretariat',
      head: 'Deputy Registrar (Council Affairs)',
      description: 'Coordinates meetings of the Governing Council and Academic Board, drafts statutory committee proceedings, and maintains institutional legal protocols.'
    },
    {
      name: 'Senior & Junior Staff Establishment',
      head: 'Senior Assistant Registrar (Establishment)',
      description: 'Administers staff recruitment, tenure documentation, promotion boards, pension records, and human resource development.'
    }
  ],
  transcriptGuidelines: 'To request an official academic transcript, submit an online application detailing your Matriculation Number, Department, Year of Graduation, and designated destination institution or employer address. Official electronic copies are processed within 48-72 hours.',
  matriculationPledge: 'I solemnly declare and promise that I will be loyal to Renaissance Modern Polytechnic, Mbaukwu, obey its constitution, observe all rules and regulations, and diligently apply myself to the pursuit of technical learning, integrity, and honor.'
};

export const DEFAULT_HOD_COMPSCI_INFO: HodComputerScienceInfo = {
  name: 'Engr. Dr. Chinedu E. Eze',
  titles: 'B.Sc, M.Sc, Ph.D (Computer Science), MNCS, MCPN, FIMC',
  position: 'Head of Department, Computer Science Technology',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  email: 'hod.compsci@renaissancemodern.edu.ng',
  phone: '+234 803 450 9182',
  officeLocation: 'Computing & Innovation Complex, First Floor, Room CS-102, Renaissance Modern Polytechnic, Mbaukwu',
  officeHours: 'Monday – Thursday: 10:00 AM – 2:00 PM',
  welcomeStatement: 'Welcome to the Department of Computer Science at Renaissance Modern Polytechnic, Mbaukwu. Our department is committed to practical software engineering, cybersecurity, cloud systems, and AI technologies. We blend rigorous NBTE curriculum standards with intensive laboratory mastery so our scholars graduate as high-impact technology leaders.',
  departmentMission: 'To foster innovative computing professionals through world-class technical education, hands-on programming laboratories, ethical technology practice, and streamlined departmental academic administration.',
  academicSession: '2024/2025',
  activeSemester: '1st Semester',
  courseFormDeadline: 'Friday, 29th November 2024 (5:00 PM Prompt)',
  courseRegistrationInstructions: '1. Consult your designated Level Adviser for course load clearance before uploading.\n2. Ensure total registered credit units do not exceed the NBTE maximum threshold (24 credit units per semester).\n3. Fill and sign your official Departmental Course Form and obtain your Level Adviser\'s endorsement.\n4. Ensure all carryover courses from previous sessions are prioritized and registered first.\n5. Upload a clear, legible PDF or scanned image file of your signed form here for final HOD clearance and semester examination docket generation.',
  levelAdvisers: [
    {
      level: 'ND I',
      name: 'Mr. Obinna K. Okonkwo',
      titles: 'M.Sc (Software Eng.), MNCS',
      phone: '+234 803 111 2233',
      email: 'o.okonkwo@renaissancemodern.edu.ng',
      office: 'CS Lab 1 Office, Ground Floor'
    },
    {
      level: 'ND II',
      name: 'Mrs. Chioma A. Nnamdi',
      titles: 'M.Tech (Information Systems), MCPN',
      phone: '+234 803 222 3344',
      email: 'c.nnamdi@renaissancemodern.edu.ng',
      office: 'Faculty Office B-04'
    },
    {
      level: 'HND I',
      name: 'Dr. Jude C. Nwosu',
      titles: 'Ph.D (Cybersecurity), MNCS',
      phone: '+234 803 333 4455',
      email: 'j.nwosu@renaissancemodern.edu.ng',
      office: 'Cyber Defense Lab, 1st Floor'
    },
    {
      level: 'HND II',
      name: 'Engr. Kenneth U. Okafor',
      titles: 'M.Sc (Data Networks), COREN Reg.',
      phone: '+234 803 444 5566',
      email: 'k.okafor@renaissancemodern.edu.ng',
      office: 'Computing Directorate Room 12'
    }
  ],
  notices: [
    {
      id: 'notice-cs-1',
      title: 'Mandatory Submission of 1st Semester 2024/2025 Course Registration Forms',
      date: '14 Oct 2024',
      category: 'Course Registration',
      urgent: true,
      content: 'All Computer Science students in ND I, ND II, HND I, and HND II are instructed to upload their endorsed departmental course registration forms on or before November 29, 2024. Failure to submit will result in exclusion from practical lab examinations.'
    },
    {
      id: 'notice-cs-2',
      title: 'Lab Access & Cloud Development Environment Credentials',
      date: '08 Oct 2024',
      category: 'Lab Timetable',
      urgent: false,
      content: 'Students who have submitted their course forms can pick up their Linux terminal accounts and GitHub student credentials from the Departmental Technologist in Lab 2.'
    },
    {
      id: 'notice-cs-3',
      title: 'SIWES Defense & Technical Logbook Submission for Returning ND II',
      date: '02 Oct 2024',
      category: 'SIWES',
      urgent: false,
      content: 'Returning ND II students must bring their certified ITF logbooks to Mrs. Chioma Nnamdi before course form sign-off.'
    }
  ],
  requiredSubmissionDocuments: [
    'Signed Course Registration Form (Stamped by Level Adviser)',
    'Original Semester School Fees Receipt (RMP Bursary)',
    'Departmental Association Due Receipt (NACOSS)',
    'Last Semester Statement of Results / Transcript (for returning ND II & HND II)'
  ]
};

export const DEFAULT_COURSE_FORM_SUBMISSIONS: CourseFormSubmission[] = [
  {
    id: 'sub-cs-001',
    matricNo: 'RMP/ND/CS/2024/0142',
    fullName: 'Emmanuel Chukwuka Okafor',
    level: 'ND I',
    session: '2024/2025',
    semester: '1st Semester',
    phone: '+234 814 552 1190',
    email: 'emmanuel.okafor@student.renaissancemodern.edu.ng',
    registeredCourses: [
      'COM 111 - Introduction to Computing (3 Units)',
      'COM 112 - Logic & Structured Programming (C/C++) (3 Units)',
      'COM 113 - Computer Hardware Fundamentals (2 Units)',
      'MTH 111 - Logic & Linear Algebra (2 Units)',
      'GNS 101 - Use of English I (2 Units)',
      'GNS 111 - Citizenship Education I (2 Units)',
      'STA 111 - Descriptive Statistics (2 Units)'
    ],
    totalCredits: 16,
    fileDataUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80',
    fileName: 'Emmanuel_Okafor_ND1_CourseForm_Signed.pdf',
    fileSize: '420 KB',
    submittedAt: '2024-10-15 14:32',
    status: 'Approved',
    hodRemarks: 'Course form verified against JAMB admission list and Level Adviser signature. Form approved for 1st Semester exams.',
    reviewedAt: '2024-10-16 09:15'
  },
  {
    id: 'sub-cs-002',
    matricNo: 'RMP/ND/CS/2023/0088',
    fullName: 'Blessing Ngozi Eze',
    level: 'ND II',
    session: '2024/2025',
    semester: '1st Semester',
    phone: '+234 803 774 6120',
    email: 'blessing.eze@student.renaissancemodern.edu.ng',
    registeredCourses: [
      'COM 211 - Object-Oriented Programming (Java) (3 Units)',
      'COM 212 - Database Design & Management (SQL) (3 Units)',
      'COM 213 - Computer Systems Troubleshooting (2 Units)',
      'COM 214 - Operating Systems & UNIX (3 Units)',
      'COM 215 - Computer Packages II (2 Units)',
      'EED 216 - Entrepreneurship Development II (2 Units)'
    ],
    totalCredits: 15,
    fileDataUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    fileName: 'Blessing_Eze_ND2_FirstSem_CourseReg.jpg',
    fileSize: '780 KB',
    submittedAt: '2024-10-18 11:05',
    status: 'Pending Review'
  },
  {
    id: 'sub-cs-003',
    matricNo: 'RMP/HND/CS/2024/0021',
    fullName: 'Somtochukwu David Ani',
    level: 'HND I',
    session: '2024/2025',
    semester: '1st Semester',
    phone: '+234 812 334 9901',
    email: 'somto.ani@student.renaissancemodern.edu.ng',
    registeredCourses: [
      'COM 311 - Advanced Operating Systems (3 Units)',
      'COM 312 - Database Management Systems II (3 Units)',
      'COM 313 - Computer Graphics & Animation (3 Units)',
      'COM 314 - Operations Research (3 Units)',
      'COM 315 - Statistical Methods in Computing (2 Units)'
    ],
    totalCredits: 14,
    fileDataUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&auto=format&fit=crop&q=80',
    fileName: 'Somto_Ani_HND1_CourseForm_Draft.pdf',
    fileSize: '512 KB',
    submittedAt: '2024-10-17 16:40',
    status: 'Requires Correction',
    hodRemarks: 'Level Adviser stamp missing on page 2. Please have Dr. Jude Nwosu endorse your course load and re-upload.',
    reviewedAt: '2024-10-18 08:30'
  }
];

const STORAGE_KEYS = {
  COURSES: 'rmp_content_courses_v2',
  ANNOUNCEMENTS: 'rmp_content_announcements_v2',
  EVENTS: 'rmp_content_events_v2',
  FACILITIES: 'rmp_content_facilities_v2',
  STATS: 'rmp_content_stats_v2',
  INFO: 'rmp_content_info_v2',
  REGISTRAR: 'rmp_content_registrar_v2',
  HOD_COMPSCI: 'rmp_content_hod_compsci_v2',
  COURSE_FORMS: 'rmp_content_course_forms_v2',
  PROPRIETOR: 'rmp_content_proprietor_v2',
  COUNCIL_MEMBERS: 'rmp_content_council_members_v2',
  COUNCIL_GALLERY: 'rmp_content_council_gallery_v2',
  FAQS: 'rmp_content_faqs_v2',
};

interface DataContextType {
  courses: Course[];
  schools: School[];
  announcements: Announcement[];
  events: CampusEvent[];
  facilities: CampusFacility[];
  stats: CampusStatItem[];
  generalInfo: CampusGeneralInfo;
  registrarInfo: RegistrarInfo;
  hodCompSciInfo: HodComputerScienceInfo;
  courseFormSubmissions: CourseFormSubmission[];
  proprietorInfo: ProprietorInfo;
  councilMembers: CouncilMember[];
  councilGallery: CouncilGalleryItem[];
  faqs: FAQItem[];
  
  // Update actions
  updateCourse: (course: Course) => void;
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;

  updateAnnouncement: (announcement: Announcement) => void;
  addAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: string) => void;

  updateEvent: (event: CampusEvent) => void;
  addEvent: (event: CampusEvent) => void;
  deleteEvent: (id: string) => void;

  updateFacility: (facility: CampusFacility) => void;
  addFacility: (facility: CampusFacility) => void;
  deleteFacility: (id: string) => void;

  updateStats: (newStats: CampusStatItem[]) => void;
  updateGeneralInfo: (info: CampusGeneralInfo) => void;
  updateRegistrarInfo: (info: RegistrarInfo) => void;
  updateHodCompSciInfo: (info: HodComputerScienceInfo) => void;
  updateProprietorInfo: (info: ProprietorInfo) => void;
  
  updateCouncilMember: (member: CouncilMember) => void;
  addCouncilMember: (member: CouncilMember) => void;
  deleteCouncilMember: (id: string) => void;

  updateCouncilGalleryItem: (item: CouncilGalleryItem) => void;
  addCouncilGalleryItem: (item: CouncilGalleryItem) => void;
  deleteCouncilGalleryItem: (id: string) => void;

  // FAQ actions
  updateFAQ: (faq: FAQItem) => void;
  addFAQ: (faq: FAQItem) => void;
  deleteFAQ: (id: string) => void;
  reorderFAQs: (faqs: FAQItem[]) => void;
  resetFAQsToDefault: () => void;

  // Course Form Submissions actions
  submitCourseForm: (submission: Omit<CourseFormSubmission, 'id' | 'submittedAt' | 'status'>) => void;
  updateCourseFormStatus: (id: string, status: CourseFormSubmission['status'], remarks?: string) => void;
  deleteCourseFormSubmission: (id: string) => void;

  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      return saved ? JSON.parse(saved) : DEFAULT_COURSES;
    } catch {
      return DEFAULT_COURSES;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      return saved ? JSON.parse(saved) : DEFAULT_ANNOUNCEMENTS;
    } catch {
      return DEFAULT_ANNOUNCEMENTS;
    }
  });

  const [events, setEvents] = useState<CampusEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : DEFAULT_EVENTS;
    } catch {
      return DEFAULT_EVENTS;
    }
  });

  const [facilities, setFacilities] = useState<CampusFacility[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FACILITIES);
      return saved ? JSON.parse(saved) : DEFAULT_FACILITIES;
    } catch {
      return DEFAULT_FACILITIES;
    }
  });

  const [stats, setStats] = useState<CampusStatItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STATS);
      return saved ? JSON.parse(saved) : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const [generalInfo, setGeneralInfo] = useState<CampusGeneralInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INFO);
      return saved ? JSON.parse(saved) : DEFAULT_CAMPUS_INFO;
    } catch {
      return DEFAULT_CAMPUS_INFO;
    }
  });

  const [registrarInfo, setRegistrarInfo] = useState<RegistrarInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTRAR);
      return saved ? JSON.parse(saved) : DEFAULT_REGISTRAR_INFO;
    } catch {
      return DEFAULT_REGISTRAR_INFO;
    }
  });

  const [hodCompSciInfo, setHodCompSciInfo] = useState<HodComputerScienceInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HOD_COMPSCI);
      return saved ? JSON.parse(saved) : DEFAULT_HOD_COMPSCI_INFO;
    } catch {
      return DEFAULT_HOD_COMPSCI_INFO;
    }
  });

  const [courseFormSubmissions, setCourseFormSubmissions] = useState<CourseFormSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSE_FORMS);
      return saved ? JSON.parse(saved) : DEFAULT_COURSE_FORM_SUBMISSIONS;
    } catch {
      return DEFAULT_COURSE_FORM_SUBMISSIONS;
    }
  });

  const [proprietorInfo, setProprietorInfo] = useState<ProprietorInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPRIETOR);
      return saved ? JSON.parse(saved) : DEFAULT_PROPRIETOR_INFO;
    } catch {
      return DEFAULT_PROPRIETOR_INFO;
    }
  });

  const [councilMembers, setCouncilMembers] = useState<CouncilMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUNCIL_MEMBERS);
      return saved ? JSON.parse(saved) : DEFAULT_COUNCIL_MEMBERS;
    } catch {
      return DEFAULT_COUNCIL_MEMBERS;
    }
  });

  const [councilGallery, setCouncilGallery] = useState<CouncilGalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUNCIL_GALLERY);
      return saved ? JSON.parse(saved) : DEFAULT_COUNCIL_GALLERY;
    } catch {
      return DEFAULT_COUNCIL_GALLERY;
    }
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      return saved ? JSON.parse(saved) : DEFAULT_FAQS;
    } catch {
      return DEFAULT_FAQS;
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (e) {
      console.error(e);
    }
  }, [courses]);


  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch (e) {
      console.error(e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(facilities));
    } catch (e) {
      console.error(e);
    }
  }, [facilities]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (e) {
      console.error(e);
    }
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(generalInfo));
    } catch (e) {
      console.error(e);
    }
  }, [generalInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRAR, JSON.stringify(registrarInfo));
    } catch (e) {
      console.error(e);
    }
  }, [registrarInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HOD_COMPSCI, JSON.stringify(hodCompSciInfo));
    } catch (e) {
      console.error(e);
    }
  }, [hodCompSciInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSE_FORMS, JSON.stringify(courseFormSubmissions));
    } catch (e) {
      console.error(e);
    }
  }, [courseFormSubmissions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROPRIETOR, JSON.stringify(proprietorInfo));
    } catch (e) {
      console.error(e);
    }
  }, [proprietorInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COUNCIL_MEMBERS, JSON.stringify(councilMembers));
    } catch (e) {
      console.error(e);
    }
  }, [councilMembers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COUNCIL_GALLERY, JSON.stringify(councilGallery));
    } catch (e) {
      console.error(e);
    }
  }, [councilGallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
    } catch (e) {
      console.error(e);
    }
  }, [faqs]);


  // Course actions
  const updateCourse = (updatedCourse: Course) => {
    setCourses((prev) => prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
  };

  const addCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // Announcement actions
  const updateAnnouncement = (updatedAnn: Announcement) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === updatedAnn.id ? updatedAnn : a)));
  };

  const addAnnouncement = (newAnn: Announcement) => {
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  // Event actions
  const updateEvent = (updatedEvent: CampusEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
  };

  const addEvent = (newEvent: CampusEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // Facility actions
  const updateFacility = (updatedFacility: CampusFacility) => {
    setFacilities((prev) => prev.map((f) => (f.id === updatedFacility.id ? updatedFacility : f)));
  };

  const addFacility = (newFacility: CampusFacility) => {
    setFacilities((prev) => [...prev, newFacility]);
  };

  const deleteFacility = (id: string) => {
    setFacilities((prev) => prev.filter((f) => f.id !== id));
  };

  // Stats & Info actions
  const updateStats = (newStats: CampusStatItem[]) => {
    setStats(newStats);
  };

  const updateGeneralInfo = (info: CampusGeneralInfo) => {
    setGeneralInfo(info);
  };

  const updateRegistrarInfo = (info: RegistrarInfo) => {
    setRegistrarInfo(info);
  };

  const updateHodCompSciInfo = (info: HodComputerScienceInfo) => {
    setHodCompSciInfo(info);
  };

  const updateProprietorInfo = (info: ProprietorInfo) => {
    setProprietorInfo(info);
  };

  const updateCouncilMember = (member: CouncilMember) => {
    setCouncilMembers((prev) => prev.map((m) => (m.id === member.id ? member : m)));
  };

  const addCouncilMember = (member: CouncilMember) => {
    setCouncilMembers((prev) => [member, ...prev]);
  };

  const deleteCouncilMember = (id: string) => {
    setCouncilMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const updateCouncilGalleryItem = (item: CouncilGalleryItem) => {
    setCouncilGallery((prev) => prev.map((g) => (g.id === item.id ? item : g)));
  };

  const addCouncilGalleryItem = (item: CouncilGalleryItem) => {
    setCouncilGallery((prev) => [item, ...prev]);
  };

  const deleteCouncilGalleryItem = (id: string) => {
    setCouncilGallery((prev) => prev.filter((g) => g.id !== id));
  };

  // FAQ handlers
  const updateFAQ = (updatedFAQ: FAQItem) => {
    setFaqs((prev) => prev.map((f) => (f.id === updatedFAQ.id ? updatedFAQ : f)));
  };

  const addFAQ = (newFAQ: FAQItem) => {
    setFaqs((prev) => [newFAQ, ...prev]);
  };

  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const reorderFAQs = (newFaqs: FAQItem[]) => {
    setFaqs(newFaqs);
  };

  const resetFAQsToDefault = () => {
    setFaqs(DEFAULT_FAQS);
    try {
      localStorage.removeItem(STORAGE_KEYS.FAQS);
    } catch (e) {
      console.error(e);
    }
  };

  // Course Form Submissions handlers
  const submitCourseForm = (submission: Omit<CourseFormSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newSubmission: CourseFormSubmission = {
      ...submission,
      id: `sub-cs-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending Review',
    };
    setCourseFormSubmissions((prev) => [newSubmission, ...prev]);
  };

  const updateCourseFormStatus = (id: string, status: CourseFormSubmission['status'], remarks?: string) => {
    setCourseFormSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status,
              hodRemarks: remarks !== undefined ? remarks : sub.hodRemarks,
              reviewedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            }
          : sub
      )
    );
  };

  const deleteCourseFormSubmission = (id: string) => {
    setCourseFormSubmissions((prev) => prev.filter((sub) => sub.id !== id));
  };

  // Reset all
  const resetToDefaults = () => {
    setCourses(DEFAULT_COURSES);
    setAnnouncements(DEFAULT_ANNOUNCEMENTS);
    setEvents(DEFAULT_EVENTS);
    setFacilities(DEFAULT_FACILITIES);
    setStats(DEFAULT_STATS);
    setGeneralInfo(DEFAULT_CAMPUS_INFO);
    setRegistrarInfo(DEFAULT_REGISTRAR_INFO);
    setHodCompSciInfo(DEFAULT_HOD_COMPSCI_INFO);
    setCourseFormSubmissions(DEFAULT_COURSE_FORM_SUBMISSIONS);
    setProprietorInfo(DEFAULT_PROPRIETOR_INFO);
    setCouncilMembers(DEFAULT_COUNCIL_MEMBERS);
    setCouncilGallery(DEFAULT_COUNCIL_GALLERY);
    setFaqs(DEFAULT_FAQS);
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.FACILITIES);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.INFO);
    localStorage.removeItem(STORAGE_KEYS.REGISTRAR);
    localStorage.removeItem(STORAGE_KEYS.HOD_COMPSCI);
    localStorage.removeItem(STORAGE_KEYS.COURSE_FORMS);
    localStorage.removeItem(STORAGE_KEYS.PROPRIETOR);
    localStorage.removeItem(STORAGE_KEYS.COUNCIL_MEMBERS);
    localStorage.removeItem(STORAGE_KEYS.COUNCIL_GALLERY);
    localStorage.removeItem(STORAGE_KEYS.FAQS);
  };

  return (
    <DataContext.Provider
      value={{
        courses,
        schools: DEFAULT_SCHOOLS,
        announcements,
        events,
        facilities,
        stats,
        generalInfo,
        registrarInfo,
        hodCompSciInfo,
        courseFormSubmissions,
        proprietorInfo,
        councilMembers,
        councilGallery,
        faqs,
        updateCourse,
        addCourse,
        deleteCourse,
        updateAnnouncement,
        addAnnouncement,
        deleteAnnouncement,
        updateEvent,
        addEvent,
        deleteEvent,
        updateFacility,
        addFacility,
        deleteFacility,
        updateStats,
        updateGeneralInfo,
        updateRegistrarInfo,
        updateHodCompSciInfo,
        updateProprietorInfo,
        updateCouncilMember,
        addCouncilMember,
        deleteCouncilMember,
        updateCouncilGalleryItem,
        addCouncilGalleryItem,
        deleteCouncilGalleryItem,
        updateFAQ,
        addFAQ,
        deleteFAQ,
        reorderFAQs,
        resetFAQsToDefault,
        submitCourseForm,
        updateCourseFormStatus,
        deleteCourseFormSubmission,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
