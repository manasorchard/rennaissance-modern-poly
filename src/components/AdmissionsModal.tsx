import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  GraduationCap, 
  FileText, 
  Printer, 
  Send, 
  ShieldCheck, 
  Sparkles,
  Award,
  ChevronRight,
  Edit3,
  Check,
  RotateCcw
} from 'lucide-react';
import { COURSES } from '../data/polytechnicData';
import { PolytechnicLogo } from './PolytechnicLogo';
import { EasyPhotoUpload } from './EasyPhotoUpload';
import { useDataContext } from '../context/DataContext';

interface AdmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
}

export const AdmissionsModal: React.FC<AdmissionsModalProps> = ({
  isOpen,
  onClose,
  preselectedCourse = '',
}) => {
  const { generalInfo, updateGeneralInfo } = useDataContext();

  const currentHeadline = generalInfo.admissionApplicationHeadline || '2024/2025 Admission Application';
  const currentSubheadline = generalInfo.admissionApplicationSubheadline || 'National Diploma (ND), HND & Professional Certificates';

  const [isEditingHeadline, setIsEditingHeadline] = useState(false);
  const [headlineEdit, setHeadlineEdit] = useState(currentHeadline);
  const [subheadlineEdit, setSubheadlineEdit] = useState(currentSubheadline);

  useEffect(() => {
    setHeadlineEdit(currentHeadline);
    setSubheadlineEdit(currentSubheadline);
  }, [currentHeadline, currentSubheadline]);

  const handleSaveHeadline = (e: React.FormEvent) => {
    e.preventDefault();
    updateGeneralInfo({
      ...generalInfo,
      admissionApplicationHeadline: headlineEdit.trim() || '2024/2025 Admission Application',
      admissionApplicationSubheadline: subheadlineEdit.trim() || 'National Diploma (ND), HND & Professional Certificates'
    });
    setIsEditingHeadline(false);
  };

  const handleResetHeadline = () => {
    setHeadlineEdit('2024/2025 Admission Application');
    setSubheadlineEdit('National Diploma (ND), HND & Professional Certificates');
  };

  const [programmeType, setProgrammeType] = useState('ND Full-Time');
  const [firstChoice, setFirstChoice] = useState(preselectedCourse || 'Computer Science');
  const [secondChoice, setSecondChoice] = useState('Electrical & Electronic Engineering Technology');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jambRegNo, setJambRegNo] = useState('');
  const [stateOfOrigin, setStateOfOrigin] = useState('Anambra State');
  const [examBody, setExamBody] = useState('WAEC');
  const [passportPhoto, setPassportPhoto] = useState('');
  const [submittedAppNumber, setSubmittedAppNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appNo = `RMP/ADM/2025/${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedAppNumber(appNo);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
        {/* Header */}
        <div className="sticky top-0 bg-emerald-900 text-white p-5 sm:p-6 rounded-t-3xl z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <PolytechnicLogo size="sm" showText={false} />
              {!isEditingHeadline ? (
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-white">
                      {currentHeadline}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditingHeadline(true)}
                      className="p-1 rounded-md text-emerald-300 hover:text-amber-300 hover:bg-emerald-800/80 transition-colors cursor-pointer"
                      title="Edit headline & subheadline"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-emerald-300">
                    {currentSubheadline}
                  </p>
                </div>
              ) : (
                <span className="text-xs font-bold text-amber-300">
                  Editing Admission Modal Headlines
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-emerald-800 text-white transition-colors shrink-0"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Inline Edit Form */}
          {isEditingHeadline && (
            <form onSubmit={handleSaveHeadline} className="mt-4 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-emerald-200 uppercase tracking-wider mb-1">
                  Main Headline (e.g. Academic Session & Title)
                </label>
                <input
                  type="text"
                  value={headlineEdit}
                  onChange={(e) => setHeadlineEdit(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 text-white border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="2024/2025 Admission Application"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-emerald-200 uppercase tracking-wider mb-1">
                  Subheadline (e.g. Program Levels & Certificates)
                </label>
                <input
                  type="text"
                  value={subheadlineEdit}
                  onChange={(e) => setSubheadlineEdit(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 text-white border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="National Diploma (ND), HND & Professional Certificates"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleResetHeadline}
                  className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Default</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setHeadlineEdit(currentHeadline);
                      setSubheadlineEdit(currentSubheadline);
                      setIsEditingHeadline(false);
                    }}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg text-emerald-200 hover:bg-emerald-800/80 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-black rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Headline</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submittedAppNumber ? (
            /* Success Slip View */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-700" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Application Submitted Successfully!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your admission dossier has been registered with the Admissions Office of Renaissance Modern Polytechnic Mbaukwu.
                </p>
              </div>

              {/* Printable Acknowledgement Slip */}
              <div className="p-6 rounded-2xl bg-slate-50 border-2 border-dashed border-emerald-700 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Application Reference No.</span>
                    <p className="text-base font-mono font-black text-emerald-900">
                      {submittedAppNumber}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 font-bold text-xs">
                    Screening Status: Pending Review
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {passportPhoto && (
                    <div className="shrink-0 text-center">
                      <img
                        src={passportPhoto}
                        alt="Applicant Passport"
                        className="w-24 h-28 object-cover rounded-xl border-2 border-emerald-800 shadow-sm"
                      />
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mt-1">Verified Photo</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 text-xs flex-1">
                    <div>
                      <span className="text-slate-400 font-semibold block">Applicant Name:</span>
                      <strong className="text-slate-900">{fullName || 'Candidate'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Programme Applied:</span>
                      <strong className="text-slate-900">{programmeType}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">First Choice Course:</span>
                      <strong className="text-emerald-800">{firstChoice}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">JAMB Registration:</span>
                      <strong className="text-slate-900">{jambRegNo || 'N/A (Direct Certificate)'}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 italic">
                  Note: Please bring a printed copy of this slip along with original O'Level certificates for physical screening at the Polytechnic Senate Building, Mbaukwu.
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow"
                >
                  <Printer className="w-4 h-4" />
                  Print Application Slip
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Programme Track Option Tabs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Programme Type / Admission Option</span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 normal-case">
                    Selected: {programmeType}
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                  {[
                    { id: 'ND Full-Time', label: 'ND Full-Time', desc: 'JAMB UTME' },
                    { id: 'ND Part-Time', label: 'ND Part-Time', desc: 'Weekend & Evening' },
                    { id: 'HND', label: 'HND Direct', desc: 'Post-ND Track' },
                    { id: 'Vocational Certificate', label: 'Vocational Cert', desc: 'Enterprise Skills' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setProgrammeType(tab.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                        programmeType === tab.id
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                          programmeType === tab.id
                            ? 'bg-emerald-950 text-amber-300'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {tab.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  JAMB UTME Registration No. (Optional for Direct/Certificate)
                </label>
                <input
                  type="text"
                  value={jambRegNo}
                  onChange={(e) => setJambRegNo(e.target.value)}
                  placeholder="e.g. 202410294821EF"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none uppercase font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    First Choice Course of Study
                  </label>
                  <select
                    value={firstChoice}
                    onChange={(e) => setFirstChoice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title} ({c.level})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Second Choice Alternative Course
                  </label>
                  <select
                    value={secondChoice}
                    onChange={(e) => setSecondChoice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title} ({c.level})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Applicant Full Name (As in O'Level / JAMB)
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Chukwuemeka Godswill Okafor"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number (WhatsApp Active)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    State of Origin
                  </label>
                  <select
                    value={stateOfOrigin}
                    onChange={(e) => setStateOfOrigin(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="Anambra State">Anambra State</option>
                    <option value="Enugu State">Enugu State</option>
                    <option value="Imo State">Imo State</option>
                    <option value="Abia State">Abia State</option>
                    <option value="Ebonyi State">Ebonyi State</option>
                    <option value="Delta State">Delta State</option>
                    <option value="Rivers State">Rivers State</option>
                    <option value="Lagos State">Lagos State</option>
                    <option value="Other States">Other Nigerian States</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    O'Level Examination Board
                  </label>
                  <select
                    value={examBody}
                    onChange={(e) => setExamBody(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="WAEC">WAEC (WASSCE)</option>
                    <option value="NECO">NECO (SSCE)</option>
                    <option value="NABTEB">NABTEB (NTC/NBC)</option>
                  </select>
                </div>
              </div>

              {/* Applicant Passport Photo Upload */}
              <EasyPhotoUpload
                label="Applicant Passport Photograph"
                value={passportPhoto}
                onChange={(url) => setPassportPhoto(url)}
                aspectRatio="square"
                helperText="Upload candidate's passport photo directly from computer folder or phone (or drag and drop)."
              />

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Admission Application</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                Renaissance Modern Polytechnic Mbaukwu does not charge unofficial admission agents. All payments are made strictly via Remita or approved bank channels.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
