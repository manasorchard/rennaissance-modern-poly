import React, { useState, useEffect, useRef } from 'react';
import { PolytechnicLogo } from './PolytechnicLogo';
import { NavSection } from '../types';
import { 
  Menu, 
  X, 
  GraduationCap, 
  BookOpen, 
  Image as GalleryIcon, 
  UserCheck, 
  PhoneCall, 
  ChevronRight, 
  Sparkles,
  MapPin,
  ShieldCheck,
  Building2,
  Settings,
  FileText,
  Cpu,
  Award,
  Users,
  ChevronDown,
  Home,
  User,
  Camera,
  HeartHandshake,
  Compass,
  Lock
} from 'lucide-react';
import { SitewideSearch } from './SitewideSearch';

interface NavbarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onOpenAdmissions: (courseTitle?: string) => void;
  onOpenPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenAdmissions,
  onOpenPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'proprietor' | 'council' | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (section: NavSection) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Institutional Notification Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-emerald-950/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              NBTE Approved Polytechnic
            </span>
            <span className="text-slate-600">|</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              Mbaukwu, Awka South LGA, Anambra State
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300 flex-wrap justify-end">
            <div className="hidden md:flex items-center gap-1 text-amber-300 font-semibold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>2024/2025 Admissions Open</span>
            </div>
            <a
              href="tel:+2348148923410"
              className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors text-xs"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>+234 814 892 3410</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button
              onClick={() => handleNavClick('admin')}
              id="topbar-admin-btn"
              className="font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
              title="Sole Administrator Authentication Portal"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Admin Portal</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                Sole Editor
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Header Bar (Logo & Primary Quick Action CTAs) */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 border-b border-slate-200'
            : 'bg-white py-2.5 border-b border-slate-200 shadow-2xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2.5 sm:gap-4">
          {/* Logo */}
          <PolytechnicLogo
            size="md"
            onClick={() => handleNavClick('home')}
            className="cursor-pointer shrink-0"
          />

          {/* Sitewide Search Bar in Header (Desktop & Tablets) */}
          <div className="flex-1 max-w-sm md:max-w-md lg:max-w-lg mx-2 hidden sm:block">
            <SitewideSearch
              onNavigate={handleNavClick}
              onOpenAdmissions={onOpenAdmissions}
              onOpenPortal={onOpenPortal}
            />
          </div>

          {/* Top Right Primary CTAs & Mobile Search Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Quick Search Button (< sm screens) */}
            <div className="sm:hidden">
              <SitewideSearch
                variant="mobile-button"
                onNavigate={handleNavClick}
                onOpenAdmissions={onOpenAdmissions}
                onOpenPortal={onOpenPortal}
              />
            </div>

            {/* Student Portal Quick Access */}
            <button
              id="nav-action-portal"
              onClick={onOpenPortal}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>Student Portal</span>
            </button>

            {/* Apply Now Primary CTA */}
            <button
              id="nav-action-apply"
              onClick={() => onOpenAdmissions()}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-500 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 border border-amber-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden xs:inline">Apply Now</span>
              <span className="xs:hidden">Apply</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-950" />
            </button>

            {/* Mobile Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ALWAYS VISIBLE MAIN NAVIGATION TAB STRIP */}
        <div className="w-full bg-emerald-950 border-t border-emerald-900 text-white shadow-inner mt-2">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8" ref={dropdownRef}>
            <div 
              id="main-nav-tabs-container"
              className="flex items-center gap-1 py-1.5 overflow-x-auto scrollbar-none whitespace-nowrap text-xs font-semibold"
            >
              {/* 1. Home */}
              <button
                id="nav-tab-home"
                onClick={() => handleNavClick('home')}
                className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeSection === 'home'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/80'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>

              {/* 2. Proprietor Tab with Options Dropdown */}
              <div className="relative shrink-0">
                <button
                  id="nav-tab-proprietor"
                  onClick={() => handleNavClick('proprietor')}
                  onMouseEnter={() => setActiveDropdown('proprietor')}
                  className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                    activeSection === 'proprietor'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'text-amber-300 hover:text-white hover:bg-emerald-900/80 bg-amber-400/10'
                  }`}
                  title="Office of the Founder & Proprietor"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Proprietor</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                    Profile Option
                  </span>
                  <ChevronDown className="w-3 h-3 opacity-80" />
                </button>

                {/* Dropdown Options for Proprietor */}
                {activeDropdown === 'proprietor' && (
                  <div 
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute left-0 top-full mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-slate-800 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Proprietor Options
                    </div>
                    <button
                      onClick={() => handleNavClick('proprietor')}
                      className="w-full text-left px-3.5 py-2 text-xs hover:bg-amber-50 flex items-center gap-2.5 font-semibold text-slate-800 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-amber-600" />
                      <span>Executive Profile & Dossier</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('proprietor')}
                      className="w-full text-left px-3.5 py-2 text-xs hover:bg-amber-50 flex items-center gap-2.5 font-semibold text-slate-800 transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5 text-amber-600" />
                      <span>Founding Vision & Strategic Pillars</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('proprietor')}
                      className="w-full text-left px-3.5 py-2 text-xs hover:bg-amber-50 flex items-center gap-2.5 font-semibold text-slate-800 transition-colors"
                    >
                      <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
                      <span>Philanthropy & Scholarship Grants</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Poly Council Tab with Options Dropdown */}
              <div className="relative shrink-0">
                <button
                  id="nav-tab-council"
                  onClick={() => handleNavClick('council')}
                  onMouseEnter={() => setActiveDropdown('council')}
                  className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                    activeSection === 'council'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'text-emerald-200 hover:text-white hover:bg-emerald-900/80 bg-emerald-500/10'
                  }`}
                  title="The 1st Governing Council Members & Gallery"
                >
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Poly Council</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    Gallery & Profiles
                  </span>
                  <ChevronDown className="w-3 h-3 opacity-80" />
                </button>

                {/* Dropdown Options for Poly Council */}
                {activeDropdown === 'council' && (
                  <div 
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute left-0 top-full mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-slate-800 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Council Options
                    </div>
                    <button
                      onClick={() => handleNavClick('council')}
                      className="w-full text-left px-3.5 py-2 text-xs hover:bg-emerald-50 flex items-center gap-2.5 font-semibold text-slate-800 transition-colors"
                    >
                      <Users className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Council Members Directory & Bios</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('council')}
                      className="w-full text-left px-3.5 py-2 text-xs hover:bg-emerald-50 flex items-center gap-2.5 font-semibold text-slate-800 transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Documentary Photo Gallery Archive</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Course Catalogs */}
              <button
                id="nav-tab-courses"
                onClick={() => handleNavClick('courses')}
                className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeSection === 'courses'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/80'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
                <span>Programs (ND & HND)</span>
              </button>

              {/* 5. Registrar */}
              <button
                id="nav-tab-registrar"
                onClick={() => handleNavClick('registrar')}
                className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeSection === 'registrar'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/80'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-emerald-300" />
                <span>Office of Registrar</span>
              </button>

              {/* 6. HOD Computer Science */}
              <button
                id="nav-tab-hod"
                onClick={() => handleNavClick('hod_compsci')}
                className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeSection === 'hod_compsci'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/80'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-emerald-300" />
                <span>HOD Comp Sci</span>
              </button>

              {/* 7. Facilities */}
              <button
                id="nav-tab-about"
                onClick={() => handleNavClick('about')}
                className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeSection === 'about'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/80'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-slate-300" />
                <span>Facilities</span>
              </button>

              {/* 8. Events & Gallery */}
              <button
                id="nav-tab-gallery"
                onClick={() => handleNavClick('gallery')}
                className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeSection === 'gallery'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/80'
                }`}
              >
                <GalleryIcon className="w-3.5 h-3.5 text-emerald-300" />
                <span>Gallery</span>
              </button>

              {/* 9. APPLY NOW PROMINENT TAB OPTION */}
              <button
                id="nav-tab-apply-now"
                onClick={() => onOpenAdmissions()}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black inline-flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer active:scale-95 ml-auto"
                title="Click to open 2024/2025 Admissions Application"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Apply Now (2024/2025)</span>
              </button>

              {/* 10. Sole Admin Tab */}
              <button
                id="nav-tab-admin"
                onClick={() => handleNavClick('admin')}
                className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeSection === 'admin'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'text-amber-300/90 hover:text-amber-200 hover:bg-emerald-900/80 bg-amber-400/10'
                }`}
                title="Sole Administrator Portal (Exclusive Master Editor)"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/25 text-amber-200 font-black uppercase tracking-wider border border-amber-400/30">
                  Sole Editor
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 shadow-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {/* Quick Admissions Banner in Mobile */}
            <div className="p-3 bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl text-white mb-2 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-black text-amber-300">2024/2025 Admissions Open</p>
                <p className="text-[11px] text-emerald-100">National Diploma (ND), HND & Certificates</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmissions();
                }}
                className="px-3.5 py-1.5 bg-amber-400 text-slate-950 rounded-xl text-xs font-black shadow hover:bg-amber-300 cursor-pointer shrink-0"
              >
                Apply Now
              </button>
            </div>

            {/* Quick Sitewide Search in Mobile Menu */}
            <div className="mb-2">
              <SitewideSearch
                variant="mobile-bar"
                onNavigate={(section) => {
                  setMobileMenuOpen(false);
                  handleNavClick(section);
                }}
                onOpenAdmissions={(course) => {
                  setMobileMenuOpen(false);
                  onOpenAdmissions(course);
                }}
                onOpenPortal={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-1 max-h-[70vh] overflow-y-auto">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  activeSection === 'home'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              {/* Mobile Proprietor with Profile Option */}
              <div className="border border-amber-200/80 rounded-xl p-2 bg-amber-50/40 space-y-1">
                <button
                  id="mobile-nav-proprietor"
                  onClick={() => handleNavClick('proprietor')}
                  className="w-full text-left py-1 text-xs font-bold flex items-center justify-between text-slate-900"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Office of the Founder & Proprietor</span>
                  </div>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-black">
                    Profile Options
                  </span>
                </button>
                <div className="pl-6 pt-1 space-y-1 border-t border-amber-200/60 text-[11px] text-slate-600">
                  <p onClick={() => handleNavClick('proprietor')} className="hover:text-amber-800 cursor-pointer">
                    • Official Biography & Executive Profile
                  </p>
                  <p onClick={() => handleNavClick('proprietor')} className="hover:text-amber-800 cursor-pointer">
                    • Founding Vision & Strategic Pillars
                  </p>
                  <p onClick={() => handleNavClick('proprietor')} className="hover:text-amber-800 cursor-pointer">
                    • Philanthropy & Scholarship Grants
                  </p>
                </div>
              </div>

              {/* Mobile Poly Council with Gallery & Profile Options */}
              <div className="border border-emerald-200/80 rounded-xl p-2 bg-emerald-50/40 space-y-1">
                <button
                  id="mobile-nav-council"
                  onClick={() => handleNavClick('council')}
                  className="w-full text-left py-1 text-xs font-bold flex items-center justify-between text-slate-900"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-700" />
                    <span>Governing Council Members & Gallery</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-black">
                    Gallery & Profiles
                  </span>
                </button>
                <div className="pl-6 pt-1 space-y-1 border-t border-emerald-200/60 text-[11px] text-slate-600">
                  <p onClick={() => handleNavClick('council')} className="hover:text-emerald-800 cursor-pointer">
                    • 1st Council Members Directory & Bios
                  </p>
                  <p onClick={() => handleNavClick('council')} className="hover:text-emerald-800 cursor-pointer">
                    • Documentary Photo Archive (Sittings & Inspections)
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleNavClick('courses')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  activeSection === 'courses'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Academic Programs (ND & HND)</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                  24 Courses
                </span>
              </button>

              <button
                onClick={() => handleNavClick('portal')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  activeSection === 'portal'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Student Portal</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => handleNavClick('registrar')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  activeSection === 'registrar'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Office of the Registrar</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => handleNavClick('hod_compsci')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  activeSection === 'hod_compsci'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  <span>HOD Computer Science</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  activeSection === 'about'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <span>Campus Facilities & Workshops</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => handleNavClick('gallery')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  activeSection === 'gallery'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <GalleryIcon className="w-4 h-4 text-emerald-600" />
                  <span>Events & Gallery</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              {/* Mobile Direct Apply Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmissions();
                }}
                className="w-full text-center px-4 py-3 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 shadow flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Open 2024/2025 Application Form</span>
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between text-amber-950 bg-amber-50/90 hover:bg-amber-100 border border-amber-300 shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-700" />
                  <span>Sole Admin Portal (Master Editor)</span>
                </div>
                <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full font-black">
                  Sole Editor Only
                </span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
