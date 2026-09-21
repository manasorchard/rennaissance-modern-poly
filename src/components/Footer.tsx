import React from 'react';
import { PolytechnicLogo } from './PolytechnicLogo';
import { NavSection } from '../types';
import { useDataContext } from '../context/DataContext';
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  ShieldCheck, 
  ChevronRight, 
  BookOpen, 
  GraduationCap, 
  Image as GalleryIcon, 
  Award,
  ArrowUp,
  Settings
} from 'lucide-react';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
  onOpenPortal: () => void;
  onOpenAdmissions: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPortal,
  onOpenAdmissions,
}) => {
  const { generalInfo } = useDataContext();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-emerald-950">
      {/* Top Banner with Accreditation notice */}
      <div className="bg-emerald-900/60 py-4 px-4 border-b border-emerald-800/40 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Accredited by the National Board for Technical Education (NBTE) • JAMB Listed
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-xs">
            <button
              onClick={onOpenPortal}
              className="text-amber-300 hover:text-amber-200 font-bold underline cursor-pointer"
            >
              Access Student Portal
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenAdmissions}
              className="text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
            >
              2024/2025 Admissions
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Branding & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <PolytechnicLogo size="lg" variant="dark" />
            
            <p className="text-xs text-slate-400 leading-relaxed pr-6 max-w-md">
              Renaissance Modern Polytechnic Mbaukwu is a premier tertiary institution in Anambra State dedicated to practical engineering workshops, software technology, enterprise development, and vocational innovation for national self-reliance.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{generalInfo.institutionName}, {generalInfo.address}, {generalInfo.town}, {generalInfo.state}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{generalInfo.phonePrimary} / {generalInfo.phoneSecondary}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{generalInfo.registrarEmail}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider text-emerald-400">
              Institutional Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Home Page</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('proprietor')}
                  className="hover:text-amber-300 text-amber-300/90 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Office of the Proprietor (Profile)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('council')}
                  className="hover:text-emerald-300 text-emerald-300/95 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  <span>Governing Council (Gallery & Profiles)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Course Catalogs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('registrar')}
                  className="hover:text-emerald-400 text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Office of the Registrar</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hod_compsci')}
                  className="hover:text-amber-300 text-amber-400/90 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>HOD Comp Sci (Course Upload)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPortal}
                  className="hover:text-amber-300 text-amber-400 font-bold transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>Student Portal (Login)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span className="flex items-center gap-1">
                    <Settings className="w-3 h-3 text-amber-400" />
                    Admin / Staff CMS
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Campus Events & Gallery</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Workshops & Labs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmissions}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Admissions Application</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Accredited Schools */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider text-emerald-400">
              Academic Schools
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>School of Engineering Technology</li>
              <li>School of Applied Sciences & Computing</li>
              <li>School of Business & Management</li>
              <li>School of Environmental Design & Tech</li>
              <li>Center for Vocational Innovation (CTVI)</li>
              <li>Directorate of Continuing Education</li>
            </ul>
          </div>

          {/* Col 5: Admissions & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider text-amber-400">
              Office Hours
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p>
                <strong className="text-white">Admissions Office:</strong>
                <br />
                Mon – Fri: 8:00 AM – 4:30 PM
              </p>
              <p>
                <strong className="text-white">Smart Workshops & Labs:</strong>
                <br />
                Mon – Sat: 8:00 AM – 6:00 PM
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenAdmissions}
                  className="w-full py-2 px-3 bg-linear-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Apply Online Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {generalInfo.institutionName}. All rights reserved. Approved by NBTE.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-emerald-500">Motto: {generalInfo.motto}</span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-[11px] text-slate-400 hover:text-amber-400 underline transition-colors"
            >
              CMS Staff Login
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
