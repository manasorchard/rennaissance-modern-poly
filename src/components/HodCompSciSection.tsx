import React, { useState } from 'react';
import { 
  Cpu, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search, 
  UserCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Info, 
  ChevronRight, 
  X, 
  Eye, 
  BookOpen,
  Send,
  HelpCircle,
  FileCheck,
  Building2,
  ArrowRight
} from 'lucide-react';
import { useDataContext } from '../context/DataContext';
import { CourseFormSubmission } from '../types';

interface HodCompSciSectionProps {
  onOpenPortal?: () => void;
  onNavigateToAdmin?: () => void;
  onExploreCourses?: () => void;
}

export const HodCompSciSection: React.FC<HodCompSciSectionProps> = ({
  onOpenPortal,
  onNavigateToAdmin,
  onExploreCourses
}) => {
  const { hodCompSciInfo, courseFormSubmissions, submitCourseForm } = useDataContext();

  // Active view tab in HOD section
  type SubTab = 'upload' | 'track' | 'profile' | 'advisers' | 'notices' | 'templates';
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('upload');

  // ================= SUBMISSION FORM STATE =================
  const [matricNo, setMatricNo] = useState('');
  const [fullName, setFullName] = useState('');
  const [level, setLevel] = useState<'ND I' | 'ND II' | 'HND I' | 'HND II'>('ND I');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([
    'COM 111 - Introduction to Computing (3 Units)',
    'COM 112 - Logic & Structured Programming (C/C++) (3 Units)',
    'COM 113 - Computer Hardware Fundamentals (2 Units)',
    'MTH 111 - Logic & Linear Algebra (2 Units)',
    'GNS 101 - Use of English I (2 Units)',
    'GNS 111 - Citizenship Education I (2 Units)',
    'STA 111 - Descriptive Statistics (2 Units)'
  ]);
  const [customCourseInput, setCustomCourseInput] = useState('');

  // Uploaded file
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFileSize, setUploadedFileSize] = useState<string>('');
  const [uploadedFileDataUrl, setUploadedFileDataUrl] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<CourseFormSubmission | null>(null);

  // Quick autofill demo for user testing
  const handleAutofillDemo = () => {
    setMatricNo('RMP/ND/CS/2024/0259');
    setFullName('Kelechi Anthony Okoye');
    setLevel('ND I');
    setPhone('+234 813 902 4418');
    setEmail('kelechi.okoye@student.renaissancemodern.edu.ng');
    setDeclarationAccepted(true);
    // Provide a sample signed course form image if not already selected
    if (!uploadedFileDataUrl) {
      setUploadedFileName('Kelechi_Okoye_ND1_FirstSem_Signed_Form.pdf');
      setUploadedFileSize('640 KB');
      setUploadedFileDataUrl('https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80');
    }
  };

  // Pre-configured curriculum courses per level
  const COURSE_OPTIONS: Record<string, string[]> = {
    'ND I': [
      'COM 111 - Introduction to Computing (3 Units)',
      'COM 112 - Logic & Structured Programming (C/C++) (3 Units)',
      'COM 113 - Computer Hardware Fundamentals (2 Units)',
      'MTH 111 - Logic & Linear Algebra (2 Units)',
      'GNS 101 - Use of English I (2 Units)',
      'GNS 111 - Citizenship Education I (2 Units)',
      'STA 111 - Descriptive Statistics (2 Units)'
    ],
    'ND II': [
      'COM 211 - Object-Oriented Programming (Java) (3 Units)',
      'COM 212 - Database Design & Management (SQL) (3 Units)',
      'COM 213 - Computer Systems Troubleshooting (2 Units)',
      'COM 214 - Operating Systems & UNIX (3 Units)',
      'COM 215 - Computer Packages II (2 Units)',
      'EED 216 - Entrepreneurship Development II (2 Units)'
    ],
    'HND I': [
      'COM 311 - Advanced Operating Systems (3 Units)',
      'COM 312 - Database Management Systems II (3 Units)',
      'COM 313 - Computer Graphics & Animation (3 Units)',
      'COM 314 - Operations Research (3 Units)',
      'COM 315 - Statistical Methods in Computing (2 Units)'
    ],
    'HND II': [
      'COM 411 - Artificial Intelligence & Expert Systems (3 Units)',
      'COM 412 - Cloud Computing & Distributed Architectures (3 Units)',
      'COM 413 - Cybersecurity & Cryptographic Systems (3 Units)',
      'COM 414 - Project Management in IT (2 Units)',
      'COM 499 - Advanced Capstone Research (4 Units)'
    ]
  };

  // Change level and update suggested courses
  const handleLevelChange = (newLevel: 'ND I' | 'ND II' | 'HND I' | 'HND II') => {
    setLevel(newLevel);
    setSelectedCourses(COURSE_OPTIONS[newLevel] || []);
  };

  const handleToggleCourse = (courseStr: string) => {
    if (selectedCourses.includes(courseStr)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== courseStr));
    } else {
      setSelectedCourses([...selectedCourses, courseStr]);
    }
  };

  const handleAddCustomCourse = () => {
    if (!customCourseInput.trim()) return;
    if (!selectedCourses.includes(customCourseInput.trim())) {
      setSelectedCourses([...selectedCourses, customCourseInput.trim()]);
    }
    setCustomCourseInput('');
  };

  // Calculate approximate credit units from selected course strings
  const calculateTotalCredits = () => {
    let total = 0;
    selectedCourses.forEach((c) => {
      const match = c.match(/(\d+)\s*units?/i);
      if (match) {
        total += parseInt(match[1], 10);
      } else {
        total += 3; // Default assumption
      }
    });
    return total;
  };

  // Handle file selection from folder/device or drag-and-drop
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit. Please upload a smaller PDF or image.');
      return;
    }

    const fileSizeFormatted = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    setUploadedFileName(file.name);
    setUploadedFileSize(fileSizeFormatted);

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedFileDataUrl(reader.result as string);
    };
    reader.onerror = () => {
      setUploadError('Failed to read file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadError('');
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit. Please upload a smaller PDF or image.');
      return;
    }

    const fileSizeFormatted = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    setUploadedFileName(file.name);
    setUploadedFileSize(fileSizeFormatted);

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedFileDataUrl(reader.result as string);
    };
    reader.onerror = () => {
      setUploadError('Failed to read dropped file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  // Handle Form Submission
  const handleSubmitCourseForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFileDataUrl) {
      setUploadError('Please select and upload your signed Departmental Course Registration Form.');
      return;
    }

    if (selectedCourses.length === 0) {
      setUploadError('Please select at least one course for registration.');
      return;
    }

    if (!declarationAccepted) {
      setUploadError('Please confirm the student declaration checkbox.');
      return;
    }

    setIsSubmitting(true);
    setUploadError('');

    setTimeout(() => {
      const submissionData = {
        matricNo: matricNo.trim().toUpperCase(),
        fullName: fullName.trim(),
        level,
        session: hodCompSciInfo.academicSession,
        semester: hodCompSciInfo.activeSemester,
        phone: phone.trim(),
        email: email.trim(),
        registeredCourses: selectedCourses,
        totalCredits: calculateTotalCredits(),
        fileDataUrl: uploadedFileDataUrl,
        fileName: uploadedFileName,
        fileSize: uploadedFileSize || '500 KB'
      };

      submitCourseForm(submissionData);

      const createdItem: CourseFormSubmission = {
        ...submissionData,
        id: `RMP-SUB-${Math.floor(100000 + Math.random() * 900000)}`,
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'Pending Review'
      };

      setSubmittedResult(createdItem);
      setIsSubmitting(false);
    }, 900);
  };

  // Reset form for another submission
  const handleResetForm = () => {
    setSubmittedResult(null);
    setMatricNo('');
    setFullName('');
    setPhone('');
    setEmail('');
    setUploadedFileName('');
    setUploadedFileSize('');
    setUploadedFileDataUrl('');
    setDeclarationAccepted(false);
    setSelectedCourses(COURSE_OPTIONS[level] || []);
  };

  // ================= TRACKING STATE =================
  const [trackMatricQuery, setTrackMatricQuery] = useState('');
  const [trackSearched, setTrackSearched] = useState(false);

  const trackingResults = courseFormSubmissions.filter((sub) =>
    trackMatricQuery.trim() === ''
      ? false
      : sub.matricNo.toLowerCase().includes(trackMatricQuery.trim().toLowerCase())
  );

  // Modal for previewing uploaded document/image in tracking or submissions
  const [previewDocUrl, setPreviewDocUrl] = useState<string | null>(null);

  return (
    <div id="hod-compsci-main-section" className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP HERO / EXECUTIVE BANNER */}
        <div className="bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>Department of Computer Science & Artificial Intelligence</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Office of the Head of Department (HOD)
              </h1>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs text-emerald-200">
                <span className="font-bold text-amber-300">
                  {hodCompSciInfo.name}
                </span>
                <span className="hidden sm:inline">•</span>
                <span>{hodCompSciInfo.titles}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {hodCompSciInfo.welcomeStatement}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10 text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                    Current Academic Session
                  </span>
                  <span className="text-sm font-black text-white">
                    {hodCompSciInfo.academicSession} ({hodCompSciInfo.activeSemester})
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10 text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">
                    Course Form Deadline
                  </span>
                  <span className="text-sm font-black text-amber-200">
                    {hodCompSciInfo.courseFormDeadline}
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10 text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                    Total Forms Received
                  </span>
                  <span className="text-sm font-black text-white">
                    {courseFormSubmissions.length} Submissions Logged
                  </span>
                </div>
              </div>
            </div>

            {/* HOD Officer Card */}
            <div className="shrink-0 flex flex-col items-center bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/15 w-full sm:w-72 text-center">
              <div className="relative mb-3">
                <img
                  src={hodCompSciInfo.photoUrl}
                  alt={hodCompSciInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-emerald-400/60 shadow-lg"
                />
                <span className="absolute -bottom-2 -right-2 bg-emerald-700 text-white p-1.5 rounded-xl border border-emerald-400">
                  <Cpu className="w-4 h-4 text-amber-300" />
                </span>
              </div>

              <h3 className="text-sm font-black text-white">
                {hodCompSciInfo.name}
              </h3>
              <p className="text-[11px] font-bold text-amber-300 mt-0.5">
                Head of Department
              </p>
              <p className="text-[10px] text-slate-300 mt-1">
                {hodCompSciInfo.position}
              </p>

              <div className="mt-3 pt-3 border-t border-white/10 w-full text-[11px] text-slate-300 space-y-1.5 text-left">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{hodCompSciInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{hodCompSciInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{hodCompSciInfo.officeHours}</span>
                </div>
              </div>

              {onNavigateToAdmin && (
                <button
                  onClick={onNavigateToAdmin}
                  className="mt-4 w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Manage HOD Desk (Admin CMS)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* NAVIGATION SUB-TABS */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSubTab('upload')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'upload'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <UploadCloud className="w-4 h-4 text-amber-400" />
            <span>Submit Course Form (Upload)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('track')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'track'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>Track Submission Status</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-black">
              {courseFormSubmissions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('profile')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'profile'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>HOD Profile & Labs</span>
          </button>

          <button
            onClick={() => setActiveSubTab('advisers')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'advisers'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Level Advisers Directory ({hodCompSciInfo.levelAdvisers.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('notices')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'notices'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>HOD Bulletins & Notices ({hodCompSciInfo.notices.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('templates')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'templates'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Download Official Forms</span>
          </button>
        </div>

        {/* TAB 1: SUBMIT COURSE FORM (UPLOAD DESK) */}
        {activeSubTab === 'upload' && (
          <div className="space-y-6">
            {submittedResult ? (
              /* Success Submission Card */
              <div className="bg-white p-8 rounded-3xl border border-emerald-200 shadow-md text-center max-w-2xl mx-auto space-y-6 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                    Submission Received • Under HOD Review
                  </span>
                  <h2 className="text-2xl font-black text-slate-900">
                    Course Registration Form Submitted Successfully!
                  </h2>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Your form for <strong>{submittedResult.session} ({submittedResult.semester})</strong> has been received by the Office of the HOD Computer Science. Your Level Adviser and HOD will inspect your registered credit units and endorsement signature.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-bold">Tracking Reference ID:</span>
                    <span className="font-black text-emerald-800 font-mono">{submittedResult.id}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-bold">Matriculation Number:</span>
                    <span className="font-bold text-slate-900">{submittedResult.matricNo}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-bold">Full Name:</span>
                    <span className="font-bold text-slate-900">{submittedResult.fullName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-bold">Level:</span>
                    <span className="font-bold text-slate-900">{submittedResult.level} Computer Science</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-bold">Total Credit Units:</span>
                    <span className="font-bold text-slate-900">{submittedResult.totalCredits} Units</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 font-bold">Uploaded Form Document:</span>
                    <span className="font-bold text-emerald-700 truncate max-w-[200px]">{submittedResult.fileName}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setTrackMatricQuery(submittedResult.matricNo);
                      setActiveSubTab('track');
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Track Clearance Status</span>
                  </button>

                  <button
                    onClick={handleResetForm}
                    className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Submit Another Form
                  </button>
                </div>
              </div>
            ) : (
              /* Main Submission Form */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left 2 Cols: Form */}
                <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <UploadCloud className="w-5 h-5 text-emerald-700" />
                        <span>Departmental Course Form Upload</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Submit your signed course registration sheet for HOD clearance and semester docket issuance.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAutofillDemo}
                      className="px-3.5 py-1.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                      title="Fill with test student credentials for demonstration"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Autofill Sample Student</span>
                    </button>
                  </div>

                  {uploadError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmitCourseForm} className="space-y-6">
                    
                    {/* Section 1: Student Information */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>1. Student Identification & Academic Level</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Matriculation Number *
                          </label>
                          <input
                            type="text"
                            required
                            value={matricNo}
                            onChange={(e) => setMatricNo(e.target.value.toUpperCase())}
                            placeholder="e.g. RMP/ND/CS/2024/0142"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 uppercase font-mono font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Student Full Name (As on Admission Slip) *
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Emmanuel Chukwuka Okafor"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Academic Level *
                          </label>
                          <select
                            value={level}
                            onChange={(e) => handleLevelChange(e.target.value as any)}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 bg-white font-bold"
                          >
                            <option value="ND I">ND I (National Diploma Year 1)</option>
                            <option value="ND II">ND II (National Diploma Year 2)</option>
                            <option value="HND I">HND I (Higher National Diploma Year 1)</option>
                            <option value="HND II">HND II (Higher National Diploma Year 2)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Current Session & Semester
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={`${hodCompSciInfo.academicSession} • ${hodCompSciInfo.activeSemester}`}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-100 text-slate-700 font-bold cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Student Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. +234 814 552 1190"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Student Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="student@renaissancemodern.edu.ng"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Course Selection & Credit Units */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                          <span>2. Registered Courses ({selectedCourses.length} Selected • {calculateTotalCredits()} Total Units)</span>
                        </h3>
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          NBTE Max: 24 Units
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500">
                        Check the courses listed on your official paper registration form. You can also add carryover or elective courses below:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                        {(COURSE_OPTIONS[level] || []).map((courseStr, idx) => {
                          const isChecked = selectedCourses.includes(courseStr);
                          return (
                            <label
                              key={idx}
                              className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                                isChecked
                                  ? 'bg-emerald-100/70 text-emerald-950 border border-emerald-300/80 font-bold'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleCourse(courseStr)}
                                className="w-4 h-4 text-emerald-700 rounded-sm focus:ring-emerald-600 cursor-pointer"
                              />
                              <span className="text-[11px] leading-tight">{courseStr}</span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Custom course add row */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={customCourseInput}
                          onChange={(e) => setCustomCourseInput(e.target.value)}
                          placeholder="Add elective / carryover course (e.g. MTH 121 - Calculus I (3 Units))"
                          className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCustomCourse();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomCourse}
                          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer shrink-0"
                        >
                          Add Course
                        </button>
                      </div>
                    </div>

                    {/* Section 3: File Upload Box */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <UploadCloud className="w-3.5 h-3.5 text-emerald-700" />
                          <span>3. Upload Endorsed Course Form Document *</span>
                        </h3>
                        <span className="text-[11px] text-slate-400">
                          PDF, PNG, or JPG (Max 10MB)
                        </span>
                      </div>

                      {/* Drag & drop or folder upload container */}
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all ${
                          uploadedFileDataUrl
                            ? 'border-emerald-500 bg-emerald-50/50'
                            : 'border-slate-300 hover:border-emerald-600 bg-slate-50/70'
                        }`}
                      >
                        {uploadedFileDataUrl ? (
                          <div className="space-y-3">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
                              <FileCheck className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-slate-900 break-all">
                                {uploadedFileName}
                              </h4>
                              <p className="text-[11px] text-emerald-700 font-bold">
                                Ready for submission • {uploadedFileSize}
                              </p>
                            </div>

                            <div className="flex items-center justify-center gap-3 pt-1">
                              <button
                                type="button"
                                onClick={() => setPreviewDocUrl(uploadedFileDataUrl)}
                                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Preview Upload</span>
                              </button>

                              <label className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer">
                                <UploadCloud className="w-3.5 h-3.5" />
                                <span>Replace File</span>
                                <input
                                  type="file"
                                  accept=".pdf,image/png,image/jpeg,image/webp"
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                              </label>

                              <button
                                type="button"
                                onClick={() => {
                                  setUploadedFileDataUrl('');
                                  setUploadedFileName('');
                                  setUploadedFileSize('');
                                }}
                                className="px-3 py-1.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="w-14 h-14 bg-emerald-100/80 text-emerald-800 rounded-3xl flex items-center justify-center mx-auto">
                              <UploadCloud className="w-7 h-7" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">
                                Drag & Drop your Course Registration Form here, or click to browse
                              </p>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                Select from your local computer or phone folder (Scanned PDF or clear camera photo)
                              </p>
                            </div>

                            <div>
                              <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs cursor-pointer transition-all">
                                <UploadCloud className="w-4 h-4" />
                                <span>Browse Folder & Select File</span>
                                <input
                                  type="file"
                                  accept=".pdf,image/png,image/jpeg,image/webp"
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section 4: Declaration & Submit */}
                    <div className="space-y-4 pt-2 border-t border-slate-100">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={declarationAccepted}
                          onChange={(e) => setDeclarationAccepted(e.target.checked)}
                          className="w-4 h-4 mt-0.5 text-emerald-700 rounded-sm focus:ring-emerald-600 cursor-pointer"
                        />
                        <span className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                          I declare that the courses selected above conform to the NBTE Computer Science curriculum for my level, and that this uploaded document has been duly verified and stamped by my Level Adviser.
                        </span>
                      </label>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto px-8 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Clock className="w-4 h-4 animate-spin" />
                              <span>Submitting to HOD Office...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Course Form to HOD Computer Science</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Right 1 Col: Guidelines & Checklist */}
                <div className="space-y-6">
                  {/* Instructions Card */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
                      <Info className="w-4 h-4 text-amber-500" />
                      <span>HOD Course Registration Directives</span>
                    </div>

                    <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      {hodCompSciInfo.courseRegistrationInstructions}
                    </div>

                    <div className="space-y-2 pt-1">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Mandatory Requirements Checklist:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {hodCompSciInfo.requiredSubmissionDocuments.map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Level Advisers Quick Callout */}
                  <div className="bg-emerald-900 text-white p-6 rounded-3xl shadow-xs space-y-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-300" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-emerald-200">
                        Need Form Endorsement?
                      </h4>
                    </div>
                    <p className="text-xs text-emerald-100 leading-relaxed">
                      Consult your designated Level Adviser in person or via telephone prior to final electronic upload.
                    </p>

                    <div className="space-y-2 pt-1">
                      {hodCompSciInfo.levelAdvisers.map((adv, idx) => (
                        <div key={idx} className="bg-white/10 p-2.5 rounded-xl text-xs space-y-0.5 border border-white/10">
                          <div className="flex justify-between items-center">
                            <span className="font-black text-amber-300">{adv.level}</span>
                            <span className="text-[10px] text-emerald-300">{adv.phone}</span>
                          </div>
                          <p className="font-bold text-white text-[11px] truncate">{adv.name}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveSubTab('advisers')}
                      className="w-full py-2 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1"
                    >
                      <span>View Full Adviser Directory</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TRACK SUBMISSION STATUS */}
        {activeSubTab === 'track' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="max-w-xl mx-auto text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-slate-900">
                Track Departmental Course Form Approval
              </h2>
              <p className="text-xs text-slate-500">
                Enter your Computer Science matriculation number to verify whether your form has been approved by HOD Engr. Dr. Chinedu Eze.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={trackMatricQuery}
                    onChange={(e) => {
                      setTrackMatricQuery(e.target.value);
                      setTrackSearched(true);
                    }}
                    placeholder="Enter Matric No (e.g. RMP/ND/CS/2024/0142)"
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 font-mono font-bold uppercase"
                  />
                </div>
                <button
                  onClick={() => setTrackSearched(true)}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
                >
                  Check Status
                </button>
              </div>

              {/* Sample matric quick chips */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-500">
                <span>Try sample matric:</span>
                {['RMP/ND/CS/2024/0142', 'RMP/ND/CS/2023/0088', 'RMP/HND/CS/2024/0021'].map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setTrackMatricQuery(m);
                      setTrackSearched(true);
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[10px] font-bold transition-colors cursor-pointer"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Display */}
            <div className="pt-4 border-t border-slate-100">
              {trackMatricQuery.trim() && trackingResults.length > 0 ? (
                <div className="space-y-4 max-w-3xl mx-auto">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Search Results ({trackingResults.length} Found)
                  </h3>

                  {trackingResults.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-5 sm:p-6 rounded-3xl border border-slate-200 bg-slate-50 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-slate-900">{sub.fullName}</h4>
                            <span className="text-[11px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                              {sub.matricNo}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {sub.level} Computer Science • {sub.session} ({sub.semester})
                          </p>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {sub.status === 'Approved' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Approved by HOD</span>
                            </span>
                          ) : sub.status === 'Requires Correction' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs border border-amber-300">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                              <span>Requires Correction</span>
                            </span>
                          ) : sub.status === 'Rejected' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 font-black text-xs border border-red-300">
                              <X className="w-3.5 h-3.5 text-red-600" />
                              <span>Rejected</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-black text-xs border border-blue-300">
                              <Clock className="w-3.5 h-3.5 text-blue-600" />
                              <span>Pending HOD Review</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Remarks & Clearance Details */}
                      {sub.hodRemarks && (
                        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1">
                          <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Official HOD Remarks / Endorsement:</span>
                          </span>
                          <p className="text-slate-700 italic">"{sub.hodRemarks}"</p>
                          {sub.reviewedAt && (
                            <span className="text-[10px] text-slate-400 block pt-0.5">
                              Reviewed on: {sub.reviewedAt}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Course Details */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                          Registered Courses ({sub.registeredCourses.length} Courses • {sub.totalCredits} Units):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sub.registeredCourses.map((c, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-medium"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-500">
                        <span>Submitted on: {sub.submittedAt}</span>
                        {sub.fileDataUrl && (
                          <button
                            type="button"
                            onClick={() => setPreviewDocUrl(sub.fileDataUrl)}
                            className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Uploaded Sheet ({sub.fileName})</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : trackSearched && trackMatricQuery.trim() ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">
                    No course form submission found for "{trackMatricQuery.trim()}"
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Please ensure the matriculation number was typed correctly, or submit your course form now using the upload tab.
                  </p>
                  <button
                    onClick={() => setActiveSubTab('upload')}
                    className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Course Form Now</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  Enter your matriculation number above and click "Check Status".
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: HOD PROFILE & LAB FACILITIES */}
        {activeSubTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row items-start gap-6 border-b border-slate-100 pb-6">
                <img
                  src={hodCompSciInfo.photoUrl}
                  alt={hodCompSciInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover border-4 border-emerald-100 shadow-md shrink-0"
                />

                <div className="space-y-3 flex-1">
                  <div>
                    <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                      Head of Department • Department of Computer Science
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                      {hodCompSciInfo.name}
                    </h2>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">
                      {hodCompSciInfo.titles}
                    </p>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200/60 text-xs text-emerald-950 space-y-1.5">
                    <span className="font-bold block uppercase tracking-wider text-[10px] text-emerald-800">
                      Department Vision & Mission
                    </span>
                    <p className="leading-relaxed">{hodCompSciInfo.departmentMission}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{hodCompSciInfo.officeLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{hodCompSciInfo.officeHours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{hodCompSciInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{hodCompSciInfo.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Facilities & Computing Labs */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  <span>Department Computing Facilities & Research Laboratories</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      01
                    </div>
                    <h4 className="text-xs font-black text-slate-900">Software Development & AI Lab</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      60 high-performance workstations configured for Full-Stack Web, Python Data Science, Java OOP, and AI model prototyping with high-speed fiber internet.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      02
                    </div>
                    <h4 className="text-xs font-black text-slate-900">Cisco Networking & Cyber Defense Lab</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Equipped with physical Cisco routers, managed Gigabit switches, patch panels, and Linux firewall testbeds for hands-on network administration.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      03
                    </div>
                    <h4 className="text-xs font-black text-slate-900">Hardware & Microcomputing Workshop</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Dedicated diagnostics suites for motherboard repair, component soldering, Arduino/Raspberry Pi IoT automation, and peripheral troubleshooting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LEVEL ADVISERS DIRECTORY */}
        {activeSubTab === 'advisers' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Computer Science Level Advisers Directory</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Level Advisers inspect course workloads, verify minimum and maximum credit units, and provide academic mentorship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hodCompSciInfo.levelAdvisers.map((adv, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl border border-slate-200 bg-slate-50 space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-800 text-white text-[10px] font-black uppercase tracking-wider">
                        {adv.level} Course Adviser
                      </span>
                      <h3 className="text-sm font-black text-slate-900 mt-2">
                        {adv.name}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-700">
                        {adv.titles}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="font-bold">{adv.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{adv.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{adv.office}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: HOD BULLETINS & NOTICES */}
        {activeSubTab === 'notices' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <span>Departmental Notices & Official Bulletins</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Direct communications from the HOD Computer Science regarding academic deadlines, labs, and exams.
              </p>
            </div>

            <div className="space-y-3">
              {hodCompSciInfo.notices.map((notice) => (
                <div
                  key={notice.id}
                  className={`p-5 rounded-3xl border transition-all ${
                    notice.urgent
                      ? 'bg-amber-50/70 border-amber-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-800 text-white">
                        {notice.category}
                      </span>
                      {notice.urgent && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600 text-white animate-pulse">
                          Urgent Notice
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">
                      {notice.date}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DOWNLOAD OFFICIAL FORMS */}
        {activeSubTab === 'templates' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-700" />
                <span>Official Course Forms & Departmental Handbooks</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Download blank copies of official departmental documents, fill them out, and upload them here.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-bold mb-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900">
                    Blank Departmental Course Registration Form (PDF)
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Standard 2-page NBTE course registration sheet for ND and HND students.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // Trigger download of a sample course form file
                    const blob = new Blob(
                      [
                        `RENAISSANCE MODERN POLYTECHNIC, MBAUKWU\nDEPARTMENT OF COMPUTER SCIENCE\nOFFICIAL COURSE REGISTRATION FORM\n\nStudent Matric No: _________________________\nFull Name: _________________________________\nLevel: [ ] ND I   [ ] ND II   [ ] HND I   [ ] HND II\nSession: ${hodCompSciInfo.academicSession}\nSemester: ${hodCompSciInfo.activeSemester}\n\nList of Courses:\n1. __________________________________\n2. __________________________________\n3. __________________________________\n4. __________________________________\n5. __________________________________\n\nLevel Adviser Signature: __________________\nHOD Clearance Stamp: _____________________`
                      ],
                      { type: 'text/plain' }
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'RMP_ComputerScience_CourseRegistrationForm_Blank.txt';
                    a.click();
                  }}
                  className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Form (Template)</span>
                </button>
              </div>

              <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center font-bold mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900">
                    Computer Science Student Academic Handbook (2024-2026)
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Detailed curriculum outlines, grading scales, laboratory codes of conduct, and graduation requirements.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const blob = new Blob(
                      [
                        `RENAISSANCE MODERN POLYTECHNIC, MBAUKWU\nDEPARTMENT OF COMPUTER SCIENCE\nACADEMIC HANDBOOK & NBTE CURRICULUM HIGHLIGHTS\n\nHead of Department: ${hodCompSciInfo.name}\nMission: ${hodCompSciInfo.departmentMission}\n\nGrading Scheme:\n75 - 100% : A (4.00)\n70 - 74%  : AB (3.50)\n65 - 69%  : B (3.25)\n60 - 64%  : BC (3.00)\n55 - 59%  : C (2.75)\n50 - 54%  : CD (2.50)\n45 - 49%  : D (2.25)\n40 - 44%  : E (2.00)\n00 - 39%  : F (0.00)`
                      ],
                      { type: 'text/plain' }
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'RMP_ComputerScience_StudentHandbook.txt';
                    a.click();
                  }}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Handbook</span>
                </button>
              </div>

              <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-2xl flex items-center justify-center font-bold mb-3">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900">
                    SIWES / Industrial Attachment Defense Guidelines
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Guidance for returning ND II students on ITF logbook formatting and technical presentation defense.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const blob = new Blob(
                      [
                        `RENAISSANCE MODERN POLYTECHNIC, MBAUKWU\nDEPARTMENT OF COMPUTER SCIENCE\nSIWES DEFENSE GUIDELINES\n\nCoordinator: Mrs. Chioma A. Nnamdi\nRequirements:\n1. ITF Form 8 signed and stamped\n2. Weekly progress logbook with supervisor signature\n3. Comprehensive 20-page technical report\n4. Powerpoint slide presentation (10 minutes max)`
                      ],
                      { type: 'text/plain' }
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'RMP_ComputerScience_SIWES_Guidelines.txt';
                    a.click();
                  }}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download SIWES Guide</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      {previewDocUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <h3 className="text-sm font-black text-slate-900">
                  Uploaded Course Form Preview
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDocUrl(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center max-h-[70vh] border border-slate-200">
              {previewDocUrl.startsWith('data:image') || previewDocUrl.startsWith('http') ? (
                <img
                  src={previewDocUrl}
                  alt="Uploaded Course Registration Form"
                  className="max-h-[65vh] w-auto object-contain"
                />
              ) : (
                <div className="p-8 text-center space-y-2">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">Document Uploaded Successfully</p>
                  <p className="text-[11px] text-slate-500">PDF or Scanned File Document</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setPreviewDocUrl(null)}
                className="px-5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
