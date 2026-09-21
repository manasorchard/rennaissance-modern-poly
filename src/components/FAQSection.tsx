import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  GraduationCap, 
  CreditCard, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  Mail, 
  CheckCircle2, 
  X, 
  Edit3, 
  BookOpen,
  Building2,
  ExternalLink,
  Info
} from 'lucide-react';
import { useDataContext } from '../context/DataContext';
import { FAQCategory, FAQItem } from '../types';

interface FAQSectionProps {
  onOpenAdmissions?: (courseTitle?: string) => void;
  onOpenPortal?: () => void;
  onNavigateToContact?: () => void;
  onNavigateToCourses?: () => void;
  onNavigateToAdmin?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onOpenAdmissions,
  onOpenPortal,
  onNavigateToContact,
  onNavigateToCourses,
  onNavigateToAdmin,
}) => {
  const { faqs, generalInfo } = useDataContext();

  // Active category filter: 'all' or one of the FAQCategory values
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Track open items (allow toggling multiple or single)
  const [openItemIds, setOpenItemIds] = useState<Record<string, boolean>>(() => {
    // By default, open the first 2 highlighted items
    const initial: Record<string, boolean> = {};
    const firstTwo = faqs.filter(f => f.highlighted).slice(0, 2);
    firstTwo.forEach(f => { initial[f.id] = true; });
    return initial;
  });

  const toggleItem = (id: string) => {
    setOpenItemIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = (itemsToExpand: FAQItem[]) => {
    const next: Record<string, boolean> = {};
    itemsToExpand.forEach(item => { next[item.id] = true; });
    setOpenItemIds(next);
  };

  const collapseAll = () => {
    setOpenItemIds({});
  };

  // Sort and filter FAQs
  const filteredFaqs = useMemo(() => {
    return [...faqs]
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .filter(item => {
        // Category filter
        if (activeCategory !== 'all' && item.category !== activeCategory) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchQuestion = item.question.toLowerCase().includes(q);
          const matchAnswer = item.answer.toLowerCase().includes(q);
          const matchCategory = item.category.toLowerCase().includes(q);
          return matchQuestion || matchAnswer || matchCategory;
        }
        return true;
      });
  }, [faqs, activeCategory, searchQuery]);

  // Counts by category
  const counts = useMemo(() => {
    return {
      all: faqs.length,
      Admissions: faqs.filter(f => f.category === 'Admissions').length,
      'School Fees': faqs.filter(f => f.category === 'School Fees').length,
      'General Inquiries': faqs.filter(f => f.category === 'General Inquiries').length,
    };
  }, [faqs]);

  // Visual category styling helper
  const getCategoryTheme = (category: FAQCategory) => {
    switch (category) {
      case 'Admissions':
        return {
          pill: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          accent: 'border-emerald-500',
          icon: GraduationCap,
          iconColor: 'text-emerald-700',
          dotColor: 'bg-emerald-500',
        };
      case 'School Fees':
        return {
          pill: 'bg-amber-100 text-amber-950 border-amber-300',
          accent: 'border-amber-500',
          icon: CreditCard,
          iconColor: 'text-amber-800',
          dotColor: 'bg-amber-500',
        };
      case 'General Inquiries':
      default:
        return {
          pill: 'bg-sky-100 text-sky-950 border-sky-300',
          accent: 'border-sky-500',
          icon: Compass,
          iconColor: 'text-sky-800',
          dotColor: 'bg-sky-500',
        };
    }
  };

  return (
    <section 
      id="faq-section" 
      className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-100 border-b border-slate-200 scroll-mt-20"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold tracking-wide">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>Got Questions? Official Answers</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Everything you need to know about 2024/2025 admission screening, NBTE accreditation, tuition fees & flexible installment options, student hostels, and campus life at Renaissance Modern Polytechnic Mbaukwu.
          </p>

          {/* Discreet Admin Quick Link */}
          {onNavigateToAdmin && (
            <div className="pt-1">
              <button
                id="faq-admin-edit-shortcut-btn"
                onClick={onNavigateToAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-700 font-semibold px-2.5 py-1 rounded-md hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-200"
                title="Open Admin CMS to edit questions and answers"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                <span>Authorized Admin? Edit FAQs in CMS</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Filters & Search Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="FAQ Categories">
              <button
                id="faq-filter-all-btn"
                role="tab"
                aria-selected={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>All Inquiries</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {counts.all}
                </span>
              </button>

              <button
                id="faq-filter-admissions-btn"
                role="tab"
                aria-selected={activeCategory === 'Admissions'}
                onClick={() => setActiveCategory('Admissions')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeCategory === 'Admissions'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200/60'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admission Requirements</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeCategory === 'Admissions' ? 'bg-white/20 text-white' : 'bg-emerald-200/70 text-emerald-900'
                }`}>
                  {counts.Admissions}
                </span>
              </button>

              <button
                id="faq-filter-fees-btn"
                role="tab"
                aria-selected={activeCategory === 'School Fees'}
                onClick={() => setActiveCategory('School Fees')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeCategory === 'School Fees'
                    ? 'bg-amber-600 text-slate-950 shadow-xs font-black'
                    : 'bg-amber-50 text-amber-950 hover:bg-amber-100 border border-amber-200/70'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-amber-700" />
                <span>School Fees & Remita</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeCategory === 'School Fees' ? 'bg-slate-950 text-amber-300' : 'bg-amber-200 text-amber-950'
                }`}>
                  {counts['School Fees']}
                </span>
              </button>

              <button
                id="faq-filter-general-btn"
                role="tab"
                aria-selected={activeCategory === 'General Inquiries'}
                onClick={() => setActiveCategory('General Inquiries')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeCategory === 'General Inquiries'
                    ? 'bg-sky-800 text-white shadow-xs'
                    : 'bg-sky-50 text-sky-950 hover:bg-sky-100 border border-sky-200/70'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-sky-600" />
                <span>General Inquiries</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeCategory === 'General Inquiries' ? 'bg-white/20 text-white' : 'bg-sky-200 text-sky-950'
                }`}>
                  {counts['General Inquiries']}
                </span>
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative md:w-80 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="faq-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., JAMB, installment, hostel)..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Sub-bar with count & expand/collapse actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span>Showing <strong>{filteredFaqs.length}</strong> of {faqs.length} questions</span>
              {searchQuery && (
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                  Filter: &quot;{searchQuery}&quot;
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                id="faq-expand-all-btn"
                onClick={() => expandAll(filteredFaqs)}
                className="text-slate-600 hover:text-emerald-700 font-semibold underline text-[11px] cursor-pointer"
              >
                Expand All
              </button>
              <span className="text-slate-300">|</span>
              <button
                id="faq-collapse-all-btn"
                onClick={collapseAll}
                className="text-slate-600 hover:text-emerald-700 font-semibold underline text-[11px] cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No matching questions found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any FAQs matching &quot;{searchQuery}&quot; in the {activeCategory === 'all' ? 'entire database' : activeCategory} category.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Reset Search Filters
              </button>
              {onNavigateToContact && (
                <button
                  onClick={onNavigateToContact}
                  className="px-4 py-2 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold hover:bg-emerald-200"
                >
                  Contact Admissions Desk
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFaqs.map((faq, index) => {
              const isOpen = !!openItemIds[faq.id];
              const theme = getCategoryTheme(faq.category);
              const CategoryIcon = theme.icon;

              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' 
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {/* Header / Question Button */}
                  <button
                    id={`faq-toggle-${faq.id}`}
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer select-none group"
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Category Badge */}
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${theme.pill}`}>
                          <CategoryIcon className="w-3 h-3" />
                          <span>{faq.category}</span>
                        </span>

                        {/* Highlighted / Pinned badge */}
                        {faq.highlighted && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
                            <Sparkles className="w-3 h-3 text-slate-950" />
                            <span>Most Asked</span>
                          </span>
                        )}

                        <span className="text-[11px] text-slate-400 font-medium">
                          Q{index + 1}
                        </span>
                      </div>

                      <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                        isOpen ? 'text-emerald-950' : 'text-slate-900 group-hover:text-emerald-800'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`p-2 rounded-xl transition-all shrink-0 mt-0.5 ${
                      isOpen ? 'bg-emerald-100 text-emerald-900 rotate-180' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}>
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    </div>
                  </button>

                  {/* Collapsible Answer Body */}
                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-toggle-${faq.id}`}
                      className="px-4 sm:px-6 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 space-y-4 animate-in fade-in duration-200"
                    >
                      <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/70 text-slate-800 space-y-2">
                        <p className="whitespace-pre-line leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>

                      {/* Contextual Action Shortcuts depending on category */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {faq.category === 'Admissions' && onOpenAdmissions && (
                          <button
                            id={`faq-action-apply-${faq.id}`}
                            onClick={() => onOpenAdmissions()}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-95"
                          >
                            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                            <span>Start 2024/2025 Online Screening</span>
                          </button>
                        )}

                        {faq.category === 'Admissions' && onNavigateToCourses && (
                          <button
                            id={`faq-action-courses-${faq.id}`}
                            onClick={onNavigateToCourses}
                            className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                            <span>View Accredited ND/HND Courses</span>
                          </button>
                        )}

                        {faq.category === 'School Fees' && onOpenPortal && (
                          <button
                            id={`faq-action-remita-${faq.id}`}
                            onClick={onOpenPortal}
                            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-95"
                          >
                            <CreditCard className="w-3.5 h-3.5 text-slate-950" />
                            <span>Generate Remita Invoice on Student Portal</span>
                          </button>
                        )}

                        {faq.category === 'General Inquiries' && onNavigateToContact && (
                          <button
                            id={`faq-action-contact-${faq.id}`}
                            onClick={onNavigateToContact}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                            <span>View Campus Contact & Travel Directions</span>
                          </button>
                        )}

                        <span className="text-[11px] text-slate-400 ml-auto flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Official Registry Verified</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Institutional Support & Admissions Desk Callout */}
        <div className="mt-12 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/60 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-amber-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/40">
                <Info className="w-3.5 h-3.5" />
                <span>Need Personalized Guidance?</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                Have a specific question not addressed above?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Our Admissions Desk, Registry Officers, and Departmental Counselors are on duty to guide you through JAMB CAPS transfer, departmental prerequisite verification, installment plans, and hostel room allocation.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold">{generalInfo.phonePrimary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold">{generalInfo.admissionsEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>{generalInfo.screeningHours}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch lg:items-end">
              {onOpenAdmissions && (
                <button
                  id="faq-callout-apply-btn"
                  onClick={() => onOpenAdmissions()}
                  className="w-full sm:w-auto lg:w-full px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 inline-flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Apply for 2024/2025 Screening</span>
                </button>
              )}

              {onNavigateToContact && (
                <button
                  id="faq-callout-contact-btn"
                  onClick={onNavigateToContact}
                  className="w-full sm:w-auto lg:w-full px-5 py-3 bg-white/10 hover:bg-white/20 border border-emerald-500/40 text-white font-bold text-xs rounded-xl transition-all inline-flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Contact Admissions Office</span>
                </button>
              )}

              {onNavigateToAdmin && (
                <button
                  id="faq-callout-admin-btn"
                  onClick={onNavigateToAdmin}
                  className="w-full sm:w-auto lg:w-full px-4 py-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/50 text-emerald-200 text-[11px] font-semibold rounded-lg transition-all inline-flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3 h-3 text-amber-400" />
                  <span>Admin: Manage / Add FAQ Items</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
