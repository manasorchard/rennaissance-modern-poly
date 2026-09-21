import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Bell, 
  Sparkles, 
  Calendar, 
  Clock, 
  AlertCircle, 
  GraduationCap, 
  FileText, 
  ArrowRight, 
  Pause, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Building2, 
  BookOpen, 
  Cpu, 
  HelpCircle,
  Search,
  Maximize2
} from 'lucide-react';
import { useDataContext } from '../context/DataContext';

export type TickerCategory = 'all' | 'Admissions' | 'Examinations' | 'Notice Board';

export interface TickerItem {
  id: string;
  category: 'Admissions' | 'Examinations' | 'Notice Board';
  title: string;
  deadlineOrDate: string;
  summary: string;
  urgent?: boolean;
  issuingUnit: string;
  actionType: 'admissions' | 'portal' | 'courses' | 'hod_desk' | 'registrar' | 'contact' | 'modal';
  actionLabel: string;
}

// Built-in institutional updates curated specifically for Renaissance Modern Polytechnic Mbaukwu
const DEFAULT_TICKER_ITEMS: TickerItem[] = [
  {
    id: 'ticker-adm-1',
    category: 'Admissions',
    title: '2024/2025 ND & HND Screening Deadline Extended',
    deadlineOrDate: 'Deadline: Oct 31, 2024',
    summary: 'The Central Admissions Committee has extended online registration for the 2024/2025 Academic Session. Candidates with WAEC, NECO or NABTEB results can apply online immediately.',
    urgent: true,
    issuingUnit: 'Office of the Polytechnic Registrar',
    actionType: 'admissions',
    actionLabel: 'Apply for Screening',
  },
  {
    id: 'ticker-exam-1',
    category: 'Examinations',
    title: '1st Semester 2024/2025 Examinations Timetable Released',
    deadlineOrDate: 'Commences: Dec 02, 2024',
    summary: 'Central Examination and Records Board has published the draft examination schedule for all National Diploma and Higher National Diploma departments. Ensure course clearance is completed.',
    urgent: false,
    issuingUnit: 'Directorate of Academic Planning & Examinations',
    actionType: 'portal',
    actionLabel: 'View Exam Timetable',
  },
  {
    id: 'ticker-nb-1',
    category: 'Notice Board',
    title: 'NBTE Grants 5-Year Full Re-Accreditation Across Core Engineering & Tech Programs',
    deadlineOrDate: 'Official Board Gazette: Sept 2024',
    summary: 'National Board for Technical Education (NBTE) has officially re-accredited ND & HND Computer Science, Electrical Engineering, and Science Laboratory Technology programs.',
    urgent: false,
    issuingUnit: 'National Board for Technical Education (NBTE)',
    actionType: 'courses',
    actionLabel: 'Explore Accredited Courses',
  },
  {
    id: 'ticker-adm-2',
    category: 'Admissions',
    title: 'JAMB Central Admissions Processing System (CAPS) Upload Notice',
    deadlineOrDate: 'Cut-off Date: Oct 25, 2024',
    summary: 'All applicants who chose Renaissance Modern Polytechnic as 2nd choice or did not upload O\'Level results to JAMB portal are urged to effect change of institution and upload WAEC/NECO to avoid admission forfeiture.',
    urgent: true,
    issuingUnit: 'Admissions Desk & ICT Screening Unit',
    actionType: 'admissions',
    actionLabel: 'Upload WAEC/JAMB Details',
  },
  {
    id: 'ticker-exam-2',
    category: 'Examinations',
    title: 'Computer-Based Test (CBT) Mock Examinations: GNS 101 & GNS 201',
    deadlineOrDate: 'Mock Session: Nov 20–22, 2024',
    summary: 'ND I and ND II students enrolled in General Studies are required to take the mandatory CBT practice session at the Ultra-Modern ICT Center to verify digital biometric dockets.',
    urgent: false,
    issuingUnit: 'Directorate of General Studies & ICT',
    actionType: 'portal',
    actionLabel: 'Check CBT Hall Allocation',
  },
  {
    id: 'ticker-nb-2',
    category: 'Notice Board',
    title: 'HOD Computer Science: Signed Course Form Clearance Upload',
    deadlineOrDate: 'Clearance Deadline: Nov 15, 2024',
    summary: 'All ND I, ND II, HND I, and HND II Computer Science scholars must upload signed course registration forms through the departmental clearance portal for Engr. Dr. Chinedu Eze\'s vetting.',
    urgent: true,
    issuingUnit: 'Department of Computer Science',
    actionType: 'hod_desk',
    actionLabel: 'Upload Course Form',
  },
  {
    id: 'ticker-nb-3',
    category: 'Notice Board',
    title: 'Remita School Fees & Flexible 2-Tranche Installment Window',
    deadlineOrDate: 'Tranche 1 Window: Active',
    summary: 'Students utilizing the approved polytechnic installment payment option can generate official Remita Retrieval Reference (RRR) invoices on the Student Portal for 60% first semester enrollment.',
    urgent: false,
    issuingUnit: 'Bursary Department & Student Accounts',
    actionType: 'portal',
    actionLabel: 'Generate Remita Invoice',
  },
  {
    id: 'ticker-exam-3',
    category: 'Examinations',
    title: 'Practical Engineering Workshop & Laboratory Assessment Week',
    deadlineOrDate: 'Practical Week: Nov 18–22, 2024',
    summary: 'All Mechanical, Electrical, and Computer Engineering students are to report to their respective workshops with required safety boots and lab coats for NBTE practical assessments.',
    urgent: false,
    issuingUnit: 'School of Engineering Technology',
    actionType: 'modal',
    actionLabel: 'View Safety Requirements',
  },
  {
    id: 'ticker-nb-4',
    category: 'Notice Board',
    title: '14th Annual Matriculation Ceremony & Academic Gown Collection',
    deadlineOrDate: 'Ceremony Date: March 28, 2025',
    summary: 'All freshly admitted ND I and HND I scholars are hereby notified that academic gown retrieval commences 3 days before the ceremony at the Office of the Registrar.',
    urgent: false,
    issuingUnit: 'Office of the Polytechnic Registrar',
    actionType: 'registrar',
    actionLabel: 'Registry Guidelines',
  },
];

