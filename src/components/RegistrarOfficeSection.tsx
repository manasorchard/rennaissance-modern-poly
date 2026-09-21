import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  FileText, 
  Mail, 
  PhoneCall, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  ArrowRight, 
  Download, 
  Sparkles, 
  ChevronRight,
  Send,
  Building2,
  Users,
  Briefcase,
  HelpCircle,
  Check
} from 'lucide-react';
import { useDataContext } from '../context/DataContext';
import { PolytechnicLogo } from './PolytechnicLogo';

interface RegistrarOfficeSectionProps {
  onOpenAdmissions: () => void;
  onOpenPortal: () => void;
  onExploreCourses: () => void;
  onNavigateToAdmin?: () => void;
}

export const RegistrarOfficeSection: React.FC<RegistrarOfficeSectionProps> = ({
  onOpenAdmissions,
  onOpenPortal,
  onExploreCourses,
  onNavigateToAdmin,
}) => {
  const { registrarInfo, generalInfo } = useDataContext();
  const [activeTab, setActiveTab] = useState<'overview' | 'units' | 'transcripts' | 'statutes'>('overview');
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySubject, setInquirySubject] = useState('Transcript Verification');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    }, 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Top Executive Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="font-semibold text-slate-700">Institutional Administration</span>
              <span>/</span>
              <span className="text-emerald-800 font-bold">Office of the Registrar</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-emerald-800/40">
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Central Academic Administration & Secretariat</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Office of the Registrar
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                The administrative engine room of Renaissance Modern Polytechnic, Mbaukwu. Custodian of the Institutional Seal, academic records, admissions, matriculation registers, council secretariat, and statutory compliance under the National Board for Technical Education (NBTE).
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  Registrar Profile & Address
                </button>
                <button
                  onClick={() => setActiveTab('units')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'units'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  Registry Units & Divisions
                </button>
                <button
                  onClick={() => setActiveTab('transcripts')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'transcripts'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  Transcripts & Verifications
                </button>
                <button
                  onClick={() => setActiveTab('statutes')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'statutes'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  Statutory Mandates & Oath
                </button>
              </div>
            </div>

            {/* Decorative background crest watermark */}
            <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none">
              <PolytechnicLogo size="lg" />
            </div>
          </div>
        </div>

        {/* TAB 1: REGISTRAR PROFILE & WELCOME ADDRESS */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            {/* Executive Profile Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Portrait & Badges */}
                <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <img
                      src={registrarInfo.photoUrl}
                      alt={registrarInfo.name}
                      className="w-52 h-64 sm:w-56 sm:h-72 object-cover rounded-3xl border-4 border-emerald-800 shadow-xl"
                    />
                    <span className="absolute -bottom-3 px-4 py-1 bg-amber-400 text-slate-950 font-black text-[11px] rounded-full uppercase tracking-wider shadow-md">
                      Office of the Registrar
                    </span>
                  </div>

                  <div className="pt-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      {registrarInfo.name}
                    </h2>
                    <p className="text-xs font-bold text-emerald-800 mt-1">
                      {registrarInfo.titles}
                    </p>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      {registrarInfo.position}
                    </p>
                  </div>

                  {/* Quick Contact Badge Pills */}
                  <div className="w-full space-y-2 pt-2 text-left">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3 text-xs">
                      <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                      <div className="truncate">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Official Email</span>
                        <a href={`mailto:${registrarInfo.email}`} className="font-semibold text-slate-800 hover:text-emerald-700 truncate block">
                          {registrarInfo.email}
                        </a>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3 text-xs">
                      <PhoneCall className="w-4 h-4 text-emerald-700 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Registry Desk Phone</span>
                        <a href={`tel:${registrarInfo.phone}`} className="font-semibold text-slate-800 hover:text-emerald-700">
                          {registrarInfo.phone}
                        </a>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3 text-xs">
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Chambers Location</span>
                        <span className="font-semibold text-slate-800 text-[11px] leading-snug">
                          {registrarInfo.officeLocation}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3 text-xs">
                      <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Official Working Hours</span>
                        <span className="font-semibold text-slate-800">
                          {registrarInfo.officeHours}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Welcome Message & Mandate */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold">
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Official Registrar's Statement & Governance Mandate</span>
                  </div>

                  <blockquote className="text-xl sm:text-2xl font-bold text-slate-800 italic border-l-4 border-amber-400 pl-4 py-1 leading-snug">
                    {registrarInfo.welcomeQuote}
                  </blockquote>

                  <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                    <p>
                      {registrarInfo.welcomeMessage1}
                    </p>
                    <p>
                      {registrarInfo.welcomeMessage2}
                    </p>
                  </div>

                  {/* Core Mandate Highlights */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Core Institutional Responsibilities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {registrarInfo.statutoryDuties.slice(0, 4).map((duty, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{duty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={onOpenAdmissions}
                      className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Apply for 2024/2025 Admissions</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('transcripts')}
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      Official Transcript Request
                    </button>
                    <button
                      onClick={onExploreCourses}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      View Accredited Programs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REGISTRY DIVISIONS & UNITS */}
        {activeTab === 'units' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Divisions & Operational Units of the Registry
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                The Registry is structured into specialized operational divisions, each directed by senior administrative officers dedicated to delivering seamless support to students, staff, and the public.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registrarInfo.registryUnits.map((unit, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
                      0{idx + 1}
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      {unit.head}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {unit.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      {unit.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      Active Operational Desk
                    </span>
                    <span>Mbaukwu Senate Wing</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TRANSCRIPTS & ACADEMIC VERIFICATIONS */}
        {activeTab === 'transcripts' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl">
                  <FileText className="w-6 h-6 text-emerald-800" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Official Academic Transcript & Verification Desk
                  </h2>
                  <p className="text-xs text-slate-500">
                    Guidelines for alumni, employers, embassies, and partner higher institutions
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 space-y-2">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  Official Registry Directive
                </h4>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                  {registrarInfo.transcriptGuidelines}
                </p>
              </div>

              {/* 3 Steps Process */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Remita Invoice Generation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Generate an official Remita Retrieval Reference (RRR) under service type "Transcript Processing Fee" through any commercial bank or online card payment.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Submission of Clearance
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Submit proof of payment alongside your Matriculation Number, Department, and official recipient email or mailing address to the Exams & Records Division.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Direct Official Dispatch
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Your certified transcript is securely stamped with the institutional embossing seal and transmitted directly to the receiving organization or university.
                  </p>
                </div>
              </div>

              {/* Interactive Inquiries Form for Verification */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  Submit Direct Registry Enquiry or Verification Request
                </h3>

                {inquirySent ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2 animate-in fade-in">
                    <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                    <h4 className="text-sm font-bold text-emerald-900">Enquiry Dispatched to Registry Desk</h4>
                    <p className="text-xs text-emerald-800 max-w-md mx-auto">
                      Thank you. Your message has been routed to the Examinations & Academic Records Division under Rev'd Can James. An administrative officer will respond within 24–48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendInquiry} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Full Name / Organization
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="e.g. David Okonkwo or Zenith Bank HR"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Official Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="e.g. registrar-inquiry@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Service Category
                      </label>
                      <select
                        value={inquirySubject}
                        onChange={(e) => setInquirySubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-700"
                      >
                        <option value="Transcript Verification">Official Transcript Verification</option>
                        <option value="Certificate Authentication">Certificate & Statement of Result Authentication</option>
                        <option value="Admissions Inquiry">JAMB CAPS & Provisional Admission Clarification</option>
                        <option value="Council Affairs & Legal">Governing Council & Statutory Affairs</option>
                        <option value="General Registry Desk">General Administrative Desk</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Enquiry Details & Matriculation Reference
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        placeholder="State candidate's matriculation number, graduation year, and specific assistance needed..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-700 resize-none"
                      />
                    </div>

                    <div className="sm:col-span-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send to Office of the Registrar</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STATUTORY MANDATES & MATRICULATION PLEDGE */}
        {activeTab === 'statutes' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Statutory Mandates & Institutional Governance
                </h2>
                <p className="text-xs text-slate-500">
                  Established under the Laws of the Federal Republic of Nigeria and the NBTE Polytechnic Regulatory Framework
                </p>
              </div>

              <div className="space-y-3">
                {registrarInfo.statutoryDuties.map((duty, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-800 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {duty}
                    </p>
                  </div>
                ))}
              </div>

              {/* Matriculation Oath Pledge Box */}
              <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-8 border border-amber-200 space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-black text-sm uppercase tracking-wider">
                  <GraduationCap className="w-5 h-5 text-amber-700" />
                  <span>The Official Matriculation Oath</span>
                </div>
                <blockquote className="text-xs sm:text-sm text-slate-800 font-semibold italic border-l-4 border-amber-500 pl-4 py-1 leading-relaxed">
                  "{registrarInfo.matriculationPledge}"
                </blockquote>
                <p className="text-[11px] text-slate-500 font-medium">
                  Administered annually by the Registrar, Rev'd Can James, to all newly admitted National Diploma (ND) and Higher National Diploma (HND) scholars at the Mbaukwu Convocation Arena.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
