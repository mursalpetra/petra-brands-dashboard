import { X, Archive } from 'lucide-react';
import { formatDisplayDate } from '../utils/dateHelpers';
import { getBrandByName, getStatusByName } from '../utils/constants';

export default function ArchivedModal({ isOpen, onClose, entries }) {
  if (!isOpen) return null;

  const archivedEntries = entries.filter(e => e.archived);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Archive className="text-gray-500" size={20} />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Archived Reviews
            </h2>
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
              {archivedEntries.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(80vh-80px)]">
          {archivedEntries.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No archived reviews
            </p>
          ) : (
            <div className="space-y-3">
              {archivedEntries.map(entry => {
                const brand = getBrandByName(entry.brand);
                const status = getStatusByName(entry.status);

                return (
                  <div
                    key={entry.id}
                    className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${brand.bgClass} ${brand.textClass}`}>
                        {entry.brand}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${status.bgClass} ${status.textClass}`}>
                        {entry.status}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {entry.retailer} — {entry.category}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {entry.seasonOrProgram}
                    </p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>Review: {formatDisplayDate(entry.reviewDeadline)}</span>
                      {entry.submissionDeadline && (
                        <span>Submission: {formatDisplayDate(entry.submissionDeadline)}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
