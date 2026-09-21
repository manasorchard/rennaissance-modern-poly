import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  FileText, 
  UserCheck, 
  GraduationCap, 
  Download, 
  ArrowRight, 
  Sparkles, 
  CornerDownLeft, 
  Check, 
  Building2, 
  Cpu, 
  Award, 
  ChevronRight,
  Clock,
  ExternalLink,
  ShieldCheck,
  Mail,
  Phone,
  FileCheck
} from 'lucide-react';
import { useDataContext } from '../context/DataContext';
import { NavSection } from '../types';

export type SearchCategory = 'all' | 'courses' | 'forms' | 'staff';

export interface SearchResultItem {
  id: string;
  category: 'courses' | 'forms' | 'staff';
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor: string;
  meta?: string;
  imageUrl?: string;
  iconName?: 'course' | 'form' | 'staff';
  actionLabel: string;
  secondaryActionLabel?: string;
  onAction: () => void;
  onSecondaryAction?: () => void;
  downloadData?: {
    filename: string;
    content: string;
    mimeType?: string;
  };
}

interface SitewideSearchProps {
  onNavigate: (section: NavSection) => void;
  onOpenAdmissions: (courseTitle?: string) => void;
  onOpenPortal: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  variant?: 'header' | 'mobile-button' | 'mobile-bar';
}

