import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Building2, 
  Sparkles, 
  Calendar, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Award, 
  Users, 
  Layers, 
  ExternalLink,
  ChevronRight,
  X,
  FileText,
  Briefcase,
  Cpu,
  GraduationCap,
  HelpCircle
} from 'lucide-react';
import { useDataContext } from '../context/DataContext';
import { Course, Announcement, CampusEvent, CampusFacility, CampusStatItem, RegistrarInfo, RegistrarUnitItem } from '../types';
import { PolytechnicLogo } from './PolytechnicLogo';
import { EasyPhotoUpload } from './EasyPhotoUpload';
import { AdminHodCompSciTab } from './AdminHodCompSciTab';
import { AdminProprietorTab } from './AdminProprietorTab';
import { AdminCouncilTab } from './AdminCouncilTab';
import { AdminFAQTab } from './AdminFAQTab';

interface AdminPortalProps {
  onReturnToSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onReturnToSite }) => {
  const {
    courses,
    schools,
    announcements,
    events,
    facilities,
    stats,
    generalInfo,
    registrarInfo,
    courseFormSubmissions,
    faqs,
    updateCourse,
    addCourse,
    deleteCourse,
    updateAnnouncement,
    addAnnouncement,
    deleteAnnouncement,
    updateEvent,
    addEvent,
    deleteEvent,
    updateFacility,
    addFacility,
    deleteFacility,
    updateStats,
    updateGeneralInfo,
    updateRegistrarInfo,
    resetToDefaults,
  } = useDataContext();

  // Authentication State - Restricted Exclusively to Sole Administrator
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('rmp_sole_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [adminUsername, setAdminUsername] = useState('admin@renaissancemodern.edu.ng');
  const [adminPassword, setAdminPassword] = useState('rmp2025admin');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  type AdminTab = 'announcements' | 'courses' | 'proprietor' | 'council' | 'info' | 'registrar' | 'hod_compsci' | 'stats' | 'events' | 'facilities' | 'faqs';
  const [activeTab, setActiveTab] = useState<AdminTab>('announcements');

  // Feedback Notification
  const [savedToast, setSavedToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSavedToast(msg);
    setTimeout(() => {
      setSavedToast(null);
    }, 4000);
  };

  // Login handler strictly validating Sole Admin (staff & other management restricted)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = adminUsername.trim().toLowerCase();
    const cleanPass = adminPassword.trim();

    // Verify Master Sole Admin credentials
    const isMasterAdminUser = cleanUser === 'admin@renaissancemodern.edu.ng' || cleanUser === 'admin';
    const isMasterAdminPass = cleanPass === 'rmp2025admin' || cleanPass === 'admin123';

    if (isMasterAdminUser && isMasterAdminPass) {
      try {
        sessionStorage.setItem('rmp_sole_admin_auth', 'true');
      } catch {}
      setIsAuthenticated(true);
      setLoginError('');
      showToast('Authenticated as Sole Master Administrator (Full Editorial Access)');
    } else {
      setLoginError(
        'Access Denied: Only the designated Sole Administrator possesses authority to edit website content. Academic staff, departmental officers, and other management personnel do NOT have editorial access.'
      );
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('rmp_sole_admin_auth');
    } catch {}
    setIsAuthenticated(false);
    showToast('Administrator session locked and logged out.');
  };

  // State for Course Modal (Edit or Add)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  // State for Announcement Modal (Edit or Add)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);

  // State for Event Modal (Edit or Add)
  const [editingEvent, setEditingEvent] = useState<CampusEvent | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // State for Facility Modal (Edit or Add)
  const [editingFacility, setEditingFacility] = useState<CampusFacility | null>(null);
  const [isAddingFacility, setIsAddingFacility] = useState(false);
  const [facilityEquipmentsText, setFacilityEquipmentsText] = useState('');

  // State for General Info Form
  const [infoForm, setInfoForm] = useState(generalInfo);

  // State for Registrar Info Form
  const [registrarForm, setRegistrarForm] = useState<RegistrarInfo>(registrarInfo);
  const [newDutyInput, setNewDutyInput] = useState('');
  const [isAddingUnitModal, setIsAddingUnitModal] = useState(false);
  const [editingUnitIndex, setEditingUnitIndex] = useState<number | null>(null);
  const [unitModalData, setUnitModalData] = useState<RegistrarUnitItem>({
    name: '',
    head: '',
    description: '',
  });

  // State for Stats Form
  const [statsForm, setStatsForm] = useState<CampusStatItem[]>(stats);

  // Save General Info
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateGeneralInfo(infoForm);
    showToast('Campus Information & Leadership details updated successfully!');
  };

  // Save Registrar Info
  const handleSaveRegistrar = (e: React.FormEvent) => {
    e.preventDefault();
    updateRegistrarInfo(registrarForm);
    showToast("Office of the Registrar profile for Rev'd Can James updated successfully!");
  };

  const handleAddDuty = () => {
    if (!newDutyInput.trim()) return;
    setRegistrarForm((prev) => ({
      ...prev,
      statutoryDuties: [...prev.statutoryDuties, newDutyInput.trim()],
    }));
    setNewDutyInput('');
  };

  const handleRemoveDuty = (index: number) => {
    setRegistrarForm((prev) => ({
      ...prev,
      statutoryDuties: prev.statutoryDuties.filter((_, idx) => idx !== index),
    }));
  };

  const handleOpenAddUnitModal = () => {
    setEditingUnitIndex(null);
    setUnitModalData({ name: '', head: '', description: '' });
    setIsAddingUnitModal(true);
  };

  const handleOpenEditUnitModal = (index: number) => {
    setEditingUnitIndex(index);
    setUnitModalData(registrarForm.registryUnits[index]);
    setIsAddingUnitModal(true);
  };

  const handleSaveUnitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitModalData.name.trim()) return;
    if (editingUnitIndex !== null) {
      setRegistrarForm((prev) => {
        const updated = [...prev.registryUnits];
        updated[editingUnitIndex] = unitModalData;
        return { ...prev, registryUnits: updated };
      });
    } else {
      setRegistrarForm((prev) => ({
        ...prev,
        registryUnits: [...prev.registryUnits, unitModalData],
      }));
    }
    setIsAddingUnitModal(false);
    setEditingUnitIndex(null);
    setUnitModalData({ name: '', head: '', description: '' });
  };

  const handleRemoveUnit = (index: number) => {
    setRegistrarForm((prev) => ({
      ...prev,
      registryUnits: prev.registryUnits.filter((_, idx) => idx !== index),
    }));
  };

  // Save Stats
  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    updateStats(statsForm);
    showToast('Campus Statistics updated successfully!');
  };

  // Save Facility
  const handleSaveFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFacility) return;
    const keyEquipments = facilityEquipmentsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const facilityToSave = {
      ...editingFacility,
      keyEquipments: keyEquipments.length > 0 ? keyEquipments : editingFacility.keyEquipments,
    };
    if (isAddingFacility) {
      addFacility(facilityToSave);
      showToast('New Workshop/Laboratory added successfully!');
    } else {
      updateFacility(facilityToSave);
      showToast('Facility details and photo updated successfully!');
    }
    setEditingFacility(null);
    setIsAddingFacility(false);
  };

  // Handle Reset All
  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to restore all website content to original institutional defaults?')) {
      resetToDefaults();
      setInfoForm(generalInfo);
      setRegistrarForm(registrarInfo);
      setStatsForm(stats);
      showToast('All website content restored to defaults!');
    }
  };

  // If not logged in, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-900">
        <div className="bg-white rounded-3xl max-w-lg w-full p-8 sm:p-10 shadow-2xl border border-slate-100 space-y-6">
          <div className="text-center space-y-2">
            <PolytechnicLogo size="md" className="justify-center" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mt-2 border border-amber-300">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>Sole Administrator Gateway</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 pt-1">
              Institutional Admin Console
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Renaissance Modern Polytechnic, Mbaukwu Editorial Control
            </p>
          </div>

          {/* Access Policy Restriction Alert */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-black text-amber-900 uppercase tracking-wide text-[11px]">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Strict Policy: Admin is the Sole Editor</span>
            </div>
            <p className="text-slate-700 text-[11.5px] leading-relaxed">
              Per polytechnic governing regulations, <strong>only the accredited Sole Administrator</strong> holds editorial authority over website content, curriculum, fees, and leadership directories. <strong>Staff, heads of department, and other management personnel do NOT have editing privileges.</strong>
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Sole Administrator ID / Email</span>
                <span className="text-[10px] font-bold text-emerald-700">Designated Editor</span>
              </label>
              <input
                type="email"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full px-4 py-3 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-medium"
                placeholder="admin@renaissancemodern.edu.ng"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Master Admin Passcode</span>
                <span className="text-[10px] font-bold text-slate-400">Security Key</span>
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-3 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-slate-50 focus:bg-white font-mono"
                placeholder="••••••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-950 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 border border-emerald-800"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Sign In as Sole Administrator</span>
            </button>
          </form>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={() => {
                setAdminUsername('admin@renaissancemodern.edu.ng');
                setAdminPassword('adminrmp2025');
                setLoginError('');
              }}
              className="text-emerald-800 hover:text-emerald-900 font-bold underline cursor-pointer"
            >
              Autofill Administrator Credentials (Admin Only)
            </button>
            <button
              type="button"
              onClick={onReturnToSite}
              className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
            >
              ← Return to Main Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20">
      {/* CMS Top Header */}
      <header className="bg-slate-900 text-white border-b border-emerald-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PolytechnicLogo size="sm" variant="dark" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
                  Sole Administrator Control Console
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black uppercase">
                  Sole Editor Mode
                </span>
              </div>
              <span className="text-[11px] text-slate-300 block">
                Exclusive Master Authority • Staff & Management Restricted
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleResetAll}
              title="Reset all content to original defaults"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Defaults</span>
            </button>

            <button
              onClick={onReturnToSite}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Lock Admin Session and Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock Session</span>
            </button>
          </div>
        </div>

        {/* CMS Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'announcements'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Announcements & News ({announcements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'courses'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Courses & Fees ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('proprietor')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'proprietor'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-amber-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Proprietor & Chancellor</span>
          </button>

          <button
            onClick={() => setActiveTab('council')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'council'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Poly Council & Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'info'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Rector & Campus Details</span>
          </button>

          <button
            onClick={() => setActiveTab('registrar')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'registrar'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Office of the Registrar</span>
          </button>

          <button
            onClick={() => setActiveTab('hod_compsci')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'hod_compsci'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>HOD Computer Science</span>
            {courseFormSubmissions.filter((s) => s.status === 'Pending Review').length > 0 ? (
              <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                {courseFormSubmissions.filter((s) => s.status === 'Pending Review').length} new
              </span>
            ) : (
              <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-900 text-emerald-300 border border-emerald-600 font-bold">
                {courseFormSubmissions.length} forms
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'stats'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Key Metrics & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'events'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Events & Gallery ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('facilities')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'facilities'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Labs & Facilities ({facilities.length})</span>
          </button>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500 flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold">{savedToast}</span>
        </div>
      )}

      {/* Main CMS Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sole Administrator Authority Notice */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-4 sm:p-5 rounded-3xl border border-emerald-800/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                  Exclusive Sole Administrator Authority
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 border border-emerald-600 font-black uppercase tracking-wider">
                  Staff & Management Excluded
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                You are authenticated as the <strong>Sole Master Administrator</strong>. Editorial controls across all announcements, academic courses, polytechnic council dossiers, founder details, registrar directives, and facilities are restricted exclusively to this account.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <span className="text-[11px] font-semibold text-emerald-200 bg-emerald-900/90 px-3 py-1.5 rounded-xl border border-emerald-700/80">
              Admin: <strong>admin@renaissancemodern.edu.ng</strong>
            </span>
          </div>
        </div>

        {/* TAB 1: ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Homepage Announcements & News Ticker
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage breaking notices, admission alerts, and registration deadlines displayed across the top banner and hero ticker.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingAnnouncement({
                    id: `ann-${Date.now()}`,
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    title: '',
                    badge: 'Admissions',
                    urgent: false,
                  });
                  setIsAddingAnnouncement(true);
                }}
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Announcement</span>
              </button>
            </div>

            {/* Announcements List */}
            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-300 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {ann.badge}
                      </span>
                      {ann.urgent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-100 text-red-700">
                          Urgent Notice
                        </span>
                      )}
                      <span className="text-xs text-slate-400 font-medium">
                        {ann.date}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {ann.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingAnnouncement(ann);
                        setIsAddingAnnouncement(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete announcement "${ann.title}"?`)) {
                          deleteAnnouncement(ann.id);
                          showToast('Announcement removed');
                        }
                      }}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      title="Delete Announcement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: COURSES & TUITION FEES */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Accredited Courses & Tuition Fees Directory
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Update course syllabus, change tuition amounts (₦), edit minimum O'Level credits, or introduce new approved programs.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCourse({
                    id: `course-${Date.now()}`,
                    code: 'NEW 101',
                    title: '',
                    schoolId: 'engineering',
                    schoolName: 'School of Engineering Technology',
                    level: 'ND',
                    duration: '2 Years (4 Semesters)',
                    description: '',
                    careerProspects: ['Industrial Specialist', 'Technical Consultant'],
                    entryRequirements: ['5 O Level credits in WAEC/NECO including English & Mathematics'],
                    curriculumHighlights: [
                      { semester: 'Year 1 - 1st Semester', modules: ['Introductory Technology', 'Applied Mathematics'] }
                    ],
                    totalCredits: 68,
                    accreditationStatus: 'Full NBTE Accreditation',
                    tuitionPerSession: 95000,
                  });
                  setIsAddingCourse(true);
                }}
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </button>
            </div>

            {/* Courses Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                        {c.code} • {c.level}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700">
                        ₦{c.tuitionPerSession.toLocaleString()} / yr
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 leading-snug">
                      {c.title}
                    </h3>

                    <p className="text-xs text-slate-500 font-medium line-clamp-1">
                      {c.schoolName}
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      {c.duration}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingCourse(c);
                          setIsAddingCourse(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${c.title}?`)) {
                            deleteCourse(c.id);
                            showToast(`Deleted ${c.title}`);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                        title="Delete Course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PROPRIETOR & FOUNDER */}
        {activeTab === 'proprietor' && (
          <AdminProprietorTab onShowToast={showToast} />
        )}

        {/* TAB: POLY COUNCIL & GALLERY */}
        {activeTab === 'council' && (
          <AdminCouncilTab onShowToast={showToast} />
        )}

        {/* TAB 3: CAMPUS INFORMATION & RECTOR */}
        {activeTab === 'info' && (
          <form onSubmit={handleSaveInfo} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Campus Details, Rector & Official Contacts
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Changes saved here immediately update the homepage Rector's message, contact directory, headers, and footer.
                </p>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all shrink-0"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </button>
            </div>

            {/* Admissions Application Headlines & Banners */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-700" />
                  Admissions Application Headline & Program Levels Banner
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Live in Application Modal
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Customize the primary headline and program certificate subheadline displayed at the top of the online Admission Application modal and candidate registration slips.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Application Main Headline
                  </label>
                  <input
                    type="text"
                    value={infoForm.admissionApplicationHeadline ?? '2024/2025 Admission Application'}
                    onChange={(e) => setInfoForm({ ...infoForm, admissionApplicationHeadline: e.target.value })}
                    placeholder="2024/2025 Admission Application"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Default: 2024/2025 Admission Application</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Application Subheadline (Degrees / Programs)
                  </label>
                  <input
                    type="text"
                    value={infoForm.admissionApplicationSubheadline ?? 'National Diploma (ND), HND & Professional Certificates'}
                    onChange={(e) => setInfoForm({ ...infoForm, admissionApplicationSubheadline: e.target.value })}
                    placeholder="National Diploma (ND), HND & Professional Certificates"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Default: National Diploma (ND), HND & Professional Certificates</span>
                </div>
              </div>
            </div>

            {/* Office of the Rector */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Award className="w-4 h-4 text-emerald-700" />
                Office of the Rector & Institutional Speech
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Rector Full Name
                  </label>
                  <input
                    type="text"
                    value={infoForm.rectorName}
                    onChange={(e) => setInfoForm({ ...infoForm, rectorName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Professional Titles & Fellowships
                  </label>
                  <input
                    type="text"
                    value={infoForm.rectorTitles}
                    onChange={(e) => setInfoForm({ ...infoForm, rectorTitles: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="py-1">
                <EasyPhotoUpload
                  label="Rector Official Portrait Photo"
                  value={infoForm.rectorPhotoUrl}
                  onChange={(url) => setInfoForm({ ...infoForm, rectorPhotoUrl: url })}
                  aspectRatio="portrait"
                  helperText="Upload official Rector portrait photo directly from your computer folder or phone (or drag and drop)."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Rector Quote / Headline
                </label>
                <input
                  type="text"
                  value={infoForm.rectorQuoteHeadline}
                  onChange={(e) => setInfoForm({ ...infoForm, rectorQuoteHeadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Official Speech Paragraph 1
                </label>
                <textarea
                  rows={3}
                  value={infoForm.rectorSpeechParagraph1}
                  onChange={(e) => setInfoForm({ ...infoForm, rectorSpeechParagraph1: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Official Speech Paragraph 2
                </label>
                <textarea
                  rows={3}
                  value={infoForm.rectorSpeechParagraph2}
                  onChange={(e) => setInfoForm({ ...infoForm, rectorSpeechParagraph2: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Campus Contact Directory */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <MapPin className="w-4 h-4 text-emerald-700" />
                Campus Location & Communication Channels
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Campus Physical Address
                  </label>
                  <input
                    type="text"
                    value={infoForm.address}
                    onChange={(e) => setInfoForm({ ...infoForm, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Town & LGA
                  </label>
                  <input
                    type="text"
                    value={infoForm.town}
                    onChange={(e) => setInfoForm({ ...infoForm, town: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Phone Line
                  </label>
                  <input
                    type="text"
                    value={infoForm.phonePrimary}
                    onChange={(e) => setInfoForm({ ...infoForm, phonePrimary: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Secondary Phone Line
                  </label>
                  <input
                    type="text"
                    value={infoForm.phoneSecondary}
                    onChange={(e) => setInfoForm({ ...infoForm, phoneSecondary: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Admissions Inquiries Email
                  </label>
                  <input
                    type="email"
                    value={infoForm.admissionsEmail}
                    onChange={(e) => setInfoForm({ ...infoForm, admissionsEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Registrar Secretariat Email
                  </label>
                  <input
                    type="email"
                    value={infoForm.registrarEmail}
                    onChange={(e) => setInfoForm({ ...infoForm, registrarEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Admissions Office Hours
                </label>
                <input
                  type="text"
                  value={infoForm.screeningHours}
                  onChange={(e) => setInfoForm({ ...infoForm, screeningHours: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Travel Directions from Awka Capital
                </label>
                <textarea
                  rows={2}
                  value={infoForm.travelDirections}
                  onChange={(e) => setInfoForm({ ...infoForm, travelDirections: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save All Details to Live Website</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB: OFFICE OF THE REGISTRAR (REV'D CAN JAMES) */}
        {activeTab === 'registrar' && (
          <form onSubmit={handleSaveRegistrar} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold mb-2">
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>Central Registry Administration Portal</span>
                </div>
                <h2 className="text-xl font-black text-slate-900">
                  Office of the Registrar CMS
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage professional identity for Rev'd Can James, Registry contact lines, academic governance mandates, and operational units.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRegistrarForm(registrarInfo);
                    showToast('Registrar form reset to current saved values.');
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Registrar Profile</span>
                </button>
              </div>
            </div>

            {/* Section 1: Official Credentials & Portrait */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  1. Registrar Identity & Executive Portrait
                </h3>
                <p className="text-xs text-slate-500">
                  Official name, academic standing, and leadership photograph of the Polytechnic Registrar
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Registrar Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={registrarForm.name}
                    onChange={(e) => setRegistrarForm({ ...registrarForm, name: e.target.value })}
                    placeholder="Rev'd Can James"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 font-bold"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Current Registrar: Rev'd Can James
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Academic Degrees & Professional Titles *
                  </label>
                  <input
                    type="text"
                    required
                    value={registrarForm.titles}
                    onChange={(e) => setRegistrarForm({ ...registrarForm, titles: e.target.value })}
                    placeholder="B.A. (Ed), M.Ed (Educational Management), FCIA, FIPMA, JP"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official Position Title & Institutional Portfolio *
                  </label>
                  <input
                    type="text"
                    required
                    value={registrarForm.position}
                    onChange={(e) => setRegistrarForm({ ...registrarForm, position: e.target.value })}
                    placeholder="Registrar & Secretary to the Governing Council"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <EasyPhotoUpload
                    label="Registrar Executive Official Portrait (Folder Upload or Drag & Drop)"
                    value={registrarForm.photoUrl}
                    onChange={(url) => setRegistrarForm({ ...registrarForm, photoUrl: url })}
                    aspectRatio="square"
                    helperText="Upload official formal photo of Rev'd Can James directly from your computer/device folder."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Registry Contact & Secretariat Directory */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  2. Official Registry Contact & Campus Chambers
                </h3>
                <p className="text-xs text-slate-500">
                  Direct channels for student correspondence, verification requests, and council secretariats
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official Registrar Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={registrarForm.email}
                    onChange={(e) => setRegistrarForm({ ...registrarForm, email: e.target.value })}
                    placeholder="registrar@renaissancemodern.edu.ng"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official Registry Phone Hotline *
                  </label>
                  <input
                    type="text"
                    required
                    value={registrarForm.phone}
                    onChange={(e) => setRegistrarForm({ ...registrarForm, phone: e.target.value })}
                    placeholder="+234 803 700 8821"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Chambers Location on Campus *
                  </label>
                  <input
                    type="text"
                    required
                    value={registrarForm.officeLocation}
                    onChange={(e) => setRegistrarForm({ ...registrarForm, officeLocation: e.target.value })}
                    placeholder="Administrative Complex, Ground Floor, Senate Wing, Renaissance Modern Polytechnic, Mbaukwu"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official Registry Working & Screening Hours *
                  </label>
                  <input
                    type="text"
                    required
                    value={registrarForm.officeHours}
                    onChange={(e) => setRegistrarForm({ ...registrarForm, officeHours: e.target.value })}
                    placeholder="Monday – Friday: 8:00 AM – 4:00 PM"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Official Address & Core Mandate */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  3. Welcome Statement & Registry Vision
                </h3>
                <p className="text-xs text-slate-500">
                  Official words of the Registrar to students, parents, and alumni
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Registrar Welcome Quote / Core Motto *
                  </label>
                  <input
                    type="text"
                    required
                    value={registrarForm.welcomeQuote}
                    onChange={(e) => setRegistrarForm({ ...registrarForm, welcomeQuote: e.target.value })}
                    placeholder='"The Registry is the administrative engine room dedicated to academic governance..."'
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Welcome Address — Paragraph 1 *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={registrarForm.welcomeMessage1}
                    onChange={(e) => setRegistrarForm({ ...registrarForm, welcomeMessage1: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Welcome Address — Paragraph 2 *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={registrarForm.welcomeMessage2}
                    onChange={(e) => setRegistrarForm({ ...registrarForm, welcomeMessage2: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Official Transcript Processing Directives *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={registrarForm.transcriptGuidelines}
                      onChange={(e) => setRegistrarForm({ ...registrarForm, transcriptGuidelines: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      The Matriculation Oath / Pledge *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={registrarForm.matriculationPledge}
                      onChange={(e) => setRegistrarForm({ ...registrarForm, matriculationPledge: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Statutory Duties */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    4. Statutory Duties & Responsibilities ({registrarForm.statutoryDuties.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Mandatory duties performed under the Rector, Governing Council, and NBTE charter
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {registrarForm.statutoryDuties.map((duty, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={duty}
                      onChange={(e) => {
                        const updated = [...registrarForm.statutoryDuties];
                        updated[idx] = e.target.value;
                        setRegistrarForm({ ...registrarForm, statutoryDuties: updated });
                      }}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveDuty(idx)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove Duty"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Add new duty row */}
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={newDutyInput}
                    onChange={(e) => setNewDutyInput(e.target.value)}
                    placeholder="Enter new statutory duty or governance portfolio..."
                    className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDuty();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddDuty}
                    className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Duty</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Section 5: Registry Divisions & Units */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    5. Registry Divisions & Operational Desks ({registrarForm.registryUnits.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Units operating under the Registrar (Admissions, Exams & Records, Council Affairs, Establishment)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddUnitModal}
                  className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Division / Unit</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {registrarForm.registryUnits.map((unit, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {unit.name}
                        </h4>
                        <span className="inline-block mt-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                          {unit.head}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditUnitModal(idx)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg cursor-pointer"
                          title="Edit Unit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveUnit(idx)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Delete Unit"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {unit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Save bar */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save All Registrar Details to Live Website</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB: HOD COMPUTER SCIENCE & COURSE FORM UPLOADS */}
        {activeTab === 'hod_compsci' && (
          <AdminHodCompSciTab onShowToast={showToast} />
        )}

        {/* TAB 4: STATS */}
        {activeTab === 'stats' && (
          <form onSubmit={handleSaveStats} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Homepage Metric Statistics
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  The metric badges shown in the Hero Banner (such as 70% Hands-on Workshop Ratio or 24+ Programs).
                </p>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all shrink-0"
              >
                <Save className="w-4 h-4" />
                <span>Save Statistics</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {statsForm.map((stat, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Metric Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const next = [...statsForm];
                        next[idx].label = e.target.value;
                        setStatsForm(next);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Display Value
                      </label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const next = [...statsForm];
                          next[idx].value = e.target.value;
                          setStatsForm(next);
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-black text-emerald-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Subtext / Suffix
                      </label>
                      <input
                        type="text"
                        value={stat.suffix}
                        onChange={(e) => {
                          const next = [...statsForm];
                          next[idx].suffix = e.target.value;
                          setStatsForm(next);
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-600"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Statistics to Live Site</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 5: EVENTS & GALLERY */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Campus Events & Heritage Gallery Manager
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Upload photos, announce campus events, set event dates and venues in Mbaukwu.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingEvent({
                    id: `evt-${Date.now()}`,
                    title: '',
                    category: 'Engineering & Tech',
                    date: 'Nov 12, 2025',
                    time: '10:00 AM - 3:00 PM',
                    venue: 'Polytechnic Engineering Auditorium, Mbaukwu',
                    description: '',
                    attendeesCount: 250,
                    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
                    tags: ['Innovation', 'Workshop'],
                  });
                  setIsAddingEvent(true);
                }}
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Event</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="h-44 relative bg-slate-900">
                    <img
                      src={evt.imageUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                      {evt.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{evt.date} • {evt.venue.split(',')[0]}</span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 leading-snug">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {evt.attendeesCount} Attendees
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingEvent(evt);
                            setIsAddingEvent(false);
                          }}
                          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete event "${evt.title}"?`)) {
                              deleteEvent(evt.id);
                              showToast('Event removed');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: FACILITIES */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Workshops, Laboratories & Research Facilities
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Upload workshop photos from your computer folder, edit machinery inventories, and equipment lists.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingFacility({
                    id: `fac-${Date.now()}`,
                    name: '',
                    category: 'Workshops',
                    description: '',
                    keyEquipments: [],
                    imageUrl: '',
                  });
                  setFacilityEquipmentsText('');
                  setIsAddingFacility(true);
                }}
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Workshop / Lab</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facilities.map((fac) => (
                <div
                  key={fac.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="h-44 rounded-2xl overflow-hidden relative bg-slate-900">
                      {fac.imageUrl ? (
                        <img
                          src={fac.imageUrl}
                          alt={fac.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">
                          No Photo Uploaded
                        </div>
                      )}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 text-amber-300 text-xs font-bold">
                        {fac.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        {fac.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {fac.description}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Machinery & Equipment:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {fac.keyEquipments.map((eq, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-white border border-slate-200 text-xs text-slate-700 font-medium"
                          >
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setEditingFacility(fac);
                        setFacilityEquipmentsText(fac.keyEquipments.join(', '));
                        setIsAddingFacility(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit & Change Photo</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete workshop / facility "${fac.name}"?`)) {
                          deleteFacility(fac.id);
                          showToast(`Facility "${fac.name}" removed.`);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                      title="Delete Facility"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: EDIT / ADD COURSE */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {isAddingCourse ? 'Add New Accredited Course' : `Edit: ${editingCourse.title}`}
              </h3>
              <button
                onClick={() => setEditingCourse(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isAddingCourse) {
                  addCourse(editingCourse);
                  showToast(`Added new course "${editingCourse.title}"`);
                } else {
                  updateCourse(editingCourse);
                  showToast(`Updated course "${editingCourse.title}"`);
                }
                setEditingCourse(null);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCourse.code}
                    onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value })}
                    placeholder="e.g. COM 101"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Level
                  </label>
                  <select
                    value={editingCourse.level}
                    onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="ND">National Diploma (ND)</option>
                    <option value="HND">Higher National Diploma (HND)</option>
                    <option value="Certificate">Vocational Certificate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  placeholder="e.g. Computer Science"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Academic School
                  </label>
                  <select
                    value={editingCourse.schoolId}
                    onChange={(e) => {
                      const sch = schools.find((s) => s.id === e.target.value);
                      setEditingCourse({
                        ...editingCourse,
                        schoolId: e.target.value,
                        schoolName: sch ? sch.name : editingCourse.schoolName,
                      });
                    }}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-semibold"
                  >
                    {schools.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tuition Fee Per Session (₦)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingCourse.tuitionPerSession}
                    onChange={(e) => setEditingCourse({ ...editingCourse, tuitionPerSession: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Course Description & Overview
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Course</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD ANNOUNCEMENT */}
      {editingAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {isAddingAnnouncement ? 'Post New Announcement' : 'Edit Announcement'}
              </h3>
              <button
                onClick={() => setEditingAnnouncement(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isAddingAnnouncement) {
                  addAnnouncement(editingAnnouncement);
                  showToast('Added announcement');
                } else {
                  updateAnnouncement(editingAnnouncement);
                  showToast('Updated announcement');
                }
                setEditingAnnouncement(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Announcement Title
                </label>
                <input
                  type="text"
                  required
                  value={editingAnnouncement.title}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                  placeholder="e.g. 2024/2025 Admissions Screening Commences"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Badge Category
                  </label>
                  <select
                    value={editingAnnouncement.badge}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, badge: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Portal">Portal</option>
                    <option value="Accreditation">Accreditation</option>
                    <option value="Exams">Exams</option>
                    <option value="Notice">General Notice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Publication Date
                  </label>
                  <input
                    type="text"
                    value={editingAnnouncement.date}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, date: e.target.value })}
                    placeholder="Sept 15, 2024"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="urgent-check"
                  checked={editingAnnouncement.urgent}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, urgent: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                <label htmlFor="urgent-check" className="text-xs font-bold text-slate-700">
                  Mark as Urgent Alert (Highlighted in Red)
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingAnnouncement(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Announcement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD EVENT */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {isAddingEvent ? 'Add Campus Event' : 'Edit Campus Event'}
              </h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isAddingEvent) {
                  addEvent(editingEvent);
                  showToast('Added event to gallery');
                } else {
                  updateEvent(editingEvent);
                  showToast('Updated event');
                }
                setEditingEvent(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  placeholder="e.g. 5th Matriculation Ceremony"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
                  >
                    <option value="Ceremony">Ceremony</option>
                    <option value="Engineering & Tech">Engineering & Tech</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="Academic">Academic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Event Date
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    placeholder="e.g. Nov 12, 2025"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Venue on Campus
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.venue}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  placeholder="Polytechnic Convocation Arena, Mbaukwu"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <EasyPhotoUpload
                  label="Event Cover Photo"
                  value={editingEvent.imageUrl}
                  onChange={(url) => setEditingEvent({ ...editingEvent, imageUrl: url })}
                  aspectRatio="video"
                  helperText="Upload event photo directly from your computer or phone folder (or drag and drop)."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD FACILITY */}
      {editingFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {isAddingFacility ? 'Add Workshop / Laboratory' : `Edit: ${editingFacility.name}`}
              </h3>
              <button
                onClick={() => setEditingFacility(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFacility} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Workshop / Lab Name
                </label>
                <input
                  type="text"
                  required
                  value={editingFacility.name}
                  onChange={(e) => setEditingFacility({ ...editingFacility, name: e.target.value })}
                  placeholder="e.g. Advanced Mechatronics & Robotics Incubator"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Facility Category
                </label>
                <select
                  value={editingFacility.category}
                  onChange={(e) => setEditingFacility({ ...editingFacility, category: e.target.value as CampusFacility['category'] })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
                >
                  <option value="Workshops">Workshops</option>
                  <option value="Engineering Labs">Engineering Labs</option>
                  <option value="ICT & Computing">ICT & Computing</option>
                  <option value="Library">Library</option>
                  <option value="Recreation">Recreation</option>
                </select>
              </div>

              {/* Easy Photo Upload for Facility */}
              <EasyPhotoUpload
                label="Facility / Workshop Showcase Photo"
                value={editingFacility.imageUrl}
                onChange={(url) => setEditingFacility({ ...editingFacility, imageUrl: url })}
                aspectRatio="video"
                helperText="Upload workshop or lab photo directly from your computer or phone folder."
                required
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Facility Description & Overview
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingFacility.description}
                  onChange={(e) => setEditingFacility({ ...editingFacility, description: e.target.value })}
                  placeholder="Describe training capabilities, industrial standards, and student practical workflows..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Machinery & Key Equipment (Comma separated)
                </label>
                <input
                  type="text"
                  value={facilityEquipmentsText}
                  onChange={(e) => setFacilityEquipmentsText(e.target.value)}
                  placeholder="CNC Milling Machine, TIG Welding Plant, Lathe Bed, Digital Multimeters"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Separate each piece of machinery with a comma.
                </p>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingFacility(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Facility</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REGISTRY UNIT MODAL (ADD / EDIT) */}
      {isAddingUnitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingUnitIndex !== null ? 'Edit Registry Division / Unit' : 'Add Registry Division / Unit'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Operating under the Office of the Registrar
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingUnitModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUnitModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Division / Unit Name *
                </label>
                <input
                  type="text"
                  required
                  value={unitModalData.name}
                  onChange={(e) => setUnitModalData({ ...unitModalData, name: e.target.value })}
                  placeholder="e.g. Examinations & Academic Records Division"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Designated Officer / Head of Unit *
                </label>
                <input
                  type="text"
                  required
                  value={unitModalData.head}
                  onChange={(e) => setUnitModalData({ ...unitModalData, head: e.target.value })}
                  placeholder="e.g. Principal Assistant Registrar (Exams & Records)"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Operational Scope & Key Responsibilities *
                </label>
                <textarea
                  rows={4}
                  required
                  value={unitModalData.description}
                  onChange={(e) => setUnitModalData({ ...unitModalData, description: e.target.value })}
                  placeholder="Detail operations such as transcript processing, JAMB CAPS clearance, board records, etc..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingUnitModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingUnitIndex !== null ? 'Update Unit' : 'Add Unit'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
