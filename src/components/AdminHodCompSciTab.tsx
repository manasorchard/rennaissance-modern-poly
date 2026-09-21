import React, { useState } from 'react';
import { 
  Cpu, 
  Save, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search, 
  UserCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  X, 
  FileText, 
  FileCheck, 
  ShieldCheck, 
  Filter, 
  Sparkles,
  ExternalLink,
  MessageSquare,
  Building2,
  Calendar
} from 'lucide-react';
import { useDataContext } from '../context/DataContext';
import { HodComputerScienceInfo, CourseFormSubmission, LevelAdviser, DepartmentNotice } from '../types';
import { EasyPhotoUpload } from './EasyPhotoUpload';

interface AdminHodCompSciTabProps {
  onShowToast: (msg: string) => void;
}

export const AdminHodCompSciTab: React.FC<AdminHodCompSciTabProps> = ({ onShowToast }) => {
  const {
    hodCompSciInfo,
    courseFormSubmissions,
    updateHodCompSciInfo,
    updateCourseFormStatus,
    deleteCourseFormSubmission,
  } = useDataContext();

  // Local form state for HOD Information
  const [hodForm, setHodForm] = useState<HodComputerScienceInfo>(hodCompSciInfo);

  // Sub-view within HOD Admin tab
  type HodAdminSubView = 'submissions' | 'profile' | 'directives' | 'advisers' | 'notices';
  const [subView, setSubView] = useState<HodAdminSubView>('submissions');

  // ================= SUBMISSIONS MANAGEMENT STATE =================
  const [searchMatric, setSearchMatric] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Inspection & Review Modal
  const [inspectingSubmission, setInspectingSubmission] = useState<CourseFormSubmission | null>(null);
  const [reviewStatus, setReviewStatus] = useState<CourseFormSubmission['status']>('Approved');
  const [reviewRemarks, setReviewRemarks] = useState('');
  const [previewDocUrl, setPreviewDocUrl] = useState<string | null>(null);

  // Level Adviser Modal
  const [isAdviserModalOpen, setIsAdviserModalOpen] = useState(false);
  const [editingAdviserIndex, setEditingAdviserIndex] = useState<number | null>(null);
  const [adviserModalData, setAdviserModalData] = useState<LevelAdviser>({
    level: 'ND I',
    name: '',
    titles: '',
    phone: '',
    email: '',
    office: '',
  });

  // Department Notice Modal
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [editingNoticeIndex, setEditingNoticeIndex] = useState<number | null>(null);
  const [noticeModalData, setNoticeModalData] = useState<DepartmentNotice>({
    id: '',
    title: '',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    category: 'Course Registration',
    urgent: false,
    content: '',
  });

  // Required Document Input
  const [newDocumentInput, setNewDocumentInput] = useState('');

  // Save HOD Info changes
  const handleSaveHodGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateHodCompSciInfo(hodForm);
    onShowToast('HOD Computer Science settings and profile updated successfully!');
  };

  // Filter submissions
  const filteredSubmissions = courseFormSubmissions.filter((sub) => {
    const matchesSearch =
      searchMatric.trim() === '' ||
      sub.matricNo.toLowerCase().includes(searchMatric.trim().toLowerCase()) ||
      sub.fullName.toLowerCase().includes(searchMatric.trim().toLowerCase());

    const matchesLevel = filterLevel === 'All' || sub.level === filterLevel;
    const matchesStatus = filterStatus === 'All' || sub.status === filterStatus;

    return matchesSearch && matchesLevel && matchesStatus;
  });

  // Open review modal
  const handleOpenReview = (submission: CourseFormSubmission) => {
    setInspectingSubmission(submission);
    setReviewStatus(submission.status);
    setReviewRemarks(submission.hodRemarks || '');
  };

  // Submit Review
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectingSubmission) return;

    updateCourseFormStatus(inspectingSubmission.id, reviewStatus, reviewRemarks.trim());
    onShowToast(`Course Form for ${inspectingSubmission.fullName} marked as "${reviewStatus}".`);
    setInspectingSubmission(null);
  };

  // Quick preset remark templates
  const handleInsertPresetRemark = (text: string) => {
    setReviewRemarks(text);
  };

  // Delete submission record
  const handleDeleteSubmission = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the course form submission for ${name}?`)) {
      deleteCourseFormSubmission(id);
      onShowToast(`Course form submission for ${name} removed.`);
      if (inspectingSubmission?.id === id) {
        setInspectingSubmission(null);
      }
    }
  };

  // Adviser handlers
  const handleOpenAddAdviser = () => {
    setEditingAdviserIndex(null);
    setAdviserModalData({
      level: 'ND I',
      name: '',
      titles: '',
      phone: '',
      email: '',
      office: '',
    });
    setIsAdviserModalOpen(true);
  };

  const handleOpenEditAdviser = (index: number) => {
    setEditingAdviserIndex(index);
    setAdviserModalData(hodForm.levelAdvisers[index]);
    setIsAdviserModalOpen(true);
  };

  const handleSaveAdviserModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adviserModalData.name.trim()) return;

    if (editingAdviserIndex !== null) {
      const updated = [...hodForm.levelAdvisers];
      updated[editingAdviserIndex] = adviserModalData;
      const newForm = { ...hodForm, levelAdvisers: updated };
      setHodForm(newForm);
      updateHodCompSciInfo(newForm);
      onShowToast(`Level Adviser ${adviserModalData.name} updated.`);
    } else {
      const newForm = {
        ...hodForm,
        levelAdvisers: [...hodForm.levelAdvisers, adviserModalData],
      };
      setHodForm(newForm);
      updateHodCompSciInfo(newForm);
      onShowToast(`New Level Adviser ${adviserModalData.name} added.`);
    }
    setIsAdviserModalOpen(false);
  };

  const handleRemoveAdviser = (index: number) => {
    const newForm = {
      ...hodForm,
      levelAdvisers: hodForm.levelAdvisers.filter((_, idx) => idx !== index),
    };
    setHodForm(newForm);
    updateHodCompSciInfo(newForm);
    onShowToast('Level Adviser removed.');
  };

  // Notice handlers
  const handleOpenAddNotice = () => {
    setEditingNoticeIndex(null);
    setNoticeModalData({
      id: `notice-cs-${Date.now().toString(36)}`,
      title: '',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: 'Course Registration',
      urgent: false,
      content: '',
    });
    setIsNoticeModalOpen(true);
  };

  const handleOpenEditNotice = (index: number) => {
    setEditingNoticeIndex(index);
    setNoticeModalData(hodForm.notices[index]);
    setIsNoticeModalOpen(true);
  };

  const handleSaveNoticeModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeModalData.title.trim()) return;

    if (editingNoticeIndex !== null) {
      const updated = [...hodForm.notices];
      updated[editingNoticeIndex] = noticeModalData;
      const newForm = { ...hodForm, notices: updated };
      setHodForm(newForm);
      updateHodCompSciInfo(newForm);
      onShowToast('Department notice updated.');
    } else {
      const newForm = {
        ...hodForm,
        notices: [noticeModalData, ...hodForm.notices],
      };
      setHodForm(newForm);
      updateHodCompSciInfo(newForm);
      onShowToast('New department notice published.');
    }
    setIsNoticeModalOpen(false);
  };

  const handleRemoveNotice = (index: number) => {
    const newForm = {
      ...hodForm,
      notices: hodForm.notices.filter((_, idx) => idx !== index),
    };
    setHodForm(newForm);
    updateHodCompSciInfo(newForm);
    onShowToast('Department notice deleted.');
  };

  // Required Document handlers
  const handleAddDocument = () => {
    if (!newDocumentInput.trim()) return;
    const newForm = {
      ...hodForm,
      requiredSubmissionDocuments: [...hodForm.requiredSubmissionDocuments, newDocumentInput.trim()],
    };
    setHodForm(newForm);
    updateHodCompSciInfo(newForm);
    setNewDocumentInput('');
    onShowToast('Verification requirement added to student checklist.');
  };

  const handleRemoveDocument = (index: number) => {
    const newForm = {
      ...hodForm,
      requiredSubmissionDocuments: hodForm.requiredSubmissionDocuments.filter((_, idx) => idx !== index),
    };
    setHodForm(newForm);
    updateHodCompSciInfo(newForm);
    onShowToast('Requirement removed.');
  };

  // Stats calculation
  const totalSubmissions = courseFormSubmissions.length;
  const pendingCount = courseFormSubmissions.filter((s) => s.status === 'Pending Review').length;
  const approvedCount = courseFormSubmissions.filter((s) => s.status === 'Approved').length;
  const correctionCount = courseFormSubmissions.filter((s) => s.status === 'Requires Correction').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* HEADER SUMMARY CARD */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>Academic Departmental Administration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Head of Department (HOD) Computer Science Desk
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Manage HOD executive profile, departmental course registration directives, Level Advisers roster, notices, and review live student Course Form uploads with official approval clearance.
          </p>
        </div>

        {/* Submissions KPI Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto shrink-0">
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Forms</span>
            <span className="text-lg font-black text-white">{totalSubmissions}</span>
          </div>

          <div className="bg-blue-950/60 p-3 rounded-2xl border border-blue-800/50 text-center">
            <span className="text-[10px] text-blue-300 uppercase font-bold block">Pending</span>
            <span className="text-lg font-black text-blue-400">{pendingCount}</span>
          </div>

          <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800/50 text-center">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block">Approved</span>
            <span className="text-lg font-black text-emerald-400">{approvedCount}</span>
          </div>

          <div className="bg-amber-950/60 p-3 rounded-2xl border border-amber-800/50 text-center">
            <span className="text-[10px] text-amber-300 uppercase font-bold block">Correction</span>
            <span className="text-lg font-black text-amber-400">{correctionCount}</span>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setSubView('submissions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            subView === 'submissions'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <FileCheck className="w-4 h-4 text-amber-400" />
          <span>Course Form Submissions</span>
          {pendingCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
              {pendingCount} new
            </span>
          )}
        </button>

        <button
          onClick={() => setSubView('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            subView === 'profile'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-4 h-4 text-amber-400" />
          <span>HOD Executive Profile & Photo</span>
        </button>

        <button
          onClick={() => setSubView('directives')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            subView === 'directives'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Session, Deadlines & Guidelines</span>
        </button>

        <button
          onClick={() => setSubView('advisers')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            subView === 'advisers'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Level Advisers ({hodForm.levelAdvisers.length})</span>
        </button>

        <button
          onClick={() => setSubView('notices')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            subView === 'notices'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Department Notices ({hodForm.notices.length})</span>
        </button>
      </div>

      {/* ================= VIEW 1: SUBMISSIONS MANAGEMENT DESK ================= */}
      {subView === 'submissions' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-700" />
                <span>Student Departmental Course Form Uploads</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review uploaded course registration sheets, inspect registered courses, and issue official HOD clearance.
              </p>
            </div>

            <div className="text-xs text-slate-500 font-bold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              Showing {filteredSubmissions.length} of {courseFormSubmissions.length} Submissions
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchMatric}
                onChange={(e) => setSearchMatric(e.target.value)}
                placeholder="Search by Matric No or Name..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 shrink-0">Level:</label>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-bold"
              >
                <option value="All">All Levels (ND & HND)</option>
                <option value="ND I">ND I</option>
                <option value="ND II">ND II</option>
                <option value="HND I">HND I</option>
                <option value="HND II">HND II</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600 shrink-0">Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-bold"
              >
                <option value="All">All Statuses</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Approved">Approved</option>
                <option value="Requires Correction">Requires Correction</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Submissions Table */}
          {filteredSubmissions.length > 0 ? (
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/75 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Matric No & Name</th>
                    <th className="p-3.5">Level & Session</th>
                    <th className="p-3.5">Units & Courses</th>
                    <th className="p-3.5">Uploaded File</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Submitted</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5">
                        <div className="font-mono font-bold text-slate-900">{sub.matricNo}</div>
                        <div className="text-slate-600 font-semibold">{sub.fullName}</div>
                        <div className="text-[10px] text-slate-400">{sub.phone}</div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {sub.level}
                        </span>
                        <div className="text-[11px] text-slate-500 mt-1">
                          {sub.session} ({sub.semester})
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-black text-slate-800">{sub.totalCredits} Units</span>
                        <div className="text-[11px] text-slate-500">
                          {sub.registeredCourses.length} Registered
                        </div>
                      </td>

                      <td className="p-3.5">
                        {sub.fileDataUrl ? (
                          <button
                            type="button"
                            onClick={() => setPreviewDocUrl(sub.fileDataUrl)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-bold border border-slate-200 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="truncate max-w-[120px]">{sub.fileName}</span>
                          </button>
                        ) : (
                          <span className="text-slate-400 italic">No file attached</span>
                        )}
                        <div className="text-[10px] text-slate-400 mt-0.5">{sub.fileSize}</div>
                      </td>

                      <td className="p-3.5">
                        {sub.status === 'Approved' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Approved</span>
                          </span>
                        ) : sub.status === 'Requires Correction' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200">
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                            <span>Correction</span>
                          </span>
                        ) : sub.status === 'Rejected' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold border border-red-200">
                            <X className="w-3 h-3 text-red-600" />
                            <span>Rejected</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200">
                            <Clock className="w-3 h-3 text-blue-600" />
                            <span>Pending</span>
                          </span>
                        )}

                        {sub.hodRemarks && (
                          <div className="text-[10px] text-slate-500 italic truncate max-w-[150px] mt-1" title={sub.hodRemarks}>
                            "{sub.hodRemarks}"
                          </div>
                        )}
                      </td>

                      <td className="p-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                        {sub.submittedAt}
                      </td>

                      <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleOpenReview(sub)}
                          className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer shadow-2xs"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Review</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteSubmission(sub.id, sub.fullName)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Submission Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <FileCheck className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-slate-700">No course form submissions match your filter</p>
              <p className="text-[11px] text-slate-500">Try changing the level or status filter, or clear the search query.</p>
            </div>
          )}
        </div>
      )}

      {/* ================= VIEW 2: HOD EXECUTIVE PROFILE ================= */}
      {subView === 'profile' && (
        <form onSubmit={handleSaveHodGeneral} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-700" />
                <span>Head of Department (HOD) Official Profile & Photo</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Update the official name, credentials, executive portrait, and contact channels displayed to students and visitors.
              </p>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all shrink-0"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Photo Upload Column */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                HOD Official Executive Portrait
              </label>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <img
                  src={hodForm.photoUrl}
                  alt={hodForm.name}
                  referrerPolicy="no-referrer"
                  className="w-36 h-36 mx-auto rounded-2xl object-cover border-2 border-emerald-300 shadow-sm"
                />

                <EasyPhotoUpload
                  label="Upload HOD Portrait Photo (Browse Folder)"
                  value={hodForm.photoUrl}
                  onChange={(url: string) => setHodForm({ ...hodForm, photoUrl: url })}
                  aspectRatio="portrait"
                />
              </div>
            </div>

            {/* Profile Fields Column (2 cols) */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    HOD Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={hodForm.name}
                    onChange={(e) => setHodForm({ ...hodForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Academic Qualifications & Fellowships *
                  </label>
                  <input
                    type="text"
                    required
                    value={hodForm.titles}
                    onChange={(e) => setHodForm({ ...hodForm, titles: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Designation / Statutory Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={hodForm.position}
                    onChange={(e) => setHodForm({ ...hodForm, position: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official Department Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={hodForm.email}
                    onChange={(e) => setHodForm({ ...hodForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    HOD Consultation Phone Hotline *
                  </label>
                  <input
                    type="text"
                    required
                    value={hodForm.phone}
                    onChange={(e) => setHodForm({ ...hodForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Office Consultation Hours *
                  </label>
                  <input
                    type="text"
                    required
                    value={hodForm.officeHours}
                    onChange={(e) => setHodForm({ ...hodForm, officeHours: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Department Physical Office Location *
                </label>
                <input
                  type="text"
                  required
                  value={hodForm.officeLocation}
                  onChange={(e) => setHodForm({ ...hodForm, officeLocation: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  HOD Welcome Remarks to Students
                </label>
                <textarea
                  rows={3}
                  value={hodForm.welcomeStatement}
                  onChange={(e) => setHodForm({ ...hodForm, welcomeStatement: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Department Vision & Technical Mandate
                </label>
                <textarea
                  rows={2}
                  value={hodForm.departmentMission}
                  onChange={(e) => setHodForm({ ...hodForm, departmentMission: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 leading-relaxed"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ================= VIEW 3: SESSION, DEADLINES & GUIDELINES ================= */}
      {subView === 'directives' && (
        <form onSubmit={handleSaveHodGeneral} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-700" />
                <span>Academic Session, Submission Deadline & Directives</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Set active session parameters and instructions that guide student course form uploads.
              </p>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all shrink-0"
            >
              <Save className="w-4 h-4" />
              <span>Save Directives</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Active Academic Session *
              </label>
              <input
                type="text"
                required
                value={hodForm.academicSession}
                onChange={(e) => setHodForm({ ...hodForm, academicSession: e.target.value })}
                placeholder="e.g. 2024/2025"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Active Semester *
              </label>
              <select
                value={hodForm.activeSemester}
                onChange={(e) => setHodForm({ ...hodForm, activeSemester: e.target.value as any })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 bg-white font-bold"
              >
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Course Form Submission Deadline *
              </label>
              <input
                type="text"
                required
                value={hodForm.courseFormDeadline}
                onChange={(e) => setHodForm({ ...hodForm, courseFormDeadline: e.target.value })}
                placeholder="e.g. Friday, 29th November 2024 (5:00 PM)"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 font-bold text-amber-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Course Registration & Upload Instructions for Students *
            </label>
            <textarea
              rows={5}
              required
              value={hodForm.courseRegistrationInstructions}
              onChange={(e) => setHodForm({ ...hodForm, courseRegistrationInstructions: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 leading-relaxed font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Displayed prominently on the student Course Form Upload Desk. Numbered steps are recommended.
            </p>
          </div>

          {/* Required Submission Documents Checklist */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Required Submission Documents Checklist ({hodForm.requiredSubmissionDocuments.length})</span>
            </h4>

            <div className="space-y-2">
              {hodForm.requiredSubmissionDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">{doc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveDocument(idx)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newDocumentInput}
                onChange={(e) => setNewDocumentInput(e.target.value)}
                placeholder="Add document requirement (e.g. Clearance Certificate from Bursary)..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDocument();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddDocument}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Requirement</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ================= VIEW 4: LEVEL ADVISERS ROSTER ================= */}
      {subView === 'advisers' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Computer Science Level Advisers Directory</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Assign and manage academic advisers for ND I, ND II, HND I, and HND II levels.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddAdviser}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Level Adviser</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hodForm.levelAdvisers.map((adv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-white text-[10px] font-black uppercase">
                      {adv.level} Course Adviser
                    </span>
                    <h4 className="text-sm font-black text-slate-900 mt-1.5">{adv.name}</h4>
                    <p className="text-xs font-semibold text-emerald-700">{adv.titles}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEditAdviser(idx)}
                      className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveAdviser(idx)}
                      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{adv.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate">{adv.email}</span>
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

      {/* ================= VIEW 5: DEPARTMENT NOTICES ================= */}
      {subView === 'notices' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <span>Departmental Notices & Official Bulletins</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Broadcast urgent deadlines, examination schedules, and laboratory updates to students.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddNotice}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish New Notice</span>
            </button>
          </div>

          <div className="space-y-3">
            {hodForm.notices.map((notice, idx) => (
              <div
                key={notice.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2 relative"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-800 text-white">
                      {notice.category}
                    </span>
                    {notice.urgent && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600 text-white">
                        Urgent
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 font-bold">{notice.date}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEditNotice(idx)}
                      className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveNotice(idx)}
                      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-xs font-black text-slate-900">{notice.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{notice.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= REVIEW & CLEARANCE MODAL ================= */}
      {inspectingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-black text-slate-900">
                  Review & Endorse Course Form
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingSubmission(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Student Dossier Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Matric No</span>
                <span className="font-mono font-black text-slate-900">{inspectingSubmission.matricNo}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Full Name</span>
                <span className="font-bold text-slate-900 truncate block">{inspectingSubmission.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Level & Semester</span>
                <span className="font-bold text-slate-900">{inspectingSubmission.level} ({inspectingSubmission.semester})</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Credits</span>
                <span className="font-black text-emerald-800">{inspectingSubmission.totalCredits} Units</span>
              </div>
            </div>

            {/* Registered Courses Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Courses Listed by Student ({inspectingSubmission.registeredCourses.length} Courses):
              </span>
              <div className="max-h-36 overflow-y-auto bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                {inspectingSubmission.registeredCourses.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 py-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Uploaded File Link & Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Attached Form Document:
              </span>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-slate-900 truncate max-w-xs">
                    {inspectingSubmission.fileName}
                  </span>
                  <span className="text-[10px] text-slate-400">({inspectingSubmission.fileSize})</span>
                </div>

                {inspectingSubmission.fileDataUrl && (
                  <button
                    type="button"
                    onClick={() => setPreviewDocUrl(inspectingSubmission.fileDataUrl)}
                    className="px-3 py-1 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Document</span>
                  </button>
                )}
              </div>
            </div>

            {/* Review Form */}
            <form onSubmit={handleSaveReview} className="space-y-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  HOD Clearance Status *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Approved', label: 'Approve Form', color: 'border-emerald-500 bg-emerald-50 text-emerald-900' },
                    { id: 'Requires Correction', label: 'Require Correction', color: 'border-amber-500 bg-amber-50 text-amber-900' },
                    { id: 'Pending Review', label: 'Mark Pending', color: 'border-blue-500 bg-blue-50 text-blue-900' },
                    { id: 'Rejected', label: 'Reject Form', color: 'border-red-500 bg-red-50 text-red-900' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                        reviewStatus === opt.id ? opt.color + ' ring-2 ring-emerald-600 font-black' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reviewStatus"
                        value={opt.id}
                        checked={reviewStatus === opt.id}
                        onChange={() => setReviewStatus(opt.id as any)}
                        className="hidden"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Official HOD Endorsement Remarks / Directives
                  </label>
                  <span className="text-[10px] text-slate-400">Visible to student on portal</span>
                </div>
                <textarea
                  rows={3}
                  value={reviewRemarks}
                  onChange={(e) => setReviewRemarks(e.target.value)}
                  placeholder="Enter clearance note, endorsement remarks, or instructions if correction is needed..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 text-[10px]">
                  <span className="text-slate-400 font-bold">Presets:</span>
                  <button
                    type="button"
                    onClick={() => handleInsertPresetRemark('Course form verified and approved for 1st Semester examinations.')}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 cursor-pointer"
                  >
                    Clear for Exams
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertPresetRemark('Level Adviser stamp missing. Please obtain endorsement and re-upload.')}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 cursor-pointer"
                  >
                    Stamp Missing
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertPresetRemark('Total credit units exceed NBTE 24-unit limit. Drop non-compulsory electives.')}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 cursor-pointer"
                  >
                    Exceeds Units
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleDeleteSubmission(inspectingSubmission.id, inspectingSubmission.fullName)}
                  className="px-3.5 py-2 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Delete Record
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setInspectingSubmission(null)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Save HOD Decision
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= LEVEL ADVISER EDIT/ADD MODAL ================= */}
      {isAdviserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">
                {editingAdviserIndex !== null ? 'Edit Level Adviser' : 'Add New Level Adviser'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAdviserModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAdviserModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Academic Level *</label>
                <select
                  value={adviserModalData.level}
                  onChange={(e) => setAdviserModalData({ ...adviserModalData, level: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                >
                  <option value="ND I">ND I</option>
                  <option value="ND II">ND II</option>
                  <option value="HND I">HND I</option>
                  <option value="HND II">HND II</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={adviserModalData.name}
                  onChange={(e) => setAdviserModalData({ ...adviserModalData, name: e.target.value })}
                  placeholder="e.g. Mr. Obinna K. Okonkwo"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Degrees & Titles *</label>
                <input
                  type="text"
                  required
                  value={adviserModalData.titles}
                  onChange={(e) => setAdviserModalData({ ...adviserModalData, titles: e.target.value })}
                  placeholder="e.g. M.Sc (Software Eng.), MNCS"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={adviserModalData.phone}
                  onChange={(e) => setAdviserModalData({ ...adviserModalData, phone: e.target.value })}
                  placeholder="e.g. +234 803 111 2233"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={adviserModalData.email}
                  onChange={(e) => setAdviserModalData({ ...adviserModalData, email: e.target.value })}
                  placeholder="e.g. o.okonkwo@renaissancemodern.edu.ng"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Office Room *</label>
                <input
                  type="text"
                  required
                  value={adviserModalData.office}
                  onChange={(e) => setAdviserModalData({ ...adviserModalData, office: e.target.value })}
                  placeholder="e.g. CS Lab 1 Office, Ground Floor"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAdviserModalOpen(false)}
                  className="px-3.5 py-1.5 border border-slate-200 text-slate-600 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-800 text-white rounded-xl font-bold"
                >
                  Save Adviser
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= NOTICE EDIT/ADD MODAL ================= */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">
                {editingNoticeIndex !== null ? 'Edit Notice' : 'Publish Department Notice'}
              </h3>
              <button
                type="button"
                onClick={() => setIsNoticeModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNoticeModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={noticeModalData.title}
                  onChange={(e) => setNoticeModalData({ ...noticeModalData, title: e.target.value })}
                  placeholder="e.g. Mandatory Course Form Submission Deadline"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={noticeModalData.category}
                    onChange={(e) => setNoticeModalData({ ...noticeModalData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Course Registration">Course Registration</option>
                    <option value="Exam Clearance">Exam Clearance</option>
                    <option value="Lab Timetable">Lab Timetable</option>
                    <option value="SIWES">SIWES</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={noticeModalData.date}
                    onChange={(e) => setNoticeModalData({ ...noticeModalData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notice Content *</label>
                <textarea
                  rows={4}
                  required
                  value={noticeModalData.content}
                  onChange={(e) => setNoticeModalData({ ...noticeModalData, content: e.target.value })}
                  placeholder="Enter notice details for students..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 leading-relaxed"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={noticeModalData.urgent}
                  onChange={(e) => setNoticeModalData({ ...noticeModalData, urgent: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded-sm"
                />
                <span className="font-bold text-red-700">Flag as Urgent / High Priority</span>
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNoticeModalOpen(false)}
                  className="px-3.5 py-1.5 border border-slate-200 text-slate-600 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-800 text-white rounded-xl font-bold"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DOCUMENT PREVIEW MODAL ================= */}
      {previewDocUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <h3 className="text-sm font-black text-slate-900">
                  Course Form Document Viewer
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
                  alt="Course Registration Form"
                  className="max-h-[65vh] w-auto object-contain"
                />
              ) : (
                <div className="p-8 text-center space-y-2">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">Course Form Uploaded</p>
                  <p className="text-[11px] text-slate-500">Standard PDF / Document File</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setPreviewDocUrl(null)}
                className="px-5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
