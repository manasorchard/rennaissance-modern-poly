import React from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Wrench, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Building, 
  Award,
  Settings
} from 'lucide-react';
import { PolytechnicLogo } from './PolytechnicLogo';
import { useDataContext } from '../context/DataContext';
import { NavSection } from '../types';

interface HeroSectionProps {
  onNavigate: (section: NavSection) => void;
  onOpenAdmissions: () => void;
  onOpenPortal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenAdmissions,
  onOpenPortal,
}) => {
  const { announcements, stats } = useDataContext();
  const activeAnnouncement = announcements[0] || {
    title: '2024/2025 National Diploma (ND) & HND Admission Screening Underway',
    badge: 'Admissions',
    urgent: true,
  };
  return (
    <section className="relative overflow-hidden bg-radial from-slate-900 via-emerald-950 to-slate-950 text-white">
      {/* Decorative Brand Background Glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-emerald-600 rounded-full blur-3xl" />
      </div>

      {/* Grid texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Top Announcements Ticker */}
        <div className="mb-8">
          <div className="inline-flex flex-wrap items-center gap-2 p-1.5 pr-4 rounded-full bg-slate-800/80 border border-emerald-500/30 text-xs backdrop-blur-sm shadow-inner">
            <span className="px-2.5 py-1 rounded-full bg-emerald-700 text-white font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              {activeAnnouncement.badge || 'Notice'}
            </span>
            <span className="text-slate-300 font-medium">
              {activeAnnouncement.title}
            </span>
            <button
              onClick={onOpenAdmissions}
              className="ml-auto text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 underline underline-offset-2 cursor-pointer"
            >
              Apply Online <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Accredited by National Board for Technical Education (NBTE)</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Practical Technology. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300">
                Modern Innovation.
              </span>{' '}
              <br />
              Self-Reliance at Mbaukwu.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
              Renaissance Modern Polytechnic Mbaukwu equips students with cutting-edge 
              engineering workshop training, software development, renewable energy expertise, 
              and enterprise skills to thrive in Nigeria and the global industrial frontier.
            </p>

            {/* Key Value Proposition Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Modern CNC & Solar Labs</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NBTE Accredited ND & HND</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SIWES Placement Support</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-explore-courses-btn"
                onClick={() => onNavigate('courses')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform active:scale-95 inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-slate-900" />
                <span>Explore Course Catalogs</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </button>

              <button
                id="hero-student-portal-btn"
                onClick={onOpenPortal}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-800 hover:bg-emerald-700 border border-emerald-500/50 shadow-lg shadow-emerald-950/50 transition-all transform active:scale-95 inline-flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-emerald-300" />
                <span>Student Portal</span>
              </button>

              <button
                id="hero-apply-btn"
                onClick={onOpenAdmissions}
                className="px-5 py-3.5 rounded-xl font-semibold text-sm text-emerald-200 hover:text-white hover:bg-white/10 border border-emerald-500/30 transition-colors inline-flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Admissions 2024/2025</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Card / Institutional Crest Centerpiece */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-slate-800/90 to-slate-900/95 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl backdrop-blur-md">
              {/* Top Crest Banner */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-emerald-800/20 relative group">
                  <PolytechnicLogo size="xl" showText={false} />
                  <span className="absolute -top-3 -right-3 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                    Official Crest
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Renaissance Modern Polytechnic
                  </h3>
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mt-1">
                    Mbaukwu, Awka South, Anambra State
                  </p>
                  <p className="text-xs text-slate-400 mt-1 italic">
                    "Technology for Self-Reliance & National Development"
                  </p>
                </div>

                {/* Quick Pillar Grid */}
                <div className="w-full grid grid-cols-2 gap-3 pt-3 text-left">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-center gap-2 text-emerald-400 mb-1">
                      <Wrench className="w-4 h-4" />
                      <span className="text-xs font-bold text-slate-200">Engineering</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Mechanical, Electrical, Computer & Civil Engineering.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-center gap-2 text-amber-400 mb-1">
                      <Cpu className="w-4 h-4" />
                      <span className="text-xs font-bold text-slate-200">Computing</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Software Engineering, AI Data Systems & Cyber Defense.
                    </p>
                  </div>
                </div>

                {/* Fast Portal Access Bar */}
                <div className="w-full pt-2">
                  <button
                    onClick={onOpenPortal}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-300" />
                      Student Portal Direct Access
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Academic & Campus Stats Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/90 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">{stat.suffix}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
