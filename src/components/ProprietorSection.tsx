import React, { useState } from 'react';
import { useDataContext } from '../context/DataContext';
import { 
  Award, 
  BookOpen, 
  GraduationCap, 
  Heart, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Users, 
  Compass, 
  X, 
  Building2,
  ExternalLink,
  Edit3
} from 'lucide-react';

interface ProprietorSectionProps {
  onOpenAdmissions: () => void;
  onExploreCourses?: () => void;
  onNavigateToCouncil: () => void;
  onNavigateToAdmin: () => void;
  onNavigateToRegistrar?: () => void;
}

export const ProprietorSection: React.FC<ProprietorSectionProps> = ({
  onOpenAdmissions,
  onExploreCourses,
  onNavigateToCouncil,
  onNavigateToAdmin,
  onNavigateToRegistrar,
}) => {
  const { proprietorInfo } = useDataContext();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'bio' | 'vision' | 'scholarships' | 'credentials'>('bio');

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Breadcrumb & Quick Action Banner */}
      <div className="bg-emerald-950 text-emerald-100 py-3.5 px-4 text-xs font-semibold border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-sm bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-widest text-[10px] font-bold">
              Office of the Founder
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-slate-200">
              Proprietor & Board of Trustees Secretariat • Mbaukwu Campus
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-xs cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>View Full Profile Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Welcome & Portrait Banner */}
      <div className="bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Portrait Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-sm sm:max-w-md mx-auto">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-500 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-slate-950 rounded-2xl overflow-hidden border border-amber-400/40 shadow-2xl">
                  <div className="aspect-4/5 overflow-hidden relative">
                    <img
                      src={proprietorInfo.photoUrl}
                      alt={proprietorInfo.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Badge Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <span className="inline-block px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
                        Proprietor & Founder
                      </span>
                      <h3 className="text-xl font-bold text-white leading-snug">
                        {proprietorInfo.name}
                      </h3>
                      <p className="text-xs text-amber-300/90 font-medium">
                        {proprietorInfo.titles}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">
                      Renaissance Modern Polytechnic Mbaukwu
                    </span>
                    <button
                      onClick={() => setIsProfileModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <span>Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision & Headline Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-700/60 text-emerald-200 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Office of the Proprietor & Board of Trustees
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Forging Africa’s Industrial Renaissance in Mbaukwu
                </h1>
                <p className="mt-2 text-base sm:text-lg text-emerald-200/90 font-medium">
                  {proprietorInfo.position}
                </p>
              </div>

              {/* Quotation Box */}
              <div className="bg-emerald-950/80 border-l-4 border-amber-400 p-5 rounded-r-xl shadow-inner backdrop-blur-xs">
                <p className="text-base sm:text-lg italic text-amber-100 font-serif leading-relaxed">
                  {proprietorInfo.quote}
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-amber-400 font-bold">
                  — {proprietorInfo.name}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="proprietor-view-profile-btn"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all shadow-lg hover:shadow-amber-500/20 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>View Full Profile & Biography</span>
                </button>

                <button
                  id="proprietor-open-admissions-btn"
                  onClick={onOpenAdmissions}
                  className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm transition-all border border-emerald-500/50 inline-flex items-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Apply for Admission</span>
                </button>

                <button
                  id="proprietor-nav-council-btn"
                  onClick={onNavigateToCouncil}
                  className="px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all border border-slate-700 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Poly Council Members</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Core Pillars Grid */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              Guiding Institutional Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              The Founder’s 5 Pillars of Technical Excellence
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Principles established by the Proprietor to govern the academic standards, workshop rigor, and character development of every Renaissance scholar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proprietorInfo.corePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-800 font-black text-base">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {pillar}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct mandate enforced across all schools, engineering workshops, and council sittings.
                  </p>
                </div>
              </div>
            ))}

            {/* Quick Dossier Card */}
            <div 
              onClick={() => setIsProfileModalOpen(true)}
              className="bg-gradient-to-br from-amber-50 to-amber-100/60 p-6 rounded-2xl border border-amber-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded">
                  Official Dossier
                </span>
                <Award className="w-5 h-5 text-amber-700" />
              </div>
              <div className="my-3">
                <h4 className="font-bold text-slate-900 text-base">
                  Full Honors, Education & National Citations
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Explore degrees, honorary doctorates, national OON honors, and technical fellowships.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1 group">
                Open Profile Dossier <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </section>

        {/* Founding Vision & Scholarship Initiatives (2-Column) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Founding Vision */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                  Founding Philosophy
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  The Vision Behind Mbaukwu Campus
                </h3>
              </div>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {proprietorInfo.foundingVision}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-700" />
                Strategic Location in Mbaukwu Town
              </div>
              <p>
                Chosen for its serene academic environment, proximity to Awka industrial corridors, and fertile ground for expansive workshop plazas and renewable solar energy testing grounds.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onExploreCourses}
                className="px-4 py-2.5 rounded-lg bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explore Accredited Courses</span>
              </button>
            </div>
          </div>

          {/* Scholarships & Philanthropy */}
          <div className="bg-gradient-to-br from-emerald-900 to-slate-950 text-white p-8 rounded-2xl border border-emerald-800/80 shadow-md space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Philanthropy & Endowment
                </span>
                <h3 className="text-xl font-bold text-white">
                  Proprietor's Annual Scholarship Scheme
                </h3>
              </div>
            </div>

            <p className="text-emerald-100/90 text-sm leading-relaxed whitespace-pre-line">
              {proprietorInfo.philanthropyAndScholarships}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-emerald-950/70 border border-emerald-700/50 p-3.5 rounded-xl">
                <span className="text-2xl font-black text-amber-400">50+</span>
                <p className="text-[11px] text-emerald-200 mt-0.5 font-medium">
                  Annual Indigent Full Scholarships
                </p>
              </div>
              <div className="bg-emerald-950/70 border border-emerald-700/50 p-3.5 rounded-xl">
                <span className="text-2xl font-black text-amber-400">100%</span>
                <p className="text-[11px] text-emerald-200 mt-0.5 font-medium">
                  Modern CNC & Solar Workshop Funding
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmissions}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Apply for Admission & Scholarship</span>
              </button>
            </div>
          </div>
        </section>

        {/* Secretariat & Contact Liaison */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                Official Directory
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Office of the Proprietor & Board Secretariat
              </h3>
            </div>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 inline-flex items-center gap-1"
            >
              <span>View Full Biography & Accreditations</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <Mail className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">
                  Executive Email
                </div>
                <a 
                  href={`mailto:${proprietorInfo.officeContact.email}`}
                  className="text-sm font-semibold text-slate-900 hover:text-emerald-700 break-all"
                >
                  {proprietorInfo.officeContact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">
                  Liaison Telephone
                </div>
                <a 
                  href={`tel:${proprietorInfo.officeContact.phone}`}
                  className="text-sm font-semibold text-slate-900 hover:text-emerald-700"
                >
                  {proprietorInfo.officeContact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">
                  Secretariat Suite
                </div>
                <p className="text-xs font-semibold text-slate-900 leading-snug">
                  {proprietorInfo.officeContact.location}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Full Profile & Dossier Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white p-6 border-b border-emerald-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 shrink-0">
                  <img
                    src={proprietorInfo.photoUrl}
                    alt={proprietorInfo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-emerald-900 px-2 py-0.5 rounded">
                    Official Executive Dossier
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {proprietorInfo.name}
                  </h3>
                  <p className="text-xs text-emerald-200 font-medium">
                    {proprietorInfo.position}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="w-8 h-8 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close Profile"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Subtabs */}
            <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 gap-2 shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveProfileTab('bio')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeProfileTab === 'bio'
                    ? 'border-emerald-700 text-emerald-800'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Comprehensive Biography
              </button>

              <button
                onClick={() => setActiveProfileTab('vision')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeProfileTab === 'vision'
                    ? 'border-emerald-700 text-emerald-800'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Vision & Philosophy
              </button>

              <button
                onClick={() => setActiveProfileTab('scholarships')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeProfileTab === 'scholarships'
                    ? 'border-emerald-700 text-emerald-800'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Scholarships & Endowments
              </button>

              <button
                onClick={() => setActiveProfileTab('credentials')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeProfileTab === 'credentials'
                    ? 'border-emerald-700 text-emerald-800'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Degrees & National Honors
              </button>
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm leading-relaxed">
              {activeProfileTab === 'bio' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Life Journey, Industrial Enterprise & Educational Philanthropy
                  </h4>
                  <p className="whitespace-pre-line text-slate-700">
                    {proprietorInfo.biography}
                  </p>
                </div>
              )}

              {activeProfileTab === 'vision' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Mandate for Renaissance Modern Polytechnic, Mbaukwu
                  </h4>
                  <p className="whitespace-pre-line text-slate-700">
                    {proprietorInfo.foundingVision}
                  </p>
                  <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <h5 className="font-bold text-emerald-900 text-xs uppercase mb-2">
                      Core Pillars of Governance
                    </h5>
                    <ul className="space-y-1.5 text-xs text-emerald-800">
                      {proprietorInfo.corePillars.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeProfileTab === 'scholarships' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    The Okonkwo Educational Foundation Trust
                  </h4>
                  <p className="whitespace-pre-line text-slate-700">
                    {proprietorInfo.philanthropyAndScholarships}
                  </p>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <div className="font-bold">Scholarship Eligibility Criteria:</div>
                    <p>• Verified indigent background with genuine passion for technical craftsmanship.</p>
                    <p>• Enrolled or accepted into ND/HND Engineering, Computer Science, or Renewable Energy.</p>
                    <p>• Maintenance of minimum 3.0 CGPA over the academic semesters.</p>
                  </div>
                </div>
              )}

              {activeProfileTab === 'credentials' && (
                <div className="space-y-6">
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-emerald-800 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-700" />
                      Academic Qualifications & Fellowships
                    </h5>
                    <ul className="space-y-2">
                      {proprietorInfo.educationAndCredentials.map((edu, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-amber-800 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-600" />
                      National Honors & Chieftaincy Recognitions
                    </h5>
                    <ul className="space-y-2">
                      {proprietorInfo.honorsAndRecognitions.map((honor, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/70 text-xs font-medium text-slate-800">
                          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{honor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  onNavigateToAdmin();
                }}
                className="text-xs font-bold text-slate-600 hover:text-emerald-700 inline-flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile Information (Admin CMS)</span>
              </button>

              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
