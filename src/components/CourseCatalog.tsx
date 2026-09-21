import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  GraduationCap, 
  Clock, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Filter, 
  X, 
  FileText, 
  Briefcase, 
  DollarSign,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Layers
} from 'lucide-react';
import { useDataContext } from '../context/DataContext';
import { Course } from '../types';

interface CourseCatalogProps {
  onSelectCourseForAdmission: (courseTitle: string) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  onSelectCourseForAdmission,
}) => {
  const { courses, schools } = useDataContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.careerProspects.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSchool =
        selectedSchool === 'all' || course.schoolId === selectedSchool;

      const matchesLevel =
        selectedLevel === 'all' || course.level === selectedLevel;

      return matchesSearch && matchesSchool && matchesLevel;
    });
  }, [searchQuery, selectedSchool, selectedLevel]);

  return (
    <section id="courses-section" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            Accredited Academic Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive Course Catalogs
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Explore our National Diploma (ND), Higher National Diploma (HND), and Vocational Innovation certificates fully accredited by the National Board for Technical Education (NBTE).
          </p>
        </div>

        {/* Search & Filter Control Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search input */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                id="course-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by name, code, or career (e.g., Computer Science, Solar, ACC 101, Robotics)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Level Quick Tabs */}
            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {[
                { id: 'all', label: 'All Levels' },
                { id: 'ND', label: 'National Diploma (ND)' },
                { id: 'HND', label: 'Higher National Diploma (HND)' },
                { id: 'Certificate', label: 'Vocational Cert' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedLevel === lvl.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* School / Faculty Category Pills */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-400" />
              School:
            </span>
            <button
              onClick={() => setSelectedSchool('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSchool === 'all'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Schools ({schools.length})
            </button>
            {schools.map((school) => (
              <button
                key={school.id}
                onClick={() => setSelectedSchool(school.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSchool === school.id
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {school.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Active Filter Indicator */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-medium">
          <p>
            Showing <strong className="text-slate-800">{filteredCourses.length}</strong> academic programs
          </p>
          {(searchQuery || selectedSchool !== 'all' || selectedLevel !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSchool('all');
                setSelectedLevel('all');
              }}
              className="text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No programs match your search</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Try adjusting your search terms or clearing school filters to view all available accredited courses.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSchool('all');
                setSelectedLevel('all');
              }}
              className="mt-4 px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg hover:bg-emerald-800"
            >
              Show All Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                id={`course-card-${course.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                      {course.code}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        course.level === 'HND'
                          ? 'bg-purple-100 text-purple-900 border border-purple-200'
                          : course.level === 'Certificate'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}
                    >
                      {course.level} Program
                    </span>
                  </div>

                  {/* Course Title & School */}
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                      <span>{course.schoolName}</span>
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  {/* Quick Meta Data */}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.totalCredits} Credit Units</span>
                    </div>
                  </div>

                  {/* Career tags preview */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Career Pathways:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {course.careerProspects.slice(0, 2).map((career, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {career}
                        </span>
                      ))}
                      {course.careerProspects.length > 2 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-slate-500 font-semibold">
                          +{course.careerProspects.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveCourseModal(course)}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    View Syllabus & Entry
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-700" />
                  </button>

                  <button
                    onClick={() => onSelectCourseForAdmission(course.title)}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-2xs hover:shadow transition-all inline-flex items-center gap-1"
                  >
                    Apply Now
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Course Modal / Drawer */}
        {activeCourseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="sticky top-0 bg-emerald-900 text-white p-6 rounded-t-3xl flex items-start justify-between gap-4 z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-xs font-black">
                      {activeCourseModal.code}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-800 text-emerald-200 text-xs font-bold">
                      {activeCourseModal.level} Program
                    </span>
                    <span className="text-emerald-300 text-xs">
                      {activeCourseModal.accreditationStatus}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    {activeCourseModal.title}
                  </h3>
                  <p className="text-xs text-emerald-300 mt-1 font-medium">
                    {activeCourseModal.schoolName} • Renaissance Modern Polytechnic Mbaukwu
                  </p>
                </div>

                <button
                  onClick={() => setActiveCourseModal(null)}
                  className="p-2 rounded-full bg-emerald-800/80 hover:bg-emerald-800 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content Body */}
              <div className="p-6 sm:p-8 space-y-6 text-slate-800 text-sm">
                {/* Overview */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    Program Description & Objectives
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {activeCourseModal.description}
                  </p>
                </div>

                {/* Entry Requirements */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-amber-700" />
                    O'Level & Academic Entry Requirements
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-950">
                    {activeCourseModal.entryRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Semester-by-Semester Curriculum Breakdown */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    Curriculum Framework Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCourseModal.curriculumHighlights.map((sem, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                      >
                        <p className="text-xs font-bold text-emerald-900 flex items-center justify-between">
                          <span>{sem.semester}</span>
                        </p>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {sem.modules.map((mod, mIdx) => (
                            <li key={mIdx} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-emerald-600 shrink-0" />
                              <span>{mod}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Prospects */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-emerald-700" />
                    Target Industrial & Entrepreneurial Careers
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeCourseModal.careerProspects.map((career, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Estimated Tuition Schedule */}
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Standard Tuition / Session
                    </p>
                    <p className="text-2xl font-black text-slate-900">
                      ₦{activeCourseModal.tuitionPerSession.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Includes Smart Campus ICT levy, NBTE library & workshop consumables access.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const title = activeCourseModal.title;
                      setActiveCourseModal(null);
                      onSelectCourseForAdmission(title);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all inline-flex items-center justify-center gap-2"
                  >
                    <span>Apply for this Program</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
