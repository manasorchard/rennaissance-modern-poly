import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  Sparkles, 
  X, 
  Download, 
  Share2, 
  ChevronRight, 
  Heart, 
  Check, 
  Camera, 
  Filter,
  Image as ImageIcon
} from 'lucide-react';
import { useDataContext } from '../context/DataContext';
import { CampusEvent } from '../types';

export const CampusGallery: React.FC = () => {
  const { events } = useDataContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxEvent, setActiveLightboxEvent] = useState<CampusEvent | null>(null);
  const [rsvpdEvents, setRsvpdEvents] = useState<Record<string, boolean>>({});
  const [eventLikes, setEventLikes] = useState<Record<string, number>>({
    'evt-matric-2025': 342,
    'evt-tech-expo-2025': 512,
    'evt-cultural-carnival': 689,
    'evt-hackathon': 284,
    'evt-rector-cup': 495,
    'evt-career-fair': 310,
  });

  const categories = ['All', 'Ceremony', 'Engineering & Tech', 'Cultural', 'Sports', 'Academic'];

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'All') return events;
    return events.filter((e) => e.category === selectedCategory);
  }, [selectedCategory, events]);

  const handleToggleLike = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEventLikes((prev) => ({
      ...prev,
      [eventId]: (prev[eventId] || 0) + 1,
    }));
  };

  const handleToggleRSVP = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRsvpdEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  return (
    <section id="campus-events-gallery" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Vibrant Campus Life & Events
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Campus Events & Heritage Gallery
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            From the bustling Engineering Innovation Expos and robotics hackathons to the electrifying Rector's Cup and vibrant Igbo Cultural Carnival — experience Renaissance Modern Polytechnic in vivid color.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Gallery Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, idx) => {
            const isRsvpd = rsvpdEvents[event.id];
            const likesCount = eventLikes[event.id] || 150;

            return (
              <div
                key={event.id}
                onClick={() => setActiveLightboxEvent(event)}
                className="group relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-900 flex flex-col justify-end min-h-[380px]"
              >
                {/* Event Photo */}
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top Floating Badge Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-emerald-900 shadow-sm">
                    {event.category}
                  </span>

                  <button
                    onClick={(e) => handleToggleLike(event.id, e)}
                    className="p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md transition-colors flex items-center gap-1 text-xs font-bold"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span>{likesCount}</span>
                  </button>
                </div>

                {/* Card Bottom Content */}
                <div className="relative p-6 text-white space-y-3 z-10">
                  <div className="flex items-center gap-3 text-xs text-amber-300 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {event.venue.split(',')[0]}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Actions & Tag Row */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-semibold">
                      <Users className="w-3.5 h-3.5" />
                      <span>{event.attendeesCount.toLocaleString()} Attendees</span>
                    </div>

                    <button
                      onClick={(e) => handleToggleRSVP(event.id, e)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        isRsvpd
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs'
                      }`}
                    >
                      {isRsvpd ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>RSVP Confirmed</span>
                        </>
                      ) : (
                        <span>RSVP / Remind Me</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox / Event Details Modal */}
        {activeLightboxEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col md:flex-row relative">
              {/* Left: Big Image View */}
              <div className="md:w-1/2 relative min-h-[300px] md:min-h-full bg-slate-950">
                <img
                  src={activeLightboxEvent.imageUrl}
                  alt={activeLightboxEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider">
                    {activeLightboxEvent.category}
                  </span>
                </div>
              </div>

              {/* Right: Event Information & Story */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                      <Calendar className="w-4 h-4 text-emerald-700" />
                      <span>{activeLightboxEvent.date} • {activeLightboxEvent.time}</span>
                    </div>
                    <button
                      onClick={() => setActiveLightboxEvent(null)}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 leading-tight">
                    {activeLightboxEvent.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{activeLightboxEvent.venue}</span>
                  </div>

                  <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                    {activeLightboxEvent.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {activeLightboxEvent.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleToggleLike(activeLightboxEvent.id, e)}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5"
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      <span>{eventLikes[activeLightboxEvent.id] || 200} Likes</span>
                    </button>
                  </div>

                  <button
                    onClick={(e) => handleToggleRSVP(activeLightboxEvent.id, e)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      rsvpdEvents[activeLightboxEvent.id]
                        ? 'bg-emerald-800 text-white'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                    }`}
                  >
                    {rsvpdEvents[activeLightboxEvent.id] ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Registered to Attend</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>RSVP / Attend Event</span>
                      </>
                    )}
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
