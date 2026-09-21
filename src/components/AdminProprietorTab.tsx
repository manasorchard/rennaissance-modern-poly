import React, { useState } from 'react';
import { useDataContext } from '../context/DataContext';
import { ProprietorInfo } from '../types';
import { EasyPhotoUpload } from './EasyPhotoUpload';
import { 
  Award, 
  Save, 
  RotateCcw, 
  BookOpen, 
  Heart, 
  Quote, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Plus, 
  Trash2 
} from 'lucide-react';

interface AdminProprietorTabProps {
  onShowToast: (msg: string) => void;
}

export const AdminProprietorTab: React.FC<AdminProprietorTabProps> = ({ onShowToast }) => {
  const { proprietorInfo, updateProprietorInfo } = useDataContext();
  const [formData, setFormData] = useState<ProprietorInfo>({ ...proprietorInfo });

  // Input states for arrays
  const [newPillar, setNewPillar] = useState('');
  const [newCredential, setNewCredential] = useState('');
  const [newHonor, setNewHonor] = useState('');

  const handleFieldChange = (field: keyof ProprietorInfo, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactChange = (field: keyof ProprietorInfo['officeContact'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      officeContact: {
        ...prev.officeContact,
        [field]: value,
      },
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProprietorInfo(formData);
    onShowToast('Proprietor & Chancellor profile updated successfully!');
  };

  const handleReset = () => {
    setFormData({ ...proprietorInfo });
    onShowToast('Reverted to saved proprietor data');
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/5 to-transparent p-5 rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            Executive Office Management
          </div>
          <h3 className="text-lg font-black text-slate-900">
            Edit Proprietor & Founder Profile Dossier
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Update the official portrait, biography, vision statement, honorary titles, and scholarship schemes of Chief Dr. Augustine N. Ezenwaka.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Discard</span>
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Photo & Core Details */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Official Portrait Image
            </label>
            <EasyPhotoUpload
              value={formData.photoUrl}
              onChange={(url) => handleFieldChange('photoUrl', url)}
              label="Portrait Image URL / Upload"
            />
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Honorary & Institutional Roles
            </h4>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Titles & Honors
              </label>
              <input
                type="text"
                value={formData.titles}
                onChange={(e) => handleFieldChange('titles', e.target.value)}
                placeholder="e.g. Chief Dr., Akwa-Akwa of Mbaukwu"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Official Institutional Post
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => handleFieldChange('position', e.target.value)}
                placeholder="e.g. Founder, Proprietor & Chancellor"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Chambers & Contact Info
            </h4>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={formData.officeContact?.email || ''}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Direct Telephone
              </label>
              <input
                type="text"
                value={formData.officeContact?.phone || ''}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Chambers Location
              </label>
              <input
                type="text"
                value={formData.officeContact?.location || ''}
                onChange={(e) => handleContactChange('location', e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Name, Bio, Vision, Quotes, Lists */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Profile Dossier & Statements
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Official Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Proprietor's Official Quote / Motto
              </label>
              <textarea
                rows={2}
                value={formData.quote}
                onChange={(e) => handleFieldChange('quote', e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none italic"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Biographical Narrative & Background
              </label>
              <textarea
                rows={5}
                value={formData.biography}
                onChange={(e) => handleFieldChange('biography', e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Founding Vision Statement
              </label>
              <textarea
                rows={4}
                value={formData.foundingVision}
                onChange={(e) => handleFieldChange('foundingVision', e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Philanthropy & Scholarship Grants Description
              </label>
              <textarea
                rows={4}
                value={formData.philanthropyAndScholarships}
                onChange={(e) => handleFieldChange('philanthropyAndScholarships', e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Institutional Pillars List */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Institutional Strategic Pillars
            </h4>

            <div className="flex gap-2">
              <input
                type="text"
                value={newPillar}
                onChange={(e) => setNewPillar(e.target.value)}
                placeholder="Add institutional pillar (e.g. 100% Practical Technical Labs)..."
                className="flex-1 text-xs p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (newPillar.trim()) {
                    handleFieldChange('corePillars', [...(formData.corePillars || []), newPillar.trim()]);
                    setNewPillar('');
                  }
                }}
                className="px-3 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {(formData.corePillars || []).map((pillar, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800">
                  <span>{pillar}</span>
                  <button
                    type="button"
                    onClick={() => {
                      handleFieldChange(
                        'corePillars',
                        formData.corePillars.filter((_, i) => i !== idx)
                      );
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials & Honors Lists */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Education & Honorary Recognitions
            </h4>

            {/* Credentials */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-600">Education & Qualifications</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCredential}
                  onChange={(e) => setNewCredential(e.target.value)}
                  placeholder="e.g. Doctorate in Business Administration (Honoris Causa)..."
                  className="flex-1 text-xs p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCredential.trim()) {
                      handleFieldChange('educationAndCredentials', [...(formData.educationAndCredentials || []), newCredential.trim()]);
                      setNewCredential('');
                    }
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              <div className="space-y-1">
                {(formData.educationAndCredentials || []).map((cred, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800">
                    <span>{cred}</span>
                    <button
                      type="button"
                      onClick={() => {
                        handleFieldChange(
                          'educationAndCredentials',
                          formData.educationAndCredentials.filter((_, i) => i !== idx)
                        );
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Honors */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-600">Awards & Fellowships</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newHonor}
                  onChange={(e) => setNewHonor(e.target.value)}
                  placeholder="e.g. Fellow, Nigerian Institute of Industrialists..."
                  className="flex-1 text-xs p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newHonor.trim()) {
                      handleFieldChange('honorsAndRecognitions', [...(formData.honorsAndRecognitions || []), newHonor.trim()]);
                      setNewHonor('');
                    }
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              <div className="space-y-1">
                {(formData.honorsAndRecognitions || []).map((hon, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800">
                    <span>{hon}</span>
                    <button
                      type="button"
                      onClick={() => {
                        handleFieldChange(
                          'honorsAndRecognitions',
                          formData.honorsAndRecognitions.filter((_, i) => i !== idx)
                        );
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm cursor-pointer"
        >
          Save All Changes
        </button>
      </div>
    </form>
  );
};
