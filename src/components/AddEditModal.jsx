import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { BRANDS, RETAILERS, STATUSES, CATEGORIES, REVIEW_TYPES } from '../utils/constants';

export default function AddEditModal({ isOpen, onClose, onSave, entry }) {
  const isEdit = !!entry;

  const [formData, setFormData] = useState({
    brand: '',
    retailer: '',
    category: '',
    reviewType: '',
    reviewDeadline: '',
    submissionDeadline: '',
    seasonOrProgram: '',
    status: 'Not Started',
    notes: '',
    assignedTo: '',
    designLeadTime: 90,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (entry) {
      setFormData({
        brand: entry.brand || '',
        retailer: entry.retailer || '',
        category: entry.category || '',
        reviewType: entry.reviewType || '',
        reviewDeadline: entry.reviewDeadline || '',
        submissionDeadline: entry.submissionDeadline || '',
        seasonOrProgram: entry.seasonOrProgram || '',
        status: entry.status || 'Not Started',
        notes: entry.notes || '',
        assignedTo: entry.assignedTo || '',
        designLeadTime: entry.designLeadTime || 90,
      });
    } else {
      setFormData({
        brand: '',
        retailer: '',
        category: '',
        reviewType: '',
        reviewDeadline: '',
        submissionDeadline: '',
        seasonOrProgram: '',
        status: 'Not Started',
        notes: '',
        assignedTo: '',
        designLeadTime: 90,
      });
    }
    setErrors({});
  }, [entry, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (!formData.retailer) newErrors.retailer = 'Retailer is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.reviewDeadline) newErrors.reviewDeadline = 'Review deadline is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        id: entry?.id || `entry-${Date.now()}`,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isEdit ? 'Edit Review Deadline' : 'Add Review Deadline'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Brand *
              </label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                  errors.brand ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select brand...</option>
                {BRANDS.map(b => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
              {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
            </div>

            {/* Retailer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Retailer *
              </label>
              <select
                value={formData.retailer}
                onChange={(e) => setFormData({ ...formData, retailer: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                  errors.retailer ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select retailer...</option>
                {RETAILERS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              {errors.retailer && <p className="text-red-500 text-xs mt-1">{errors.retailer}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                  errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select category...</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            {/* Review Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Review Type
              </label>
              <select
                value={formData.reviewType}
                onChange={(e) => setFormData({ ...formData, reviewType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select type...</option>
                {REVIEW_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Review Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Review Deadline *
              </label>
              <input
                type="date"
                value={formData.reviewDeadline}
                onChange={(e) => setFormData({ ...formData, reviewDeadline: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                  errors.reviewDeadline ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.reviewDeadline && <p className="text-red-500 text-xs mt-1">{errors.reviewDeadline}</p>}
            </div>

            {/* Submission Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Submission Deadline
              </label>
              <input
                type="date"
                value={formData.submissionDeadline}
                onChange={(e) => setFormData({ ...formData, submissionDeadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Season/Program */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Season/Program
              </label>
              <input
                type="text"
                value={formData.seasonOrProgram}
                onChange={(e) => setFormData({ ...formData, seasonOrProgram: e.target.value })}
                placeholder="e.g., Valentine's Day 2026"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              >
                {STATUSES.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Assigned To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Assigned To
              </label>
              <input
                type="text"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                placeholder="Team member name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Design Lead Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Design Lead Time (days)
              </label>
              <input
                type="number"
                value={formData.designLeadTime}
                onChange={(e) => setFormData({ ...formData, designLeadTime: parseInt(e.target.value) || 90 })}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Additional details..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEdit ? 'Save Changes' : 'Add Deadline'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
