import React, { useState } from 'react';
import { useDataContext } from '../context/DataContext';
import { CouncilMember, CouncilGalleryItem } from '../types';
import { 
  Users, 
  Award, 
  BookOpen, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  Image as ImageIcon, 
  Shield, 
  Mail, 
  FileText, 
  Edit3, 
  ExternalLink,
  Search,
  Filter,
  Eye
} from 'lucide-react';

interface PolyCouncilSectionProps {
  onOpenAdmissions: () => void;
  onNavigateToProprietor: () => void;
  onNavigateToRegistrar: () => void;
  onNavigateToAdmin: () => void;
}

export const PolyCouncilSection: React.FC<PolyCouncilSectionProps> = ({
  onOpenAdmissions,
  onNavigateToProprietor,
  onNavigateToRegistrar,
  onNavigateToAdmin,
}) => {
  const { councilMembers, councilGallery } = useDataContext();

  // State for member profile modal
  const [selectedMember, setSelectedMember] = useState<CouncilMember | null>(null);

  // State for gallery lightbox
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<CouncilGalleryItem | null>(null);

  // Filter states
  const [memberCategoryFilter, setMemberCategoryFilter] = useState<string>('All');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtered members
  const filteredMembers = councilMembers.filter((member) => {
    const matchesCategory =
      memberCategoryFilter === 'All' || member.category === memberCategoryFilter;
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.titles.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtered gallery items
  const filteredGallery = councilGallery.filter((item) => {
    return (
      galleryCategoryFilter === 'All' || item.category === galleryCategoryFilter
    );
  });

  const memberCategories = [
    'All',
    'Executive',
    'Academic',
    'Government & NBTE',
    'Industry & Private Sector',
    'Community & Stakeholders',
  ];

  const galleryCategories = [
    'All',
    'Council Sittings',
    'Campus Inspections',
    'Ceremonial & Matriculation',
    'Accreditation & Governance',
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-emerald-950 text-emerald-100 py-3.5 px-4 text-xs font-semibold border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-sm bg-emerald-800 text-emerald-200 border border-emerald-700 uppercase tracking-widest text-[10px] font-bold">
              Statutory Apex Organ
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-slate-200">
              The 1st Governing Council • Renaissance Modern Polytechnic, Mbaukwu
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToProprietor}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30 transition-colors text-xs font-bold"
            >
              <span>Proprietor & Founder</span>
            </button>
            <button
              onClick={onNavigateToRegistrar}
              className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors text-xs"
            >
              <span>Council Secretariat (Registry)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/60 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            Polytechnic Governing Council
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            The 1st Governing Council
          </h1>
          <p className="max-w-3xl mx-auto text-emerald-200/90 text-sm sm:text-base leading-relaxed">
            The supreme policy-making and strategic governing organ of Renaissance Modern Polytechnic, Mbaukwu. Constituted in adherence to the Federal Polytechnics Act and NBTE accreditation benchmarks to provide fiduciary oversight, academic stewardship, and industrial relevance.
          </p>

          {/* Quick Jump Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="#council-members"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Council Members & Profiles ({councilMembers.length})</span>
            </a>

            <a
              href="#council-gallery"
              className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition-colors border border-emerald-600/60 inline-flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>Council Gallery & Sessions ({councilGallery.length})</span>
            </a>

            <button
              onClick={onNavigateToProprietor}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors border border-slate-700 inline-flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Office of the Proprietor</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* SECTION 1: COUNCIL MEMBERS DIRECTORY WITH PROFILE OPTIONS */}
        <section id="council-members" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                Governance Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Council Members Directory
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Click on any Council Member below to open their full biographical profile, qualifications, and statutory committee portfolios.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search member or portfolio..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {memberCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setMemberCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  memberCategoryFilter === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo with category badge */}
                  <div className="aspect-4/3 relative overflow-hidden bg-slate-900">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/90 text-emerald-200 border border-emerald-700/60 backdrop-blur-xs">
                      {member.category}
                    </span>

                    <span className="absolute bottom-2 right-3 text-[11px] text-amber-300 font-bold drop-shadow-sm">
                      {member.tenure}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2">
                    <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                      {member.role}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium line-clamp-1">
                      {member.titles}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 pt-1">
                      {member.profileSummary}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500">
                    {member.committees.length} Standing Committees
                  </span>
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-800 hover:text-white font-bold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer border border-emerald-200"
                  >
                    <span>View Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
              <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 font-medium text-sm">
                No council members match your search or filter.
              </p>
              <button
                onClick={() => {
                  setMemberCategoryFilter('All');
                  setSearchTerm('');
                }}
                className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* SECTION 2: COUNCIL SITTINGS & INSPECTIONS GALLERY */}
        <section id="council-gallery" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                Documentary Archive
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Council Gallery & Official Sittings
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Visual highlights of statutory council meetings at Senate Chambers, on-site workshop inspections, matriculation processions, and federal accreditation exercises.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredGallery.length} archive photos
              </span>
            </div>
          </div>

          {/* Gallery Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  galleryCategoryFilter === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-16/10 relative overflow-hidden bg-slate-900">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="px-3 py-1.5 rounded-full bg-slate-950/80 text-white text-xs font-bold inline-flex items-center gap-1.5 backdrop-blur-xs">
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Enlarge Photo</span>
                      </span>
                    </div>

                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-amber-300 border border-amber-400/30 backdrop-blur-xs">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                        {item.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                        {item.location}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-900">
                  <span>View Full Photo & Caption</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Secretariat & Statutory Notice */}
        <section className="bg-emerald-950 text-white rounded-2xl p-8 border border-emerald-800/80 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Council Secretariat & Statutory Enquiries
              </span>
              <h3 className="text-2xl font-bold text-white">
                Office of the Secretary to the Governing Council
              </h3>
              <p className="text-sm text-emerald-200/90 leading-relaxed">
                The Registry Division is the official custodian of Council Resolutions, Academic Board archives, and institutional memoranda. Formal correspondence to the Chairman or Members of Council should be directed through the Office of the Registrar.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={onNavigateToRegistrar}
                className="w-full px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Visit Registry Desk</span>
              </button>

              <button
                onClick={onNavigateToAdmin}
                className="w-full px-5 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs transition-colors border border-emerald-700/60 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-amber-400" />
                <span>Manage Council Data in CMS</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* MEMBER PROFILE MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white p-6 border-b border-emerald-800 flex items-start justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 bg-slate-900">
                  <img
                    src={selectedMember.photoUrl}
                    alt={selectedMember.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-emerald-900 px-2 py-0.5 rounded">
                      {selectedMember.category}
                    </span>
                    <span className="text-xs text-emerald-300 font-semibold">
                      {selectedMember.tenure}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs text-emerald-200 font-medium">
                    {selectedMember.role}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="w-8 h-8 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm leading-relaxed">
              {/* Titles & Credentials */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Full Academic & Professional Titles
                </span>
                <p className="font-semibold text-slate-900">
                  {selectedMember.titles}
                </p>
              </div>

              {/* Biography */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2 text-emerald-800">
                  Council Profile & Biography
                </h4>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm">
                  {selectedMember.fullBiography}
                </p>
              </div>

              {/* Qualifications */}
              {selectedMember.qualifications && selectedMember.qualifications.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-emerald-800 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-700" />
                    Educational Qualifications & Fellowships
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedMember.qualifications.map((qual, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Statutory Committees */}
              {selectedMember.committees && selectedMember.committees.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-amber-800 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-600" />
                    Statutory Council Committee Portfolios
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.committees.map((comm, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold"
                      >
                        {comm}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Official Email */}
              {selectedMember.email && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-semibold border border-emerald-200">
                  <Mail className="w-4 h-4 text-emerald-700" />
                  <span>Official Email:</span>
                  <a href={`mailto:${selectedMember.email}`} className="underline hover:text-emerald-700">
                    {selectedMember.email}
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <button
                onClick={() => {
                  setSelectedMember(null);
                  onNavigateToAdmin();
                }}
                className="text-xs font-bold text-slate-600 hover:text-emerald-700 inline-flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit in Admin Portal</span>
              </button>

              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY LIGHTBOX MODAL */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full overflow-hidden flex flex-col shadow-2xl border border-slate-800 text-white">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                  {selectedGalleryItem.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedGalleryItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedGalleryItem(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-black flex items-center justify-center max-h-[60vh] overflow-hidden">
              <img
                src={selectedGalleryItem.imageUrl}
                alt={selectedGalleryItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-6 bg-slate-900 space-y-3">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  {selectedGalleryItem.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  {selectedGalleryItem.location}
                </span>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedGalleryItem.caption}
              </p>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end">
              <button
                onClick={() => setSelectedGalleryItem(null)}
                className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