export const SitewideSearch: React.FC<SitewideSearchProps> = ({
  onNavigate,
  onOpenAdmissions,
  onOpenPortal,
  variant = 'header',
}) => {
  const { 
    courses, 
    schools, 
    generalInfo, 
    registrarInfo, 
    hodCompSciInfo, 
    proprietorInfo, 
    councilMembers 
  } = useDataContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Global keyboard shortcut (Cmd+K or Ctrl+K or '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsModalOpen(true);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsModalOpen(true);
      } else if (e.key === 'Escape' && isModalOpen) {
        e.preventDefault();
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        modalInputRef.current?.focus();
      }, 50);
    }
  }, [isModalOpen]);

  // Build searchable index
  const allSearchItems = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    // 1. COURSES
    courses.forEach((c) => {
      items.push({
        id: `course-${c.id}`,
        category: 'courses',
        title: `${c.code}: ${c.title}`,
        subtitle: `${c.schoolName} • ${c.duration}`,
        description: c.description,
        badge: c.level,
        badgeColor: c.level === 'HND' ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-emerald-100 text-emerald-900 border-emerald-300',
        meta: `Tuition: ₦${c.tuitionPerSession.toLocaleString()} / session • ${c.accreditationStatus}`,
        iconName: 'course',
        actionLabel: 'View Course',
        secondaryActionLabel: 'Apply Now',
        onAction: () => {
          setIsModalOpen(false);
          onNavigate('courses');
        },
        onSecondaryAction: () => {
          setIsModalOpen(false);
          onOpenAdmissions(c.title);
        }
      });
    });

    // 2. ACADEMIC FORMS & CLEARANCES
    // 2.1 Blank Course Registration Form
    items.push({
      id: 'form-course-reg',
      category: 'forms',
      title: 'Official Course Registration Form (ND & HND)',
      subtitle: 'Departmental Academic Registration • NBTE Standard',
      description: 'Official 2-page course registration sheet required for all ND I, ND II, HND I, and HND II scholars. Fill, sign, obtain Level Adviser endorsement, and upload for HOD clearance.',
      badge: 'Academic Form',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      meta: 'Format: Fillable Document • Required each semester',
      iconName: 'form',
      actionLabel: 'Download Form',
      secondaryActionLabel: 'Upload & Clear',
      downloadData: {
        filename: 'RMP_Official_Course_Registration_Form_Blank.txt',
        content: `========================================================================\nRENAISSANCE MODERN POLYTECHNIC, MBAUKWU, ANAMBRA STATE\nOFFICE OF THE REGISTRAR & ACADEMIC AFFAIRS DIVISION\nOFFICIAL SEMESTER COURSE REGISTRATION FORM\n========================================================================\n\nACADEMIC SESSION: ${hodCompSciInfo?.academicSession || '2024/2025'}\nCURRENT SEMESTER: ${hodCompSciInfo?.activeSemester || '1st Semester'}\n\nSTUDENT BIODATA:\n- Full Name: ___________________________________________________________\n- Matriculation / Application No: ________________________________________\n- Department: __________________________________________________________\n- School / Faculty: _____________________________________________________\n- Level: [ ] ND I   [ ] ND II   [ ] HND I   [ ] HND II\n- Contact Phone: _______________________________________________________\n- Official Student Email: _______________________________________________\n\nLIST OF REGISTERED COURSES:\nNo. | Course Code | Course Title                              | Credit Units\n----+-------------+-------------------------------------------+-------------\n1.  |             |                                           |             \n2.  |             |                                           |             \n3.  |             |                                           |             \n4.  |             |                                           |             \n5.  |             |                                           |             \n6.  |             |                                           |             \n7.  |             |                                           |             \n8.  |             |                                           |             \n----+-------------+-------------------------------------------+-------------\nTOTAL CREDIT UNITS: _______ (NBTE Maximum Limit: 24 Units)\n\nSTUDENT ATTESTATION:\nI solemnly declare that the courses entered above are in strict conformity\nwith the official NBTE curriculum and approved by my Level Adviser.\nStudent Signature: _______________________ Date: ____________________\n\nOFFICIAL ENDORSEMENTS:\nLevel Adviser Signature & Stamp: ___________________ Date: ___________\nHead of Department (HOD) Clearance: ________________ Date: ___________\nRegistry Exams & Records Acknowledgment: ___________ Date: ___________\n========================================================================\n`
      },
      onAction: () => {
        setIsModalOpen(false);
      },
      onSecondaryAction: () => {
        setIsModalOpen(false);
        onNavigate('hod_compsci');
      }
    });

    // 2.2 Student Academic Handbook
    items.push({
      id: 'form-academic-handbook',
      category: 'forms',
      title: 'Student Academic Handbook & Curriculum Guide (2024–2026)',
      subtitle: 'NBTE Academic Benchmarks, Grading Scheme & Codes of Conduct',
      description: 'Comprehensive institutional student guide covering credit unit calculations, CGPA grading formulas (A to F), examination bylaws, laboratory safety rules, and graduation criteria.',
      badge: 'Institutional Guide',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      meta: 'Format: Official Handbook • Applicable to all Schools',
      iconName: 'form',
      actionLabel: 'Download Handbook',
      downloadData: {
        filename: 'RMP_Student_Academic_Handbook_2024_2026.txt',
        content: `========================================================================\nRENAISSANCE MODERN POLYTECHNIC, MBAUKWU\nSTUDENT ACADEMIC HANDBOOK & NBTE CURRICULUM GUIDELINES (2024 - 2026)\n========================================================================\n\nMOTTO: Technology for Self-Reliance\nLOCATION: Off Old Awka Road, Mbaukwu, Awka South LGA, Anambra State\n\n1. GRADING SCALE & GRADE POINT AVERAGE (GPA) COMPUTATION:\n- 75% - 100% : A   (Grade Point: 4.00) - Distinction\n- 70% - 74%  : AB  (Grade Point: 3.50) - Upper Credit\n- 65% - 69%  : B   (Grade Point: 3.25) - Upper Credit\n- 60% - 64%  : BC  (Grade Point: 3.00) - Lower Credit\n- 55% - 59%  : C   (Grade Point: 2.75) - Lower Credit\n- 50% - 54%  : CD  (Grade Point: 2.50) - Pass\n- 45% - 49%  : D   (Grade Point: 2.25) - Pass\n- 40% - 44%  : E   (Grade Point: 2.00) - Pass\n- 00% - 39%  : F   (Grade Point: 0.00) - Fail\n\n2. ACADEMIC PROBATION & WITHDRAWAL:\nA student whose CGPA falls below 2.00 at the end of any session is placed on Academic Probation.\nFailure to achieve a 2.00 CGPA at the end of the subsequent probationary semester leads to withdrawal.\n\n3. WORKSHOP & LAB CODE OF CONDUCT:\n- Mandatory industrial safety boots, lab coats, and safety goggles inside engineering and welding workshops.\n- Zero tolerance for examination malpractice, cultism, or unauthorized property destruction.\n========================================================================\n`
      },
      onAction: () => {
        setIsModalOpen(false);
      }
    });

    // 2.3 Official Academic Transcript Request
    items.push({
      id: 'form-transcript-request',
      category: 'forms',
      title: 'Official Academic Transcript Request & Verification Application',
      subtitle: 'Office of the Registrar • Exams & Records Division',
      description: 'Official application for alumni, graduating scholars, employers, and foreign institutions to request certified academic transcripts, statements of result, and international credential evaluation.',
      badge: 'Registry Form',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      meta: 'Processing time: 48–72 hours • Handled by Rev\'d Can James',
      iconName: 'form',
      actionLabel: 'Go to Registry Desk',
      onAction: () => {
        setIsModalOpen(false);
        onNavigate('registrar');
      }
    });

    // 2.4 SIWES & Industrial Attachment Guidelines & ITF Form 8
    items.push({
      id: 'form-siwes-guidelines',
      category: 'forms',
      title: 'SIWES Industrial Attachment Defense Guidelines & ITF Form 8',
      subtitle: 'Industrial Linkages & Students Training Unit',
      description: 'Mandatory technical report guidelines, ITF logbook maintenance directives, supervisor endorsement templates, and oral defense requirements for ND I/II students completing 4-month or 1-year industrial training.',
      badge: 'Industrial Training',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      meta: 'Format: Official Defense Guide • Approved by NBTE & ITF',
      iconName: 'form',
      actionLabel: 'Download Guidelines',
      downloadData: {
        filename: 'RMP_SIWES_ITF_Defense_Guidelines.txt',
        content: `========================================================================\nRENAISSANCE MODERN POLYTECHNIC, MBAUKWU\nDIRECTORATE OF INDUSTRIAL LINKAGES & SIWES\nSTUDENTS INDUSTRIAL WORK EXPERIENCE SCHEME (SIWES) DEFENSE GUIDELINES\n========================================================================\n\nELIGIBILITY:\nAll National Diploma (ND) students who have completed their mandatory\nindustrial training in an accredited manufacturing plant, tech hub, workshop,\nor engineering firm.\n\nDEFENSE SUBMISSION CHECKLIST:\n1. Duly signed and company-stamped ITF Form 8.\n2. Weekly logbook with supervisor signature on each page.\n3. Bound 20-page comprehensive technical report following NBTE structure:\n   - Chapter 1: Introduction to Host Firm & Organizational Chart\n   - Chapter 2: Workshop Operations, Machinery & Tools Utilized\n   - Chapter 3: Core Projects Executed & Technical Challenges Resolved\n   - Chapter 4: Practical Industrial Skills Acquired & Recommendations\n4. 10-minute visual presentation before the departmental assessment panel.\n========================================================================\n`
      },
      onAction: () => {
        setIsModalOpen(false);
      }
    });

    // 2.5 2024/2025 Admissions Screening Form
    items.push({
      id: 'form-admissions-app',
      category: 'forms',
      title: '2024/2025 ND & HND Admission Screening Application Form',
      subtitle: 'Admissions & Matriculation Unit • Central Registry',
      description: 'Online application form for prospective students seeking National Diploma (ND), Higher National Diploma (HND), or Vocational Innovation Certificate admission. No JAMB UTME bottleneck for qualified candidates.',
      badge: 'Admissions Form',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      meta: 'Application Fee: ₦5,000 • Screening Ongoing',
      iconName: 'form',
      actionLabel: 'Fill Application Online',
      onAction: () => {
        setIsModalOpen(false);
        onOpenAdmissions();
      }
    });

    // 2.6 Student Semester Examination Clearance Docket
    items.push({
      id: 'form-exam-clearance',
      category: 'forms',
      title: 'Semester Examination Clearance Docket & Verification Slip',
      subtitle: 'Office of the HOD & School Officer Desk',
      description: 'Official examination hall docket issued upon satisfactory verification of school fee payment, full course registration, and minimum 75% lecture/laboratory attendance.',
      badge: 'Examination Form',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      meta: 'Status Check & Approval via HOD Portal',
      iconName: 'form',
      actionLabel: 'Check Docket Status',
      onAction: () => {
        setIsModalOpen(false);
        onNavigate('hod_compsci');
      }
    });

    // 2.7 Course Carryover & Add/Drop Form
    items.push({
      id: 'form-add-drop',
      category: 'forms',
      title: 'Course Add/Drop & Carryover Adjustment Sheet',
      subtitle: 'Departmental Academic Advisory Desk',
      description: 'Official academic adjustment form to add prerequisite courses, rectify course code errors, or formally register carryovers with Level Advisers.',
      badge: 'Advisory Form',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      meta: 'Approval deadline: 2 weeks after semester resumption',
      iconName: 'form',
      actionLabel: 'Contact Level Advisers',
      onAction: () => {
        setIsModalOpen(false);
        onNavigate('hod_compsci');
      }
    });

    // 2.8 Certificate Authentication Request
    items.push({
      id: 'form-cert-auth',
      category: 'forms',
      title: 'Certificate & Statement of Result Authentication Request',
      subtitle: 'Registry Examinations & Academic Records Division',
      description: 'Verification application form for embassies, corporations, higher institutions, and scholarship boards requiring institutional validation of Renaissance Modern Polytechnic awards.',
      badge: 'Verification Form',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      meta: 'Direct dispatch with institutional embossed seal',
      iconName: 'form',
      actionLabel: 'Submit Verification',
      onAction: () => {
        setIsModalOpen(false);
        onNavigate('registrar');
      }
    });

    // 3. STAFF PROFILES & LEADERSHIP
    // 3.1 Founder & Proprietor
    items.push({
      id: 'staff-proprietor',
      category: 'staff',
      title: proprietorInfo.name,
      subtitle: `${proprietorInfo.titles} • ${proprietorInfo.position}`,
      description: 'Founder, industrialist, philanthropist, and Chairman of the Board of Trustees. Conferred Officer of the Order of the Niger (OON) and Knight of St. Paul (KSP). Sponsor of 50 annual engineering scholarships.',
      badge: 'Founder & Proprietor',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-400 font-bold',
      meta: `Office: Senate Tower • Contact: ${proprietorInfo.officeContact.phone}`,
      imageUrl: proprietorInfo.photoUrl,
      iconName: 'staff',
      actionLabel: 'View Full Dossier',
      onAction: () => {
        setIsModalOpen(false);
        onNavigate('proprietor');
      }
    });

    // 3.2 Rector
    items.push({
      id: 'staff-rector',
      category: 'staff',
      title: generalInfo.rectorName,
      subtitle: `${generalInfo.rectorTitles} • ${generalInfo.rectorPosition}`,
      description: 'Chief Academic and Executive Officer of the Polytechnic. Pioneer advocate for hands-on solar microgrid engineering and practical workshop excellence in technical education.',
      badge: 'Rector & Council Member',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold',
      meta: 'Office: Rectorate Wing, Senate Complex',
      imageUrl: generalInfo.rectorPhotoUrl,
      iconName: 'staff',
      actionLabel: 'View Council Profile',
      onAction: () => {
        setIsModalOpen(false);
        onNavigate('council');
      }
    });

    // 3.3 Registrar
    items.push({
      id: 'staff-registrar',
      category: 'staff',
      title: registrarInfo.name,
      subtitle: `${registrarInfo.titles} • ${registrarInfo.position}`,
      description: 'Chief Administrative Officer of the Polytechnic and Secretary to the Governing Council. Oversees JAMB CAPS admissions, student transcripts, official records, and statutory registry affairs.',
      badge: 'Polytechnic Registrar',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold',
      meta: `Email: ${registrarInfo.email} • Location: ${registrarInfo.officeLocation}`,
      imageUrl: registrarInfo.photoUrl,
      iconName: 'staff',
      actionLabel: 'View Office of the Registrar',
      onAction: () => {
        setIsModalOpen(false);
        onNavigate('registrar');
      }
    });

    // 3.4 HOD Computer Science
    items.push({
      id: 'staff-hod-compsci',
      category: 'staff',
      title: hodCompSciInfo.name,
      subtitle: `${hodCompSciInfo.titles} • ${hodCompSciInfo.position}`,
      description: 'Head of Department of Computer Science Technology. Specialist in software engineering, embedded systems, and machine learning. In charge of departmental course approvals and lab centers.',
      badge: 'Head of Department',
      badgeColor: 'bg-blue-100 text-blue-950 border-blue-400 font-bold',
      meta: `Email: ${hodCompSciInfo.email} • Room CS-102`,
      imageUrl: hodCompSciInfo.photoUrl,
      iconName: 'staff',
      actionLabel: 'View HOD Desk & Clearance',
      onAction: () => {
        setIsModalOpen(false);
        onNavigate('hod_compsci');
      }
    });

    // 3.5 Council Chairman
    const councilChairman = councilMembers.find((m) => m.role.toLowerCase().includes('chairman'));
    if (councilChairman) {
      items.push({
        id: `staff-${councilChairman.id}`,
        category: 'staff',
        title: councilChairman.name,
        subtitle: `${councilChairman.titles} • ${councilChairman.role}`,
        description: councilChairman.profileSummary || 'Eminent scholar, former Dean of Physical Sciences, leading the Governing Council in academic governance and statutory oversight.',
        badge: 'Governing Council Chair',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300 font-bold',
        meta: `Email: ${councilChairman.email} • Tenure: ${councilChairman.tenure}`,
        imageUrl: councilChairman.photoUrl,
        iconName: 'staff',
        actionLabel: 'View Council Profile',
        onAction: () => {
          setIsModalOpen(false);
          onNavigate('council');
        }
      });
    }

    // 3.6 Other Council Members
    councilMembers
      .filter((m) => !m.role.toLowerCase().includes('chairman') && !m.role.toLowerCase().includes('rector') && !m.role.toLowerCase().includes('registrar'))
      .forEach((m) => {
        items.push({
          id: `staff-${m.id}`,
          category: 'staff',
          title: m.name,
          subtitle: `${m.titles} • ${m.role}`,
          description: m.profileSummary || m.fullBiography.substring(0, 160) + '...',
          badge: m.category,
          badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
          meta: `Email: ${m.email} • ${m.tenure}`,
          imageUrl: m.photoUrl,
          iconName: 'staff',
          actionLabel: 'View Council Dossier',
          onAction: () => {
            setIsModalOpen(false);
            onNavigate('council');
          }
        });
      });

    // 3.7 Deans of Schools
    schools.forEach((s) => {
      items.push({
        id: `staff-dean-${s.id}`,
        category: 'staff',
        title: s.dean,
        subtitle: `Dean, ${s.name}`,
        description: `Executive head of ${s.name}, overseeing ${s.courseCount} accredited programs: ${s.description}`,
        badge: 'School Dean',
        badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
        meta: `School: ${s.shortName} • ${s.courseCount} Accredited Programs`,
        iconName: 'staff',
        actionLabel: 'Explore School Programs',
        onAction: () => {
          setIsModalOpen(false);
          onNavigate('courses');
        }
      });
    });

    // 3.8 Level Academic Advisers
    if (hodCompSciInfo?.levelAdvisers) {
      hodCompSciInfo.levelAdvisers.forEach((adv, idx) => {
        items.push({
          id: `staff-adviser-${idx}`,
          category: 'staff',
          title: adv.name,
          subtitle: `${adv.titles} • ${adv.level} Academic Adviser`,
          description: `Designated student academic and course registration adviser for ${adv.level} Computer Science scholars. Coordinates course load clearances and student advisement.`,
          badge: `${adv.level} Adviser`,
          badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
          meta: `Office: ${adv.office} • Phone: ${adv.phone}`,
          iconName: 'staff',
          actionLabel: 'Consult Level Adviser',
          onAction: () => {
            setIsModalOpen(false);
            onNavigate('hod_compsci');
          }
        });
      });
    }

    return items;
  }, [courses, schools, generalInfo, registrarInfo, hodCompSciInfo, proprietorInfo, councilMembers, onNavigate, onOpenAdmissions]);

  // Filter items by search query and active category
  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let list = allSearchItems;
    if (activeCategory !== 'all') {
      list = list.filter((item) => item.category === activeCategory);
    }

    if (!q) {
      return list;
    }

    // Word tokens for multi-term matching
    const queryTerms = q.split(/\s+/).filter(Boolean);

    return list.filter((item) => {
      const fullSearchableText = [
        item.title,
        item.subtitle,
        item.description,
        item.badge,
        item.meta || '',
        item.category
      ].join(' ').toLowerCase();

      // All search terms must be present
      return queryTerms.every((term) => fullSearchableText.includes(term));
    });
  }, [allSearchItems, searchQuery, activeCategory]);

  // Count items per category
  const counts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const queryTerms = q ? q.split(/\s+/).filter(Boolean) : [];

    const matches = (item: SearchResultItem) => {
      if (!q) return true;
      const fullSearchableText = [
        item.title,
        item.subtitle,
        item.description,
        item.badge,
        item.meta || '',
        item.category
      ].join(' ').toLowerCase();
      return queryTerms.every((term) => fullSearchableText.includes(term));
    };

    const matchingItems = allSearchItems.filter(matches);

    return {
      all: matchingItems.length,
      courses: matchingItems.filter((i) => i.category === 'courses').length,
      forms: matchingItems.filter((i) => i.category === 'forms').length,
      staff: matchingItems.filter((i) => i.category === 'staff').length,
    };
  }, [allSearchItems, searchQuery]);

  // Handle direct file download
  const handleDownload = (item: SearchResultItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!item.downloadData) return;
    const blob = new Blob([item.downloadData.content], { type: item.downloadData.mimeType || 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.downloadData.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Keyboard navigation through results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredResults.length ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
      e.preventDefault();
      const item = filteredResults[selectedIndex];
      if (item.downloadData) {
        handleDownload(item);
      }
      item.onAction();
    }
  };

  // Popular / Recommended quick search chips
  const popularSearches = [
    { label: 'Computer Science (ND & HND)', query: 'Computer Science', category: 'courses' },
    { label: 'Course Registration Form', query: 'Course Registration Form', category: 'forms' },
    { label: "Rev'd Can James (Registrar)", query: 'Registrar Can James', category: 'staff' },
    { label: 'Academic Transcript Desk', query: 'Transcript Request', category: 'forms' },
    { label: 'Chief Dr. Emmanuel Okonkwo', query: 'Proprietor Emmanuel Okonkwo', category: 'staff' },
    { label: 'Solar & Inverter Engineering', query: 'Solar Photovoltaic', category: 'courses' },
    { label: 'SIWES Guidelines & ITF Form 8', query: 'SIWES Guidelines', category: 'forms' },
    { label: 'Rector Prof. Maduka', query: 'Rector Maduka', category: 'staff' },
  ];

  const handleQuickChipClick = (chipQuery: string, cat?: string) => {
    setSearchQuery(chipQuery);
    if (cat && (cat === 'courses' || cat === 'forms' || cat === 'staff')) {
      setActiveCategory(cat as SearchCategory);
    }
    modalInputRef.current?.focus();
  };

  return (
    <>
      {/* 1. Header Search Bar Input Container or Mobile Trigger */}
      {variant === 'mobile-button' ? (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="p-2 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Sitewide Search"
          title="Search courses, forms, staff (Ctrl+K)"
          id="mobile-search-icon-btn"
        >
          <Search className="w-4 h-4 text-emerald-800" />
        </button>
      ) : variant === 'mobile-bar' ? (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-slate-100/90 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200/90 transition-colors cursor-pointer text-left"
          id="mobile-search-bar-btn"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Search className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="truncate">Search courses, forms, staff...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white rounded border border-slate-300 shrink-0">
            Ctrl+K
          </kbd>
        </button>
      ) : (
        <div className="relative w-full max-w-md lg:max-w-lg">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full group flex items-center justify-between gap-3 px-3.5 py-2 bg-slate-100/90 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/90 hover:border-emerald-500/60 rounded-xl text-xs transition-all shadow-2xs cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
            title="Search courses, forms, or staff profiles (Press Ctrl+K or /)"
            id="header-sitewide-search-trigger"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Search className="w-4 h-4 text-emerald-700 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate text-slate-500 group-hover:text-slate-700 font-medium">
                Search courses, academic forms, staff...
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1 shrink-0">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-500 bg-white border border-slate-300 rounded shadow-2xs">
                Ctrl
              </kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-500 bg-white border border-slate-300 rounded shadow-2xs">
                K
              </kbd>
            </div>
          </button>
        </div>
      )}

      {/* 2. Comprehensive Sitewide Search Modal / Palette */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 md:p-10 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto sm:my-8 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Search Input & Close */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-white sticky top-0 z-10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5" />
                </div>
                <div className="flex-1 relative">
                  <input
                    ref={modalInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search courses, academic forms, staff profiles, deans, transcripts..."
                    className="w-full text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 bg-transparent border-none focus:outline-none focus:ring-0 pr-8"
                    id="modal-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        modalInputRef.current?.focus();
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Close Search (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>All Results</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {counts.all}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCategory('courses')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === 'courses'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Courses</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeCategory === 'courses' ? 'bg-white/20 text-white' : 'bg-emerald-200 text-emerald-900'
                  }`}>
                    {counts.courses}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCategory('forms')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === 'forms'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Academic Forms</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeCategory === 'forms' ? 'bg-white/20 text-white' : 'bg-amber-200 text-amber-950'
                  }`}>
                    {counts.forms}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCategory('staff')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === 'staff'
                      ? 'bg-blue-800 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Staff & Leadership</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeCategory === 'staff' ? 'bg-white/20 text-white' : 'bg-blue-200 text-blue-950'
                  }`}>
                    {counts.staff}
                  </span>
                </button>
              </div>
            </div>

            {/* Content Area: Suggestions or Filtered Results */}
            <div 
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-slate-100"
            >
              {/* If no query, display helpful Quick Links / Recommended Searches */}
              {!searchQuery.trim() && (
                <div className="space-y-4 pb-2">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Popular Sitewide Searches
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleQuickChipClick(chip.query, chip.category)}
                          className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Search className="w-3 h-3 text-slate-400" />
                          <span>{chip.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Browse All Indexed Items ({allSearchItems.length})
                    </span>
                  </div>
                </div>
              )}

              {/* Results List */}
              {filteredResults.length > 0 ? (
                filteredResults.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (item.downloadData) {
                          handleDownload(item);
                        }
                        item.onAction();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`pt-3 first:pt-0 p-3 sm:p-4 rounded-2xl transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-slate-50/90 border-emerald-500/40 shadow-xs'
                          : 'border-transparent hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        {/* Icon or Photo */}
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-2xs mt-0.5"
                          />
                        ) : item.iconName === 'course' ? (
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                            <BookOpen className="w-5 h-5 text-emerald-800" />
                          </div>
                        ) : item.iconName === 'form' ? (
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                            <FileText className="w-5 h-5 text-amber-800" />
                          </div>
                        ) : (
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                            <UserCheck className="w-5 h-5 text-blue-800" />
                          </div>
                        )}

                        {/* Text and Actions */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <h4 className="text-sm font-bold text-slate-900 truncate">
                                {item.title}
                              </h4>
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border shrink-0 ${item.badgeColor}`}>
                                {item.badge}
                              </span>
                            </div>

                            {/* Direct Action Buttons */}
                            <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                              {item.downloadData && (
                                <button
                                  type="button"
                                  onClick={(e) => handleDownload(item, e)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                                  title="Download Blank Official Document"
                                >
                                  <Download className="w-3 h-3 text-emerald-700" />
                                  <span>Download</span>
                                </button>
                              )}

                              {item.secondaryActionLabel && item.onSecondaryAction && (
                                <button
                                  type="button"
                                  onClick={() => item.onSecondaryAction!()}
                                  className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <Sparkles className="w-3 h-3" />
                                  <span>{item.secondaryActionLabel}</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => {
                                  if (item.downloadData) {
                                    handleDownload(item);
                                  }
                                  item.onAction();
                                }}
                                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-emerald-950 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <span>{item.actionLabel}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <p className="text-xs font-medium text-emerald-900">
                            {item.subtitle}
                          </p>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>

                          {item.meta && (
                            <div className="pt-1 text-[11px] text-slate-400 font-medium flex items-center gap-1">
                              <span>• {item.meta}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    No results found for "{searchQuery}"
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try searching for keywords like <span className="font-semibold text-emerald-800">"Computer Science"</span>, <span className="font-semibold text-emerald-800">"Registration Form"</span>, <span className="font-semibold text-emerald-800">"Transcript"</span>, or staff titles like <span className="font-semibold text-emerald-800">"Registrar"</span> or <span className="font-semibold text-emerald-800">"Dean"</span>.
                  </p>
                  <div className="pt-2 flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Clear Search Query
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCategory('all')}
                      className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Show All Categories
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation Bar */}
            <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-medium">
                  <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-slate-300 rounded shadow-2xs font-bold">↑</kbd>
                  <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-slate-300 rounded shadow-2xs font-bold">↓</kbd>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-slate-300 rounded shadow-2xs font-bold">↵</kbd>
                  <span>to select</span>
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-slate-300 rounded shadow-2xs font-bold">ESC</kbd>
                  <span>to close</span>
                </span>
              </div>

              <div className="text-right text-emerald-900 font-semibold">
                Renaissance Modern Polytechnic, Mbaukwu
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
