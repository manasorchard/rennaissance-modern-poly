import React, { useState } from 'react';
import { NavSection } from './types';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CourseCatalog } from './components/CourseCatalog';
import { StudentPortal } from './components/StudentPortal';
import { CampusGallery } from './components/CampusGallery';
import { CampusTourSection } from './components/CampusTourSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdmissionsModal } from './components/AdmissionsModal';
import { AdminPortal } from './components/AdminPortal';
import { RegistrarOfficeSection } from './components/RegistrarOfficeSection';
import { HodCompSciSection } from './components/HodCompSciSection';
import { ProprietorSection } from './components/ProprietorSection';
import { PolyCouncilSection } from './components/PolyCouncilSection';
import { AcademicNewsTicker } from './components/AcademicNewsTicker';
import { ArrowLeft, BookOpen, GraduationCap, Image as GalleryIcon, FileText, Cpu, Award, Users } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [isAdmissionsOpen, setIsAdmissionsOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState('');

  const handleOpenAdmissions = (courseTitle: string = '') => {
    setPreselectedCourse(courseTitle);
    setIsAdmissionsOpen(true);
  };

  const handleNavigate = (section: NavSection) => {
    if (section === 'admissions') {
      setIsAdmissionsOpen(true);
      return;
    }
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DataProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
        {/* Primary Responsive Navigation */}
        <Navbar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenAdmissions={() => handleOpenAdmissions()}
          onOpenPortal={() => handleNavigate('portal')}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {activeSection === 'admin' ? (
            /* Admin & Web Content Management CMS */
            <AdminPortal onReturnToSite={() => handleNavigate('home')} />
          ) : activeSection === 'proprietor' ? (
            /* Office of the Founder & Proprietor */
            <div>
              <div className="bg-emerald-950 text-emerald-100 py-3 px-4 text-xs font-semibold border-b border-emerald-800">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <button
                    onClick={() => handleNavigate('home')}
                    className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                  </button>
                  <span className="hidden sm:inline-block">
                    Office of the Founder & Proprietor • Renaissance Modern Polytechnic, Mbaukwu
                  </span>
                  <button
                    onClick={() => handleNavigate('council')}
                    className="text-amber-300 hover:text-amber-200 underline font-bold"
                  >
                    View Governing Council & Gallery
                  </button>
                </div>
              </div>

              <ProprietorSection
                onOpenAdmissions={() => handleOpenAdmissions()}
                onNavigateToCouncil={() => handleNavigate('council')}
                onNavigateToRegistrar={() => handleNavigate('registrar')}
                onNavigateToAdmin={() => handleNavigate('admin')}
              />
            </div>
          ) : activeSection === 'council' ? (
            /* Governing Council Members & Gallery */
            <div>
              <div className="bg-emerald-950 text-emerald-100 py-3 px-4 text-xs font-semibold border-b border-emerald-800">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <button
                    onClick={() => handleNavigate('home')}
                    className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                  </button>
                  <span className="hidden sm:inline-block">
                    The 1st Governing Council • Profiles & Documentary Photo Archive
                  </span>
                  <button
                    onClick={() => handleNavigate('proprietor')}
                    className="text-amber-300 hover:text-amber-200 underline font-bold"
                  >
                    Office of the Proprietor
                  </button>
                </div>
              </div>

              <PolyCouncilSection
                onOpenAdmissions={() => handleOpenAdmissions()}
                onNavigateToProprietor={() => handleNavigate('proprietor')}
                onNavigateToRegistrar={() => handleNavigate('registrar')}
                onNavigateToAdmin={() => handleNavigate('admin')}
              />
            </div>
          ) : activeSection === 'portal' ? (
            /* Focused Student Portal View */
            <div>
              {/* Quick Banner to return to home */}
              <div className="bg-emerald-900 text-emerald-100 py-3 px-4 text-xs font-semibold border-b border-emerald-800">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <button
                    onClick={() => handleNavigate('home')}
                    className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Main Website</span>
                  </button>
                  <span className="hidden sm:inline-block">
                    Renaissance Modern Polytechnic Mbaukwu • Student Information System (SIS)
                  </span>
                  <button
                    onClick={() => handleOpenAdmissions()}
                    className="text-amber-300 hover:text-amber-200 underline font-bold"
                  >
                    Need Admission? Apply Here
                  </button>
                </div>
              </div>

              {/* Student Portal Interface */}
              <StudentPortal />
            </div>
          ) : activeSection === 'courses' ? (
          /* Focused Course Catalogs View */
          <div>
            <div className="bg-emerald-900 text-emerald-100 py-3 px-4 text-xs font-semibold border-b border-emerald-800">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
                <span className="hidden sm:inline-block">
                  All 24 NBTE-Accredited ND, HND & Vocational Innovation Programs
                </span>
                <button
                  onClick={() => handleNavigate('portal')}
                  className="text-amber-300 hover:text-amber-200 underline font-bold"
                >
                  Existing Student? Log in
                </button>
              </div>
            </div>

            <CourseCatalog onSelectCourseForAdmission={handleOpenAdmissions} />
          </div>
        ) : activeSection === 'gallery' ? (
          /* Focused Events & Gallery View */
          <div>
            <div className="bg-emerald-900 text-emerald-100 py-3 px-4 text-xs font-semibold border-b border-emerald-800">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
                <span className="hidden sm:inline-block">
                  Campus Life, Academic Convocations & Cultural Heritage
                </span>
                <button
                  onClick={() => handleOpenAdmissions()}
                  className="text-amber-300 hover:text-amber-200 underline font-bold"
                >
                  Join Us • Apply Now
                </button>
              </div>
            </div>

            <CampusGallery />
          </div>
        ) : activeSection === 'about' ? (
          /* Focused Facilities View */
          <div>
            <div className="bg-emerald-900 text-emerald-100 py-3 px-4 text-xs font-semibold border-b border-emerald-800">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
                <span className="hidden sm:inline-block">
                  Engineering Workshops, Solar Labs & ICT Centers in Mbaukwu
                </span>
                <button
                  onClick={() => handleNavigate('courses')}
                  className="text-amber-300 hover:text-amber-200 underline font-bold"
                >
                  View Course List
                </button>
              </div>
            </div>

            <CampusTourSection
              onExploreCourses={() => handleNavigate('courses')}
              onApplyNow={() => handleOpenAdmissions()}
            />
          </div>
        ) : activeSection === 'registrar' ? (
          /* Focused Office of the Registrar View */
          <div>
            <div className="bg-emerald-900 text-emerald-100 py-3 px-4 text-xs font-semibold border-b border-emerald-800">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
                <span className="hidden sm:inline-block">
                  Central Registry Administration • Rev'd Can James, Polytechnic Registrar
                </span>
                <button
                  onClick={() => handleNavigate('admin')}
                  className="text-amber-300 hover:text-amber-200 underline font-bold"
                >
                  Edit Registry Information (CMS)
                </button>
              </div>
            </div>

            <RegistrarOfficeSection
              onOpenAdmissions={() => handleOpenAdmissions()}
              onOpenPortal={() => handleNavigate('portal')}
              onExploreCourses={() => handleNavigate('courses')}
              onNavigateToAdmin={() => handleNavigate('admin')}
            />
          </div>
        ) : activeSection === 'hod_compsci' ? (
          /* Focused Office of the HOD Computer Science & Course Form Upload View */
          <div>
            <div className="bg-emerald-900 text-emerald-100 py-3 px-4 text-xs font-semibold border-b border-emerald-800">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
                <span className="hidden sm:inline-block">
                  Department of Computer Science • Office of the HOD & Course Form Clearance Desk
                </span>
                <button
                  onClick={() => handleNavigate('admin')}
                  className="text-amber-300 hover:text-amber-200 underline font-bold"
                >
                  Edit HOD Desk & Approvals (CMS)
                </button>
              </div>
            </div>

            <HodCompSciSection
              onOpenPortal={() => handleNavigate('portal')}
              onExploreCourses={() => handleNavigate('courses')}
              onNavigateToAdmin={() => handleNavigate('admin')}
            />
          </div>
        ) : activeSection === 'contact' ? (
          /* Focused Contact View */
          <div>
            <div className="bg-emerald-900 text-emerald-100 py-3 px-4 text-xs font-semibold border-b border-emerald-800">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('home')}
                  className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 font-bold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </button>
                <span className="hidden sm:inline-block">
                  Mbaukwu Campus Location & Official Communication Directory
                </span>
                <button
                  onClick={() => handleNavigate('portal')}
                  className="text-amber-300 hover:text-amber-200 underline font-bold"
                >
                  Student Portal
                </button>
              </div>
            </div>

            <ContactSection />
          </div>
        ) : (
          /* Full Comprehensive Home View */
          <div className="space-y-0">
            {/* Hero Section */}
            <HeroSection
              onNavigate={handleNavigate}
              onOpenAdmissions={() => handleOpenAdmissions()}
              onOpenPortal={() => handleNavigate('portal')}
            />

            {/* Academic News Ticker - Real-Time Updates, Admission Deadlines, Exam Dates & Notice Board Alerts */}
            <AcademicNewsTicker
              onOpenAdmissions={() => handleOpenAdmissions()}
              onOpenPortal={() => handleNavigate('portal')}
              onNavigateToCourses={() => handleNavigate('courses')}
              onNavigateToRegistrar={() => handleNavigate('registrar')}
              onNavigateToHodDesk={() => handleNavigate('hod_compsci')}
            />

            {/* Course Catalogs Section */}
            <CourseCatalog onSelectCourseForAdmission={handleOpenAdmissions} />

            {/* High-Impact Student Portal Showcase Banner */}
            <section className="py-14 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white relative overflow-hidden border-y border-emerald-800/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4 text-amber-400" />
                      Integrated Student Portal
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      Semester Course Registration, Result Checking & Remita Payments
                    </h2>

                    <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                      Renaissance Modern Polytechnic provides a complete, modern digital portal where scholars register semester courses, verify verified grade points (CGPA), download transcripts, generate official Remita invoices, and access lecture timetables.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        id="portal-banner-launch-btn"
                        onClick={() => handleNavigate('portal')}
                        className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 inline-flex items-center gap-2"
                      >
                        <GraduationCap className="w-4 h-4 text-slate-950" />
                        <span>Launch Student Portal</span>
                      </button>

                      <button
                        onClick={() => handleNavigate('courses')}
                        className="px-5 py-3 rounded-xl text-xs font-semibold text-emerald-200 hover:text-white hover:bg-white/10 border border-emerald-500/30 transition-colors"
                      >
                        Explore Degree & Diploma Options
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-slate-800/70 p-6 rounded-2xl border border-emerald-500/30 backdrop-blur-sm space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Live Student Portal Features
                    </p>
                    <ul className="space-y-2 text-xs text-slate-200">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>Official Digital Student ID Card with QR barcode</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>NBTE Standard Semester Results & GPA computation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>Course add/drop with 24-unit credit limiter</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>Remita Retrieval Reference (RRR) receipts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>Interactive Graduation CGPA Target Predictor</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Office of the Registrar Institutional Section */}
            <RegistrarOfficeSection
              onOpenAdmissions={() => handleOpenAdmissions()}
              onOpenPortal={() => handleNavigate('portal')}
              onExploreCourses={() => handleNavigate('courses')}
              onNavigateToAdmin={() => handleNavigate('admin')}
            />

            {/* Department of Computer Science & Course Form Upload Desk Spotlight */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden border-y border-emerald-950">
              <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-8 sm:p-10 rounded-3xl border border-emerald-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="space-y-4 flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                      <Cpu className="w-3.5 h-3.5 text-amber-400" />
                      <span>Department of Computer Science • Course Clearance Portal</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      HOD Office & Student Course Form Upload
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      All ND I, ND II, HND I, and HND II Computer Science scholars can now upload their signed departmental course registration forms online directly to Head of Department Engr. Dr. Chinedu Eze for official review, clearance verification, and exam docket stamping.
                    </p>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                      <button
                        onClick={() => handleNavigate('hod_compsci')}
                        className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        <Cpu className="w-4 h-4" />
                        <span>Upload Course Form Now</span>
                      </button>

                      <button
                        onClick={() => handleNavigate('hod_compsci')}
                        className="px-5 py-3 rounded-xl text-xs font-bold text-emerald-200 hover:text-white hover:bg-white/10 border border-emerald-500/30 transition-colors cursor-pointer"
                      >
                        View HOD Notices & Level Advisers
                      </button>
                    </div>
                  </div>

                  <div className="shrink-0 bg-slate-900/90 p-5 rounded-2xl border border-emerald-500/20 text-center w-full sm:w-72 space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-amber-400/80 shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                        alt="Engr. Dr. Chinedu Eze"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">Head of Department</span>
                      <h4 className="text-sm font-black text-white mt-0.5">Engr. Dr. Chinedu Eze</h4>
                      <p className="text-[11px] text-slate-300">MNCS, MCPN, FIMC</p>
                    </div>
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Clearance Desk Online & Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Institutional Leadership & Governance Showcase */}
            <section className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-100 border-b border-slate-200">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center max-w-3xl mx-auto space-y-2">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                    Apex Institutional Leadership
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    The Proprietor & Governing Council
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Dedicated visionary governance steering Renaissance Modern Polytechnic towards academic excellence, technological self-reliance, and international accreditation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Proprietor Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-900 border border-amber-300 inline-flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          Founder & Proprietor
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          Executive Board
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 bg-slate-900 shadow-xs">
                          <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                            alt="Chief Dr. Augustine N. Ezenwaka"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg group-hover:text-amber-700 transition-colors">
                            Chief Dr. Augustine N. Ezenwaka
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            Akwa-Akwa of Mbaukwu • Proprietor & Chancellor
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        Visionary industrialist and philanthropist dedicated to providing affordable, industry-calibrated technical education. Discover the founding history, institutional philosophy, scholarship grants, and complete profile dossier.
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleNavigate('proprietor')}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Award className="w-4 h-4" />
                        <span>View Proprietor Tab & Profile</span>
                      </button>

                      <button
                        onClick={() => handleNavigate('proprietor')}
                        className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                      >
                        Read Vision & Story →
                      </button>
                    </div>
                  </div>

                  {/* Council Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-900 border border-emerald-200 inline-flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-emerald-700" />
                          Polytechnic Council
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          1st Governing Council
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-600 shrink-0 bg-slate-900 shadow-xs">
                          <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
                            alt="Prof. Boniface C. Egboka"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors">
                            The 1st Governing Council
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            Chaired by Prof. Boniface C. Egboka, FAS
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        Explore the statutory governing organ of the polytechnic. Browse documentary photos of council sittings, accreditation tours, and matriculations, plus individual member profiles with committee portfolios and qualifications.
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleNavigate('council')}
                        className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Users className="w-4 h-4" />
                        <span>View Council Gallery & Profiles</span>
                      </button>

                      <button
                        onClick={() => handleNavigate('council')}
                        className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                      >
                        Browse Photos →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Vibrant Campus Events Gallery */}
            <CampusGallery />

            {/* Campus Tour & Facilities Section */}
            <CampusTourSection
              onExploreCourses={() => handleNavigate('courses')}
              onApplyNow={() => handleOpenAdmissions()}
            />

            {/* Contact & Map Section */}
            <ContactSection />
          </div>
        )}
      </main>

      {/* Institutional Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPortal={() => handleNavigate('portal')}
        onOpenAdmissions={() => handleOpenAdmissions()}
      />

      {/* 2024/2025 Admissions Application Modal */}
      <AdmissionsModal
        isOpen={isAdmissionsOpen}
        onClose={() => setIsAdmissionsOpen(false)}
        preselectedCourse={preselectedCourse}
      />
    </div>
  </DataProvider>
);
}
