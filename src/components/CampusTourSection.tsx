import React, { useState } from 'react';
import { 
  Building2, 
  Wrench, 
  Cpu, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  Award
} from 'lucide-react';
import { useDataContext } from '../context/DataContext';
import { PolytechnicLogo } from './PolytechnicLogo';

export const CampusTourSection: React.FC<{ onExploreCourses: () => void; onApplyNow: () => void }> = ({
  onExploreCourses,
  onApplyNow,
}) => {
  const { facilities, generalInfo } = useDataContext();
  const [activeFacilityIndex, setActiveFacilityIndex] = useState(0);
  const currentFacility = facilities[activeFacilityIndex] || facilities[0];

  return (
    <section id="facilities-section" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Rector's Welcome & Institutional Mandate */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
              <div className="relative">
                <img
                  src={generalInfo.rectorPhotoUrl}
                  alt="Rector of Renaissance Modern Polytechnic"
                  className="w-48 h-56 object-cover rounded-2xl border-4 border-emerald-700 shadow-md"
                />
                <span className="absolute -bottom-2 px-3 py-1 bg-amber-400 text-slate-950 font-black text-[10px] rounded-full uppercase tracking-wider shadow">
                  Office of the Rector
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {generalInfo.rectorName}
                </h3>
                <p className="text-xs font-bold text-emerald-800">
                  {generalInfo.rectorTitles}
                </p>
                <p className="text-xs text-slate-500">
                  {generalInfo.rectorPosition}
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-emerald-700" />
                Rector's Official Address
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {generalInfo.rectorQuoteHeadline}
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                {generalInfo.rectorSpeechParagraph1}
              </p>

              <p className="text-slate-600 text-sm leading-relaxed">
                {generalInfo.rectorSpeechParagraph2}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onApplyNow}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-all inline-flex items-center gap-2"
                >
                  <span>Apply for 2024/2025 Session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onExploreCourses}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all"
                >
                  View Accredited Departments
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Facilities Spotlight */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              World-Class Infrastructure
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              State-of-the-Art Labs & Smart Workshops
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Discover the engineering facilities, digital centers, and science suites powering 70% practical curriculum at Renaissance Modern Polytechnic.
            </p>
          </div>

          {/* Interactive Facilities Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            {/* Left: Facilities Navigation List */}
            <div className="lg:col-span-5 space-y-2">
              {facilities.map((fac, idx) => (
                <button
                  key={fac.id}
                  onClick={() => setActiveFacilityIndex(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between ${
                    activeFacilityIndex === idx
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider block ${
                        activeFacilityIndex === idx ? 'text-amber-300' : 'text-emerald-700'
                      }`}
                    >
                      {fac.category}
                    </span>
                    <h4 className="text-sm font-black leading-tight">
                      {fac.name}
                    </h4>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 shrink-0 ${
                      activeFacilityIndex === idx ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Right: Active Facility Details & Photo */}
            <div className="lg:col-span-7 space-y-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner h-64 sm:h-80 relative group">
                <img
                  src={currentFacility.imageUrl}
                  alt={currentFacility.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs font-bold">
                    {currentFacility.category}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {currentFacility.name}
                </h3>
                <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {currentFacility.description}
                </p>
              </div>

              {/* Key Machinery / Equipments */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Featured Machinery & Instruments:
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentFacility.keyEquipments.map((eq, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{eq}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