interface AcademicNewsTickerProps {
  onOpenAdmissions?: () => void;
  onOpenPortal?: () => void;
  onNavigateToCourses?: () => void;
  onNavigateToRegistrar?: () => void;
  onNavigateToHodDesk?: () => void;
}

export const AcademicNewsTicker: React.FC<AcademicNewsTickerProps> = ({
  onOpenAdmissions,
  onOpenPortal,
  onNavigateToCourses,
  onNavigateToRegistrar,
  onNavigateToHodDesk,
}) => {
  const { announcements } = useDataContext();

  // State
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<'normal' | 'slow'>('normal');
  const [activeCategory, setActiveCategory] = useState<TickerCategory>('all');
  const [selectedAlert, setSelectedAlert] = useState<TickerItem | null>(null);
  const [isAllAlertsModalOpen, setIsAllAlertsModalOpen] = useState<boolean>(false);
  const [modalSearchQuery, setModalSearchQuery] = useState<string>('');

  // Combine dynamic announcements from DataContext with default rich ticker items
  const combinedItems = useMemo<TickerItem[]>(() => {
    // Map custom announcements from DataContext if present
    const dynamicItems: TickerItem[] = (announcements || []).map((ann, idx) => ({
      id: `ann-${ann.id || idx}`,
      category: ann.badge?.toLowerCase().includes('admiss')
        ? 'Admissions'
        : ann.badge?.toLowerCase().includes('exam')
        ? 'Examinations'
        : 'Notice Board',
      title: ann.title,
      deadlineOrDate: ann.date || 'Current Session',
      summary: ann.content || `${ann.title}. Official update published on the institutional notice board.`,
      urgent: !!ann.urgent,
      issuingUnit: 'Polytechnic Bulletin Board',
      actionType: ann.badge?.toLowerCase().includes('admiss') ? 'admissions' : 'portal',
      actionLabel: ann.badge?.toLowerCase().includes('admiss') ? 'Apply for Screening' : 'Student Portal',
    }));

    // Merge and deduplicate by title
    const all = [...dynamicItems, ...DEFAULT_TICKER_ITEMS];
    const seen = new Set<string>();
    return all.filter((item) => {
      const key = item.title.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [announcements]);

  // Filtered by selected category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return combinedItems;
    return combinedItems.filter((i) => i.category === activeCategory);
  }, [combinedItems, activeCategory]);

  // Trigger proper action handler
  const handleItemAction = (item: TickerItem) => {
    switch (item.actionType) {
      case 'admissions':
        if (onOpenAdmissions) onOpenAdmissions();
        break;
      case 'portal':
        if (onOpenPortal) onOpenPortal();
        break;
      case 'courses':
        if (onNavigateToCourses) onNavigateToCourses();
        break;
      case 'registrar':
        if (onNavigateToRegistrar) onNavigateToRegistrar();
        break;
      case 'hod_desk':
        if (onNavigateToHodDesk) onNavigateToHodDesk();
        break;
      case 'modal':
      default:
        setSelectedAlert(item);
        break;
    }
  };

  // Category styling helper
  const getCategoryTheme = (category: TickerItem['category']) => {
    switch (category) {
      case 'Admissions':
        return {
          pill: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          badge: 'bg-rose-600 text-white',
          dot: 'bg-rose-400',
          borderHover: 'hover:border-rose-400/60',
        };
      case 'Examinations':
        return {
          pill: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          badge: 'bg-amber-600 text-slate-950 font-black',
          dot: 'bg-amber-400',
          borderHover: 'hover:border-amber-400/60',
        };
      case 'Notice Board':
      default:
        return {
          pill: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
          badge: 'bg-sky-600 text-white',
          dot: 'bg-sky-400',
          borderHover: 'hover:border-sky-400/60',
        };
    }
  };

  // Duplicate filtered list so CSS infinite marquee flows with zero blank gaps
  const marqueeList = useMemo(() => {
    if (filteredItems.length === 0) return [];
    // Duplicate 2x or 3x depending on length to make a long seamless strip
    if (filteredItems.length < 5) {
      return [...filteredItems, ...filteredItems, ...filteredItems, ...filteredItems];
    }
    return [...filteredItems, ...filteredItems];
  }, [filteredItems]);

  return (
    <div 
      id="academic-news-ticker"
      className="relative z-20 bg-slate-950 border-y border-emerald-900/60 text-slate-100 shadow-md select-none"
      aria-label="Academic News Ticker"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          
          {/* Left Static Header / Live Pulse Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                Academic News Ticker
              </span>
            </div>

            {/* Quick Category Filter Pills */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory('Admissions')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                  activeCategory === 'Admissions'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Admissions
              </button>
              <button
                onClick={() => setActiveCategory('Examinations')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                  activeCategory === 'Examinations'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Exams
              </button>
              <button
                onClick={() => setActiveCategory('Notice Board')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                  activeCategory === 'Notice Board'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Notices
              </button>
            </div>
          </div>

          {/* Center Scrolling Strip */}
          <div 
            className="flex-1 overflow-hidden relative mx-0 md:mx-3 py-1 cursor-pointer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            title="Hover to pause • Click any alert to read full details"
          >
            {/* Visual gradient edge fades */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent z-10" />

            <div 
              className={`${
                speed === 'slow' ? 'animate-ticker-marquee-slow' : 'animate-ticker-marquee'
              } ${isPaused ? 'pause-animation' : ''} flex items-center gap-6`}
            >
              {marqueeList.map((item, index) => {
                const theme = getCategoryTheme(item.category);
                return (
                  <div
                    key={`${item.id}-${index}`}
                    onClick={() => setSelectedAlert(item)}
                    className={`inline-flex items-center gap-2.5 px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-800 ${theme.borderHover} transition-all shrink-0 hover:bg-slate-800 text-xs shadow-xs group`}
                  >
                    {/* Category & Status badge */}
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${theme.pill}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                      <span>{item.category}</span>
                    </span>

                    {/* Deadline or Date pill */}
                    <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{item.deadlineOrDate}</span>
                    </span>

                    <span className="text-slate-400">•</span>

                    {/* Alert Title */}
                    <span className="font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-1 max-w-[320px] sm:max-w-[460px]">
                      {item.title}
                    </span>

                    {/* Action Hint */}
                    <span className="text-[10px] font-bold text-emerald-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5 ml-1">
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Controls Bar */}
          <div className="flex items-center justify-end gap-1.5 shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-slate-900">
            {/* Pause / Resume Button */}
            <button
              id="ticker-toggle-pause-btn"
              onClick={() => setIsPaused((prev) => !prev)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title={isPaused ? 'Resume scrolling ticker' : 'Pause scrolling ticker'}
              aria-label={isPaused ? 'Resume scrolling ticker' : 'Pause scrolling ticker'}
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Pause className="w-3.5 h-3.5 text-amber-300" />
              )}
            </button>

            {/* Speed Toggle */}
            <button
              id="ticker-toggle-speed-btn"
              onClick={() => setSpeed((prev) => (prev === 'normal' ? 'slow' : 'normal'))}
              className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[10px] font-bold transition-colors cursor-pointer"
              title="Toggle ticker scroll speed"
            >
              {speed === 'normal' ? '1x Speed' : '0.5x Slow'}
            </button>

            {/* View All Bulletin Modal Button */}
            <button
              id="ticker-view-all-btn"
              onClick={() => setIsAllAlertsModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-700/60 text-[11px] font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              title="Open full notice board modal"
            >
              <Maximize2 className="w-3 h-3 text-amber-300" />
              <span>Bulletin ({combinedItems.length})</span>
            </button>
          </div>

        </div>
      </div>

      {/* MODAL 1: Individual Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 rounded-3xl border border-emerald-500/40 max-w-xl w-full text-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-950 to-slate-950 p-6 border-b border-emerald-800/40 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${getCategoryTheme(selectedAlert.category).pill}`}>
                    {selectedAlert.category}
                  </span>
                  {selectedAlert.urgent && (
                    <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider">
                      Urgent Alert
                    </span>
                  )}
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedAlert.deadlineOrDate}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                  {selectedAlert.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedAlert(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-sm text-slate-200 leading-relaxed">
                  {selectedAlert.summary}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Issuing Authority: <strong>{selectedAlert.issuingUnit}</strong></span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Official Memo</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Dismiss
                </button>

                <button
                  onClick={() => {
                    handleItemAction(selectedAlert);
                    setSelectedAlert(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{selectedAlert.actionLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: View All Alerts Bulletin Board */}
      {isAllAlertsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 rounded-3xl border border-emerald-500/40 max-w-3xl w-full max-h-[85vh] text-white shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-950 to-slate-950 p-6 border-b border-emerald-800/40 flex items-center justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-900/80 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                  <Bell className="w-3 h-3" />
                  <span>Official Academic Dispatch</span>
                </div>
                <h3 className="text-xl font-black text-white">
                  Academic Notice Board & Bulletin
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time admissions deadlines, examination dates, and registry circulars for the 2024/2025 Academic Session.
                </p>
              </div>

              <button
                onClick={() => setIsAllAlertsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {(['all', 'Admissions', 'Examinations', 'Notice Board'] as TickerCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'All Alerts' : cat}
                  </button>
                ))}
              </div>

              <div className="relative sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  placeholder="Search notices..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-100"
                />
              </div>
            </div>

            {/* Scrollable Alerts List */}
            <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
              {combinedItems
                .filter((item) => {
                  if (activeCategory !== 'all' && item.category !== activeCategory) return false;
                  if (modalSearchQuery.trim()) {
                    const q = modalSearchQuery.toLowerCase();
                    return item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
                  }
                  return true;
                })
                .map((item) => {
                  const theme = getCategoryTheme(item.category);
                  return (
                    <div
                      key={item.id}
                      className="bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-emerald-500/50 p-4 transition-all space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${theme.pill}`}>
                            {item.category}
                          </span>
                          {item.urgent && (
                            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider">
                              Urgent
                            </span>
                          )}
                          <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>{item.deadlineOrDate}</span>
                          </span>
                        </div>

                        <span className="text-[11px] text-slate-400 font-medium">
                          {item.issuingUnit}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {item.title}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.summary}
                      </p>

                      <div className="flex items-center justify-end pt-1">
                        <button
                          onClick={() => {
                            handleItemAction(item);
                            setIsAllAlertsModalOpen(false);
                          }}
                          className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>{item.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Renaissance Modern Polytechnic Registry & Admissions Information Service</span>
              <button
                onClick={() => setIsAllAlertsModalOpen(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold"
              >
                Close Bulletin
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
