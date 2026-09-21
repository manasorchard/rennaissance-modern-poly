import React, { useState, useMemo } from 'react';
import { useDataContext } from '../context/DataContext';
import { FAQCategory, FAQItem } from '../types';
import { 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  GraduationCap, 
  CreditCard, 
  Compass, 
  X, 
  AlertCircle,
  Eye,
  Filter
} from 'lucide-react';

interface AdminFAQTabProps {
  onShowToast: (msg: string) => void;
}

export const AdminFAQTab: React.FC<AdminFAQTabProps> = ({ onShowToast }) => {
  const { 
    faqs, 
    updateFAQ, 
    addFAQ, 
    deleteFAQ, 
    reorderFAQs, 
    resetFAQsToDefault 
  } = useDataContext();

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modal / Editing states
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Form states for Create/Edit
  const [formQuestion, setFormQuestion] = useState<string>('');
  const [formAnswer, setFormAnswer] = useState<string>('');
  const [formCategory, setFormCategory] = useState<FAQCategory>('Admissions');
  const [formOrder, setFormOrder] = useState<number>(1);
  const [formHighlighted, setFormHighlighted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Sorted and filtered list
  const sortedFaqs = useMemo(() => {
    return [...faqs].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    return sortedFaqs.filter(faq => {
      if (selectedCategory !== 'all' && faq.category !== selectedCategory) {
        return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const mQ = faq.question.toLowerCase().includes(q);
        const mA = faq.answer.toLowerCase().includes(q);
        return mQ || mA;
      }
      return true;
    });
  }, [sortedFaqs, selectedCategory, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: faqs.length,
      admissions: faqs.filter(f => f.category === 'Admissions').length,
      fees: faqs.filter(f => f.category === 'School Fees').length,
      general: faqs.filter(f => f.category === 'General Inquiries').length,
      highlighted: faqs.filter(f => f.highlighted).length,
    };
  }, [faqs]);

  // Open Create Modal
  const handleOpenCreate = () => {
    const nextOrder = faqs.length > 0 ? Math.max(...faqs.map(f => f.order || 0)) + 1 : 1;
    setFormQuestion('');
    setFormAnswer('');
    setFormCategory('Admissions');
    setFormOrder(nextOrder);
    setFormHighlighted(false);
    setFormError('');
    setIsCreating(true);
    setIsEditing(false);
    setEditingFaq(null);
  };

  // Open Edit Modal
  const handleOpenEdit = (faq: FAQItem) => {
    setEditingFaq(faq);
    setFormQuestion(faq.question);
    setFormAnswer(faq.answer);
    setFormCategory(faq.category);
    setFormOrder(faq.order);
    setFormHighlighted(!!faq.highlighted);
    setFormError('');
    setIsEditing(true);
    setIsCreating(false);
  };

  // Save (Create or Update)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim()) {
      setFormError('Question text is required.');
      return;
    }
    if (!formAnswer.trim()) {
      setFormError('Answer text is required.');
      return;
    }

    if (isCreating) {
      const newFaq: FAQItem = {
        id: `faq-custom-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
        question: formQuestion.trim(),
        answer: formAnswer.trim(),
        category: formCategory,
        order: Number(formOrder) || 1,
        highlighted: formHighlighted,
      };
      addFAQ(newFaq);
      onShowToast('New FAQ successfully added to the Institutional Home Page!');
    } else if (isEditing && editingFaq) {
      const updated: FAQItem = {
        ...editingFaq,
        question: formQuestion.trim(),
        answer: formAnswer.trim(),
        category: formCategory,
        order: Number(formOrder) || 1,
        highlighted: formHighlighted,
      };
      updateFAQ(updated);
      onShowToast('FAQ item updated successfully!');
    }

    setIsCreating(false);
    setIsEditing(false);
    setEditingFaq(null);
  };

  // Delete
  const handleDelete = (id: string) => {
    deleteFAQ(id);
    setDeleteConfirmId(null);
    onShowToast('FAQ question deleted.');
  };

  // Reordering helpers (move up / down)
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedFaqs.length) return;

    const listCopy = [...sortedFaqs];
    const current = listCopy[index];
    const target = listCopy[targetIndex];

    // Swap order values
    const currentOrder = current.order;
    current.order = target.order;
    target.order = currentOrder;

    // Swap positions
    listCopy[index] = target;
    listCopy[targetIndex] = current;

    reorderFAQs(listCopy);
    onShowToast(`Repositioned question: "${current.question.substring(0, 30)}..."`);
  };

  // Reset to Defaults
  const handleReset = () => {
    resetFAQsToDefault();
    setShowResetConfirm(false);
    onShowToast('All FAQs have been reset to official institutional defaults.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Quick Action */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Institutional FAQ Content Management</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Frequently Asked Questions (FAQ) Manager
          </h2>
          <p className="text-xs text-slate-500">
            Manage questions and official answers for Admission Requirements, School Fees & Remita, and General Inquiries displayed on the institutional website.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            id="admin-add-faq-btn"
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New FAQ Question</span>
          </button>

          <button
            id="admin-reset-faqs-btn"
            onClick={() => setShowResetConfirm(true)}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors border border-slate-300 cursor-pointer"
            title="Reset to default institutional questions"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Total FAQs</span>
            <HelpCircle className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-black text-slate-900">{stats.total}</p>
          <span className="text-[10px] text-slate-400">Live on home page</span>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-bold mb-1">
            <span>Admissions</span>
            <GraduationCap className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-950">{stats.admissions}</p>
          <span className="text-[10px] text-emerald-700">JAMB, O&apos;Level, HND</span>
        </div>

        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between text-amber-900 text-xs font-bold mb-1">
            <span>School Fees</span>
            <CreditCard className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-2xl font-black text-amber-950">{stats.fees}</p>
          <span className="text-[10px] text-amber-800">Tuition, Remita, Installment</span>
        </div>

        <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-200 shadow-xs">
          <div className="flex items-center justify-between text-sky-900 text-xs font-bold mb-1">
            <span>General</span>
            <Compass className="w-4 h-4 text-sky-700" />
          </div>
          <p className="text-2xl font-black text-sky-950">{stats.general}</p>
          <span className="text-[10px] text-sky-800">Accreditation, NYSC, Hostel</span>
        </div>

        <div className="bg-purple-50/70 p-4 rounded-xl border border-purple-200 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-purple-900 text-xs font-bold mb-1">
            <span>Highlighted</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-purple-950">{stats.highlighted}</p>
          <span className="text-[10px] text-purple-700">Featured &quot;Most Asked&quot;</span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="inline-flex items-center gap-1 text-xs text-slate-500 font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>

          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({stats.total})
          </button>
          
          <button
            onClick={() => setSelectedCategory('Admissions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
              selectedCategory === 'Admissions'
                ? 'bg-emerald-800 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            Admissions ({stats.admissions})
          </button>

          <button
            onClick={() => setSelectedCategory('School Fees')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
              selectedCategory === 'School Fees'
                ? 'bg-amber-600 text-slate-950'
                : 'bg-amber-50 text-amber-950 hover:bg-amber-100'
            }`}
          >
            School Fees ({stats.fees})
          </button>

          <button
            onClick={() => setSelectedCategory('General Inquiries')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
              selectedCategory === 'General Inquiries'
                ? 'bg-sky-800 text-white'
                : 'bg-sky-50 text-sky-950 hover:bg-sky-100'
            }`}
          >
            General Inquiries ({stats.general})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions or answers..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* FAQs List Table / Cards */}
      {filteredFaqs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No FAQs found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm ? `No questions matched your search "${searchTerm}".` : 'No FAQs in this category.'}
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create a Question Now</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const globalIndex = sortedFaqs.findIndex(f => f.id === faq.id);
            const isFirst = globalIndex === 0;
            const isLast = globalIndex === sortedFaqs.length - 1;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
              >
                {/* Left Section: Reordering arrows & Category & Title */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Reorder Up/Down */}
                  <div className="flex flex-col items-center justify-center gap-0.5 shrink-0 bg-slate-50 p-1 rounded-lg border border-slate-200">
                    <button
                      onClick={() => handleMove(globalIndex, 'up')}
                      disabled={isFirst}
                      className={`p-1 rounded transition-colors ${
                        isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-200 cursor-pointer'
                      }`}
                      title="Move question up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-black text-slate-500">
                      {faq.order}
                    </span>
                    <button
                      onClick={() => handleMove(globalIndex, 'down')}
                      disabled={isLast}
                      className={`p-1 rounded transition-colors ${
                        isLast ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-200 cursor-pointer'
                      }`}
                      title="Move question down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        faq.category === 'Admissions'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : faq.category === 'School Fees'
                          ? 'bg-amber-100 text-amber-950 border-amber-300'
                          : 'bg-sky-100 text-sky-950 border-sky-300'
                      }`}>
                        {faq.category}
                      </span>

                      {faq.highlighted && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
                          <Sparkles className="w-3 h-3 text-slate-950" />
                          <span>Most Asked</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                {/* Right Section: Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-end">
                  <button
                    id={`admin-edit-faq-${faq.id}`}
                    onClick={() => handleOpenEdit(faq)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer border border-slate-200 hover:border-emerald-300"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Edit</span>
                  </button>

                  <button
                    id={`admin-delete-faq-${faq.id}`}
                    onClick={() => setDeleteConfirmId(faq.id)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer border border-slate-200 hover:border-rose-300"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Create or Edit FAQ */}
      {(isCreating || isEditing) && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isCreating ? 'Add New Frequently Asked Question' : 'Edit Question & Answer'}
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Changes will appear immediately on the Institutional Home Page.
                  </p>
                </div>
              </div>

              <button
                onClick={() => { setIsCreating(false); setIsEditing(false); }}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  FAQ Category *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFormCategory('Admissions')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      formCategory === 'Admissions'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <p className="text-xs font-bold">Admissions</p>
                      <p className="text-[10px] text-slate-500">JAMB, O&apos;Level, HND</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormCategory('School Fees')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      formCategory === 'School Fees'
                        ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-800 shrink-0" />
                    <div>
                      <p className="text-xs font-bold">School Fees</p>
                      <p className="text-[10px] text-slate-500">Tuition & Remita</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormCategory('General Inquiries')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      formCategory === 'General Inquiries'
                        ? 'border-sky-600 bg-sky-50 text-sky-950 font-bold ring-2 ring-sky-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Compass className="w-4 h-4 text-sky-700 shrink-0" />
                    <div>
                      <p className="text-xs font-bold">General</p>
                      <p className="text-[10px] text-slate-500">NYSC, Hostels, etc.</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Question Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="e.g. Can candidates with awaiting O'Level results apply?"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-semibold"
                  required
                />
              </div>

              {/* Answer Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Official Answer *
                </label>
                <textarea
                  rows={6}
                  value={formAnswer}
                  onChange={(e) => setFormAnswer(e.target.value)}
                  placeholder="Provide a thorough, accurate institutional answer addressing the question clearly..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 leading-relaxed"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Tip: Include clear numbers, deadlines, or actionable instructions (e.g. fees, percentages, website links).
                </p>
              </div>

              {/* Order & Highlighted Flags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Display Priority Order
                  </label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    min={1}
                    max={999}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                  <span className="text-[11px] text-slate-400">Lower numbers appear earlier.</span>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer w-full mt-4">
                    <input
                      type="checkbox"
                      checked={formHighlighted}
                      onChange={(e) => setFormHighlighted(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Feature as &quot;Most Asked&quot;
                      </span>
                      <span className="text-slate-500 text-[11px] block">
                        Displays a prominent gold badge and opens early
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setIsEditing(false); }}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>{isCreating ? 'Create FAQ Question' : 'Save Changes'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">Delete FAQ Question?</h3>
              <p className="text-xs text-slate-500">
                This question and its answer will be removed from the public website. You can recreate it or reset defaults anytime.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100"
              >
                Keep Question
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md"
              >
                Yes, Delete Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Reset Confirmation */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">Reset FAQs to Institutional Defaults?</h3>
              <p className="text-xs text-slate-500">
                This will restore the 15 standard, NBTE-verified polytechnic FAQs for admissions, school fees, and general inquiries, replacing any customized or newly added items.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
