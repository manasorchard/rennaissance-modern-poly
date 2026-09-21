import React, { useState } from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  Send, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Building2 
} from 'lucide-react';
import { useDataContext } from '../context/DataContext';

export const ContactSection: React.FC = () => {
  const { generalInfo } = useDataContext();
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Admissions Inquiries',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: 'Admissions Inquiries',
        message: '',
      });
    }, 6000);
  };

  return (
    <section id="contact-section" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Mail className="w-3.5 h-3.5 text-emerald-700" />
            Connect With Renaissance
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Campus Location & Contact Directory
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Visit our permanent campus in {generalInfo.town}, {generalInfo.state}, or speak with our admissions officers and faculty deans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Campus Map Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-5">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-700" />
                Permanent Campus Address
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block">{generalInfo.institutionName} Campus</strong>
                    <span>{generalInfo.address}, {generalInfo.town}, {generalInfo.state}.</span>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                      (Approx. 10 minutes from Awka State Capital)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Telephone Enquiries</strong>
                    <span>{generalInfo.phonePrimary} | {generalInfo.phoneSecondary}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Official Institutional Email</strong>
                    <span>{generalInfo.admissionsEmail}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block">Admissions Screening Hours</strong>
                    <span>{generalInfo.screeningHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Directions Tip */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold block uppercase tracking-wider text-[10px]">
                Travel Directions for Visitors:
              </span>
              <p>
                {generalInfo.travelDirections}
              </p>
            </div>
          </div>

          {/* Contact & Inquiry Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-2">
              Send an Official Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Have questions regarding course requirements, JAMB cut-off marks, hostel accommodation, or certificate programs? Send us a message directly.
            </p>

            {formSent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                <h4 className="text-base font-black text-emerald-900">
                  Message Dispatched to Admissions Office
                </h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you for contacting Renaissance Modern Polytechnic Mbaukwu. An admissions officer will respond to your email and phone number within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Uchenna Okeke"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Recipient Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      <option value="Admissions Inquiries">Admissions & JAMB Screening</option>
                      <option value="Registrar Office">Registrar's Academic Secretariat</option>
                      <option value="Bursary Fees Desk">Bursary & Remita Payment Desk</option>
                      <option value="SIWES Industrial Linkage">SIWES & Industrial Linkage</option>
                      <option value="ICT Support">ICT Student Portal Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Message / Inquiry Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details of your inquiry regarding courses, requirements, or screening dates..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Admissions Office</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
