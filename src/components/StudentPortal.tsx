import React, { useState } from 'react';
import { 
  UserCheck, 
  GraduationCap, 
  BookOpen, 
  CreditCard, 
  Calendar, 
  Award, 
  Download, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  QrCode, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Trash2, 
  ChevronRight,
  TrendingUp,
  MapPin,
  HelpCircle,
  FolderUp,
  Camera,
  X
} from 'lucide-react';
import { DEMO_STUDENTS } from '../data/polytechnicData';
import { StudentProfile, RegisteredCourse, PaymentReceipt } from '../types';
import { PolytechnicLogo } from './PolytechnicLogo';
import { EasyPhotoUpload } from './EasyPhotoUpload';

type PortalTab = 'overview' | 'courses' | 'results' | 'fees' | 'idcard' | 'timetable' | 'cgpa-calc';

export const StudentPortal: React.FC = () => {
  const [selectedMatric, setSelectedMatric] = useState<string>('RMP/2024/ND/CS/0842');
  const [activeTab, setActiveTab] = useState<PortalTab>('overview');
  const [loginInput, setLoginInput] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [tempPhoto, setTempPhoto] = useState('');

  // Editable state for active student
  const [studentData, setStudentData] = useState<Record<string, StudentProfile>>(DEMO_STUDENTS);

  const currentStudent = studentData[selectedMatric] || Object.values(studentData)[0];

  // Course registration state
  const [availableElectives, setAvailableElectives] = useState([
    { code: 'GNS 221', title: 'African History & Cultural Ethics', creditUnits: 2, lecturer: 'Dr. C. Nwosu', lectureHall: 'Hall C', schedule: 'Tuesdays 3:00 PM' },
    { code: 'COM 215', title: 'Introduction to Mobile Application Development', creditUnits: 3, lecturer: 'Engr. D. K. Eze', lectureHall: 'Software Lab', schedule: 'Fridays 8:00 AM' },
    { code: 'SOL 101', title: 'Solar Energy Basics & Battery Systems', creditUnits: 2, lecturer: 'Engr. K. C. Ibe', lectureHall: 'Solar Workshop', schedule: 'Mondays 4:00 PM' },
  ]);

  // Payment simulator state
  const [paymentSuccessNotice, setPaymentSuccessNotice] = useState<string | null>(null);

  // CGPA Predictor state
  const [targetGPA, setTargetGPA] = useState<number>(3.8);
  const [remainingUnits, setRemainingUnits] = useState<number>(40);

  // Handle student login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMatric = loginInput.trim().toUpperCase();
    if (studentData[cleanMatric]) {
      setSelectedMatric(cleanMatric);
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Matriculation Number. Please use one of the demo test accounts.');
    }
  };

  // Add course to student registration
  const handleAddCourse = (course: { code: string; title: string; creditUnits: number; lecturer: string; lectureHall: string; schedule: string }) => {
    const totalCurrentUnits = currentStudent.registeredCourses.reduce((acc, c) => acc + c.creditUnits, 0);
    if (totalCurrentUnits + course.creditUnits > 24) {
      alert('Cannot register course: Maximum allowable credit load per semester is 24 units!');
      return;
    }

    const newCourse: RegisteredCourse = {
      ...course,
      status: 'Registered',
    };

    setStudentData((prev) => ({
      ...prev,
      [selectedMatric]: {
        ...prev[selectedMatric],
        registeredCourses: [...prev[selectedMatric].registeredCourses, newCourse],
      },
    }));

    setAvailableElectives((prev) => prev.filter((c) => c.code !== course.code));
  };

  // Remove course from registration
  const handleDropCourse = (courseCode: string) => {
    const dropped = currentStudent.registeredCourses.find((c) => c.code === courseCode);
    if (!dropped) return;

    setStudentData((prev) => ({
      ...prev,
      [selectedMatric]: {
        ...prev[selectedMatric],
        registeredCourses: prev[selectedMatric].registeredCourses.filter((c) => c.code !== courseCode),
      },
    }));

    setAvailableElectives((prev) => [
      ...prev,
      {
        code: dropped.code,
        title: dropped.title,
        creditUnits: dropped.creditUnits,
        lecturer: dropped.lecturer,
        lectureHall: dropped.lectureHall,
        schedule: dropped.schedule,
      },
    ]);
  };

  // Simulate Fee Payment
  const handlePayFee = (refNo: string) => {
    setStudentData((prev) => {
      const student = prev[selectedMatric];
      const updatedPayments: PaymentReceipt[] = student.paymentRecords.map((p) => {
        if (p.referenceNo === refNo) {
          return {
            ...p,
            status: 'Paid',
            datePaid: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            channel: 'Remita',
          };
        }
        return p;
      });

      return {
        ...prev,
        [selectedMatric]: {
          ...student,
          paymentRecords: updatedPayments,
        },
      };
    });

    setPaymentSuccessNotice(`Payment successfully processed via Remita (RRR: ${refNo})! Official bursary receipt is now available.`);
    setTimeout(() => setPaymentSuccessNotice(null), 6000);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentTotalUnits = currentStudent.registeredCourses.reduce((acc, c) => acc + c.creditUnits, 0);

  if (!isLoggedIn) {
    return (
      <section id="student-portal" className="py-16 bg-slate-100 min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <PolytechnicLogo size="lg" showText={false} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Renaissance Student Portal
            </h2>
            <p className="text-xs text-slate-500">
              Enter your official matriculation number and student PIN to access course registration, results & payments.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Matriculation / UTME Number
              </label>
              <input
                type="text"
                required
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                placeholder="e.g. RMP/2024/ND/CS/0842"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Portal Password / PIN
              </label>
              <input
                type="password"
                required
                value={loginPin}
                onChange={(e) => setLoginPin(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow transition-colors"
            >
              Log In to Portal
            </button>
          </form>

          {/* Quick Demo Login Switcher */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Or Instant Demo Sign-In:
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedMatric('RMP/2024/ND/CS/0842');
                  setIsLoggedIn(true);
                }}
                className="w-full py-2 px-3 text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg border border-emerald-200 flex items-center justify-between"
              >
                <span>Chioma Okonkwo (ND II Computer Science)</span>
                <span className="text-[10px] bg-emerald-200 px-1.5 py-0.5 rounded font-bold">Log in</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedMatric('RMP/2024/HND/EE/0319');
                  setIsLoggedIn(true);
                }}
                className="w-full py-2 px-3 text-xs font-semibold bg-amber-50 text-amber-900 hover:bg-amber-100 rounded-lg border border-amber-200 flex items-center justify-between"
              >
                <span>Emeka Eze (HND I Electrical Eng.)</span>
                <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded font-bold">Log in</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="student-portal-active" className="py-10 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Portal Header Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div 
              onClick={() => {
                setTempPhoto(currentStudent.avatarUrl);
                setIsEditingPhoto(true);
              }}
              className="relative cursor-pointer group"
              title="Click to upload student photo from folder"
            >
              <img
                src={currentStudent.avatarUrl}
                alt={currentStudent.fullName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600 shadow-xs group-hover:opacity-85 transition-opacity"
              />
              <span className="absolute inset-0 rounded-2xl bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                <Camera className="w-5 h-5" />
              </span>
              <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-700 text-white rounded-full text-[10px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">
                  {currentStudent.fullName}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {currentStudent.level}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {currentStudent.matricNo}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {currentStudent.department} • {currentStudent.school}
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                Current Session: {currentStudent.session} ({currentStudent.currentSemester})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
            {/* Quick Demo Switcher */}
            <div className="flex items-center gap-1.5 text-xs bg-slate-50 p-1.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase px-1">Switch:</span>
              <button
                onClick={() => setSelectedMatric('RMP/2024/ND/CS/0842')}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all ${
                  selectedMatric === 'RMP/2024/ND/CS/0842'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                Chioma (ND II)
              </button>
              <button
                onClick={() => setSelectedMatric('RMP/2024/HND/EE/0319')}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all ${
                  selectedMatric === 'RMP/2024/HND/EE/0319'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                Emeka (HND I)
              </button>
            </div>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors inline-flex items-center gap-1 text-xs font-semibold"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Global Notification Banner if any */}
        {paymentSuccessNotice && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{paymentSuccessNotice}</span>
            </div>
            <button
              onClick={() => setPaymentSuccessNotice(null)}
              className="text-emerald-700 hover:text-emerald-950 font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Portal Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard', icon: GraduationCap },
            { id: 'courses', label: 'Course Registration', icon: BookOpen, badge: `${currentTotalUnits} Units` },
            { id: 'results', label: 'Results & Transcript', icon: Award },
            { id: 'fees', label: 'Fees & Remita Receipts', icon: CreditCard },
            { id: 'idcard', label: 'Digital Student ID', icon: QrCode },
            { id: 'timetable', label: 'Lecture Timetable', icon: Calendar },
            { id: 'cgpa-calc', label: 'CGPA Predictor', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`portal-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as PortalTab)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive ? 'bg-emerald-900 text-emerald-100' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Cumulative GPA (CGPA)
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-800">
                    {currentStudent.cgpa.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-slate-500">/ 4.00</span>
                </div>
                <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {currentStudent.cgpa >= 3.5 ? 'Distinction Track' : 'Upper Credit'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Registered Units
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">
                    {currentTotalUnits}
                  </span>
                  <span className="text-xs font-bold text-slate-500">/ 24 Max</span>
                </div>
                <p className="text-xs font-semibold text-slate-500">
                  {currentStudent.registeredCourses.length} Registered Courses
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Academic Standing
                </p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {currentStudent.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Eligible for 2024/2025 Examinations
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  School Fees Status
                </p>
                <div className="flex items-center gap-2">
                  {currentStudent.paymentRecords.some((p) => p.status === 'Pending') ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                      Partially Paid (1 Pending)
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      Fully Cleared
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setActiveTab('fees')}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-bold underline block mt-1"
                >
                  Manage Invoices
                </button>
              </div>
            </div>

            {/* Quick Overview Split: Current Courses & Announcements */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Registered Courses Quick View */}
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    Current Semester Registered Courses
                  </h3>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                  >
                    Manage / Add Courses <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Course Code</th>
                        <th className="py-2.5 px-3">Course Title</th>
                        <th className="py-2.5 px-3">Units</th>
                        <th className="py-2.5 px-3">Lecturer</th>
                        <th className="py-2.5 px-3">Venue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentStudent.registeredCourses.map((c, i) => (
                        <tr key={i} className="hover:bg-slate-50/80">
                          <td className="py-3 px-3 font-bold text-emerald-900">{c.code}</td>
                          <td className="py-3 px-3 font-medium text-slate-900">{c.title}</td>
                          <td className="py-3 px-3 font-bold text-slate-800">{c.creditUnits}</td>
                          <td className="py-3 px-3 text-slate-600">{c.lecturer}</td>
                          <td className="py-3 px-3 text-slate-600">{c.lectureHall}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions & Academic Ticker */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Quick Student Services
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveTab('idcard')}
                      className="w-full p-2.5 bg-slate-50 hover:bg-emerald-50 rounded-xl text-left text-xs font-semibold text-slate-700 flex items-center justify-between border border-slate-200 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-emerald-700" />
                        View & Print Student ID
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    <button
                      onClick={() => setActiveTab('results')}
                      className="w-full p-2.5 bg-slate-50 hover:bg-emerald-50 rounded-xl text-left text-xs font-semibold text-slate-700 flex items-center justify-between border border-slate-200 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-700" />
                        Statement of Results Slip
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    <button
                      onClick={() => setActiveTab('timetable')}
                      className="w-full p-2.5 bg-slate-50 hover:bg-emerald-50 rounded-xl text-left text-xs font-semibold text-slate-700 flex items-center justify-between border border-slate-200 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-700" />
                        Weekly Class Timetable
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Dean's Notice */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 text-white space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    Academic Advisory Notice
                  </p>
                  <p className="text-xs leading-relaxed text-emerald-100">
                    Continuous Assessment (CA) tests for the 1st semester commence on the 5th week of lectures. Students must attain minimum 75% workshop & class attendance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COURSE REGISTRATION */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Course Registration – 1st Semester 2024/2025
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Ensure all departmental core courses and selected electives are approved by your Level Academic Adviser.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-bold uppercase">Total Registered Units</p>
                  <p className="text-lg font-black text-emerald-800">{currentTotalUnits} / 24 Max</p>
                </div>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Course Slip
                </button>
              </div>
            </div>

            {/* Currently Enrolled Courses */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Registered Courses List ({currentStudent.registeredCourses.length})
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 font-bold uppercase text-[10px] tracking-wider text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Code</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Units</th>
                      <th className="py-3 px-4">Lecturer</th>
                      <th className="py-3 px-4">Schedule</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentStudent.registeredCourses.map((c, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-black text-emerald-900">{c.code}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{c.title}</td>
                        <td className="py-3 px-4 font-bold">{c.creditUnits}</td>
                        <td className="py-3 px-4 text-slate-600">{c.lecturer}</td>
                        <td className="py-3 px-4 text-slate-600">{c.schedule}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDropCourse(c.code)}
                            className="text-red-600 hover:text-red-800 text-xs font-bold inline-flex items-center gap-1 p-1 hover:bg-red-50 rounded"
                            title="Drop this course"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Drop</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Available Additional Electives */}
            {availableElectives.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-emerald-700" />
                  Available Electives & Open Departmental Modules
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {availableElectives.map((elec, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-emerald-800">{elec.code}</span>
                          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-200">
                            {elec.creditUnits} Units
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-900">{elec.title}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{elec.lecturer} • {elec.schedule}</p>
                      </div>
                      <button
                        onClick={() => handleAddCourse(elec)}
                        className="w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add to Registration
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: RESULTS & TRANSCRIPT */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Semester Examination Results & Academic Transcript
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Official statement of academic results validated by the Academic Board of Renaissance Modern Polytechnic Mbaukwu.
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" />
                Download Statement of Result
              </button>
            </div>

            {/* Results History Accordions / Tables */}
            <div className="space-y-6">
              {currentStudent.resultsHistory.map((res, rIdx) => (
                <div key={rIdx} className="rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                  <div className="bg-emerald-900 text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider">{res.session}</p>
                      <h4 className="text-base font-black text-white">{res.semester}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <span className="text-emerald-300">Total Units:</span>{' '}
                        <strong className="text-white">{res.totalUnits}</strong>
                      </div>
                      <div>
                        <span className="text-emerald-300">Semester GPA:</span>{' '}
                        <strong className="text-amber-300 text-sm font-black">{res.gpa.toFixed(2)}</strong>
                      </div>
                      <div>
                        <span className="text-emerald-300">Cumulative CGPA:</span>{' '}
                        <strong className="text-white text-sm font-black">{res.cgpa.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-50 font-bold uppercase text-[10px] text-slate-600 border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-4">Course Code</th>
                          <th className="py-2.5 px-4">Course Title</th>
                          <th className="py-2.5 px-4">Units</th>
                          <th className="py-2.5 px-4">Score (%)</th>
                          <th className="py-2.5 px-4">Grade</th>
                          <th className="py-2.5 px-4">Grade Point</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {res.courses.map((course, cIdx) => (
                          <tr key={cIdx} className="hover:bg-slate-50">
                            <td className="py-2.5 px-4 font-bold text-emerald-900">{course.code}</td>
                            <td className="py-2.5 px-4 text-slate-900">{course.title}</td>
                            <td className="py-2.5 px-4 font-medium">{course.units}</td>
                            <td className="py-2.5 px-4 font-bold">{course.score}%</td>
                            <td className="py-2.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded font-black text-[11px] ${
                                  course.grade === 'A'
                                    ? 'bg-emerald-100 text-emerald-900'
                                    : course.grade === 'AB' || course.grade === 'B'
                                    ? 'bg-blue-100 text-blue-900'
                                    : 'bg-amber-100 text-amber-900'
                                }`}
                              >
                                {course.grade}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 font-black text-slate-800">
                              {(course.points * course.units).toFixed(1)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* Grading Scale Legend */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <p className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                NBTE Unified Polytechnic Grading Scale Reference:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-[11px] text-slate-600">
                <div className="p-1.5 bg-white rounded border border-slate-200 font-semibold">
                  <strong className="text-emerald-800">A (75-100%)</strong>: 4.00
                </div>
                <div className="p-1.5 bg-white rounded border border-slate-200 font-semibold">
                  <strong className="text-emerald-800">AB (70-74%)</strong>: 3.50
                </div>
                <div className="p-1.5 bg-white rounded border border-slate-200 font-semibold">
                  <strong className="text-blue-800">B (65-69%)</strong>: 3.25
                </div>
                <div className="p-1.5 bg-white rounded border border-slate-200 font-semibold">
                  <strong className="text-blue-800">BC (60-64%)</strong>: 3.00
                </div>
                <div className="p-1.5 bg-white rounded border border-slate-200 font-semibold">
                  <strong className="text-amber-800">C (55-59%)</strong>: 2.75
                </div>
                <div className="p-1.5 bg-white rounded border border-slate-200 font-semibold">
                  <strong className="text-amber-800">CD (50-54%)</strong>: 2.50
                </div>
                <div className="p-1.5 bg-white rounded border border-slate-200 font-semibold">
                  <strong className="text-red-800">F (&lt;40%)</strong>: 0.00
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FEES & REMITA RECEIPTS */}
        {activeTab === 'fees' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Tuition Fees & Official Remita Payment Manager
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  View your approved school fee schedule, generate Remita Retrieval Reference (RRR) invoices, and print receipts.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-900 block">Bank Account / Remita Portal</span>
                <span className="text-emerald-700">Account: Renaissance Modern Polytechnic Mbaukwu</span>
              </div>
            </div>

            {/* Invoices List */}
            <div className="space-y-4">
              {currentStudent.paymentRecords.map((pay, pIdx) => (
                <div
                  key={pIdx}
                  className="p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {pay.referenceNo}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          pay.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {pay.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900">{pay.purpose}</h4>
                    <p className="text-xs text-slate-500">
                      Session: {pay.session} • Channel: {pay.channel} • Date: {pay.datePaid}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-bold uppercase">Amount</p>
                      <p className="text-lg font-black text-slate-900">
                        ₦{pay.amount.toLocaleString()}
                      </p>
                    </div>

                    {pay.status === 'Paid' ? (
                      <button
                        onClick={handlePrint}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-600" />
                        <span>Print Receipt</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePayFee(pay.referenceNo)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow transition-all active:scale-95"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay via Remita Now</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DIGITAL STUDENT IDENTITY CARD */}
        {activeTab === 'idcard' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Official Digital Student Identity Card
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Valid for campus identification, laboratory entry, library lending, and NBTE examination accreditation.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTempPhoto(currentStudent.avatarUrl);
                    setIsEditingPhoto(true);
                  }}
                  className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
                >
                  <FolderUp className="w-3.5 h-3.5" />
                  <span>Change Photo from Folder</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Physical Card
                </button>
              </div>
            </div>

            {/* Realistic Printable Student ID Card */}
            <div className="flex justify-center py-6">
              <div
                id="printable-id-card"
                className="w-full max-w-md bg-linear-to-b from-white via-slate-50 to-emerald-50 rounded-3xl border-2 border-emerald-700 shadow-2xl p-6 relative overflow-hidden space-y-5"
              >
                {/* Header with Institutional Crest */}
                <div className="flex items-center gap-3 pb-3 border-b-2 border-emerald-700/60">
                  <PolytechnicLogo size="sm" showText={false} />
                  <div className="flex-1">
                    <p className="text-xs font-black tracking-tight text-emerald-950 uppercase leading-none">
                      Renaissance Modern Polytechnic
                    </p>
                    <p className="text-[10px] font-bold text-emerald-800 tracking-wider">
                      MBAUKWU, ANAMBRA STATE • NIGERIA
                    </p>
                    <p className="text-[8px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                      Student Identity Card
                    </p>
                  </div>
                </div>

                {/* Card Body with Photo and Details */}
                <div className="flex gap-4 items-start">
                  <div className="space-y-1 text-center shrink-0">
                    <img
                      src={currentStudent.avatarUrl}
                      alt={currentStudent.fullName}
                      className="w-24 h-28 object-cover rounded-xl border-2 border-emerald-800 shadow-md"
                    />
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-700 text-white text-[9px] font-black uppercase">
                      {currentStudent.level}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs flex-1">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Full Name</p>
                      <p className="text-sm font-black text-slate-900 leading-tight">
                        {currentStudent.fullName}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Matriculation No.</p>
                      <p className="text-xs font-black text-emerald-900 font-mono">
                        {currentStudent.matricNo}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Department</p>
                      <p className="text-[11px] font-bold text-slate-800">
                        {currentStudent.department}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">School / Faculty</p>
                      <p className="text-[10px] text-slate-600">
                        {currentStudent.school}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Barcode & Security Hologram Footer */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-500">
                  <div>
                    <p className="font-bold text-slate-700">Expires: OCT 2026</p>
                    <p>Signature of Registrar: <span className="font-serif italic font-bold text-slate-800">Dr. C. Nwosu</span></p>
                  </div>

                  <div className="flex flex-col items-center">
                    {/* Simulated 2D Barcode */}
                    <div className="w-16 h-8 bg-slate-900 rounded p-1 flex items-center justify-center">
                      <div className="w-full h-full bg-repeating-linear-gradient flex items-center justify-center text-white text-[7px] font-mono">
                        ||||||||||||||
                      </div>
                    </div>
                    <span className="text-[8px] font-mono text-slate-400 mt-0.5">AUTH-NBTE-RMP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: LECTURE TIMETABLE */}
        {activeTab === 'timetable' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Weekly Class Lecture Timetable
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  1st Semester 2024/2025 Academic Timetable for {currentStudent.department} ({currentStudent.level}).
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Timetable
              </button>
            </div>

            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, idx) => {
                const dayCourses = currentStudent.registeredCourses.filter((c) =>
                  c.schedule.toLowerCase().includes(day.toLowerCase().slice(0, 3))
                );

                return (
                  <div key={idx} className="rounded-xl border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 px-4 py-2 font-black text-xs text-slate-800 uppercase tracking-wider border-b border-slate-200 flex items-center justify-between">
                      <span>{day}</span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {dayCourses.length} Scheduled Session(s)
                      </span>
                    </div>

                    {dayCourses.length === 0 ? (
                      <div className="p-3 text-xs text-slate-400 italic">
                        No scheduled lectures on this day (Private Study / Workshop Lab).
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100">
                        {dayCourses.map((dc, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:bg-slate-50/50"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-xs">
                                  {dc.code}
                                </span>
                                <span className="font-bold text-sm text-slate-900">{dc.title}</span>
                              </div>
                              <p className="text-xs text-slate-500">
                                Lecturer: <strong>{dc.lecturer}</strong> • Units: {dc.creditUnits}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-slate-600">
                              <span className="px-2.5 py-1 rounded bg-slate-100 font-medium">
                                {dc.schedule}
                              </span>
                              <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200 font-bold">
                                {dc.lectureHall}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 7: CGPA TARGET CALCULATOR & PREDICTOR */}
        {activeTab === 'cgpa-calc' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">
                Interactive CGPA Graduation Predictor & Target Planner
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Simulate what grade point average you need to graduate with Distinction (3.50+), Upper Credit (3.00+), or Lower Credit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Current Cumulative CGPA
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentStudent.cgpa.toFixed(2)}
                    className="w-full px-4 py-2.5 bg-slate-100 rounded-xl text-sm font-black text-emerald-800 border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Graduation CGPA Goal
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="2.50"
                      max="4.00"
                      step="0.05"
                      value={targetGPA}
                      onChange={(e) => setTargetGPA(parseFloat(e.target.value))}
                      className="flex-1 accent-emerald-600 cursor-pointer"
                    />
                    <span className="font-black text-lg text-emerald-800 min-w-[50px]">
                      {targetGPA.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
                    <span>2.50 (Lower Credit)</span>
                    <span>3.00 (Upper Credit)</span>
                    <span>3.50 (Distinction)</span>
                    <span>4.00 (Max)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Estimated Remaining Credit Units Ahead
                  </label>
                  <input
                    type="number"
                    value={remainingUnits}
                    onChange={(e) => setRemainingUnits(parseInt(e.target.value) || 20)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Typically ~40 to 45 units remaining for full 2-year ND or HND completion.
                  </p>
                </div>
              </div>

              {/* Predictor Outcome Analysis */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Academic Advisory Recommendation
                  </h4>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <p className="text-xs text-slate-600">
                      To achieve your target graduation CGPA of{' '}
                      <strong className="text-emerald-800">{targetGPA.toFixed(2)}</strong>:
                    </p>
                    <p className="text-sm font-black text-slate-900">
                      {targetGPA >= 3.5 ? (
                        <span className="text-emerald-700">
                          Target: Distinction (First-Class Equivalent in Polytechnic)
                        </span>
                      ) : targetGPA >= 3.0 ? (
                        <span className="text-blue-700">Target: Upper Credit (High Honors)</span>
                      ) : (
                        <span className="text-amber-700">Target: Lower Credit</span>
                      )}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      You need to maintain an average of{' '}
                      <strong>
                        {Math.min(4.0, Math.max(2.0, ((targetGPA * (78 + remainingUnits)) - (currentStudent.cgpa * 78)) / remainingUnits)).toFixed(2)}
                      </strong>{' '}
                      Grade Points (predominantly <strong>A and AB grades</strong>) across all remaining technical coursework and your final ND/HND project.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-emerald-100 rounded-xl text-emerald-950 text-xs font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Tutoring and SIWES project mentoring is available at the School of Technology Innovation Hub.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: UPLOAD STUDENT PASSPORT PHOTO */}
      {isEditingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Upload Student Passport Photo
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select a photo file from your computer or phone folder
                </p>
              </div>
              <button
                onClick={() => setIsEditingPhoto(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <EasyPhotoUpload
              label="Student Passport Photo"
              value={tempPhoto}
              onChange={setTempPhoto}
              aspectRatio="square"
              helperText="Click to browse your folder or drag and drop your official passport photo."
              required
            />

            <div className="pt-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditingPhoto(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (tempPhoto) {
                    setStudentData((prev) => ({
                      ...prev,
                      [selectedMatric]: {
                        ...prev[selectedMatric],
                        avatarUrl: tempPhoto,
                      },
                    }));
                  }
                  setIsEditingPhoto(false);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save New Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
