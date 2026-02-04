import { getDaysUntil, getUrgencyClasses, formatDisplayDate } from '../utils/dateHelpers';
import { getBrandByName, getStatusByName } from '../utils/constants';

export default function DeadlineCard({ entry, variant = 'default', onClick }) {
  const brand = getBrandByName(entry.brand);
  const status = getStatusByName(entry.status);
  const daysToReview = getDaysUntil(entry.reviewDeadline);
  const daysToSubmission = getDaysUntil(entry.submissionDeadline);
  const urgency = getUrgencyClasses(Math.min(daysToReview ?? Infinity, daysToSubmission ?? Infinity));

  const isLarge = variant === 'immediate';
  const showFullNotes = variant === 'immediate';

  return (
    <div
      onClick={() => onClick?.(entry)}
      className={`
        bg-white dark:bg-gray-800 rounded-xl border-2 p-4 cursor-pointer
        hover:shadow-md transition-all
        ${isLarge ? urgency.border : 'border-gray-200 dark:border-gray-700'}
        ${daysToReview !== null && daysToReview < 7 ? 'urgent-pulse' : ''}
      `}
    >
      {/* Header: Brand + Status */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${brand.bgClass} ${brand.textClass}`}>
          {entry.brand}
        </span>
        <span className={`px-2 py-1 rounded text-xs font-medium ${status.bgClass} ${status.textClass}`}>
          {entry.status}
        </span>
      </div>

      {/* Retailer */}
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
        {entry.retailer}
      </h3>

      {/* Category + Season */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {entry.category} — {entry.seasonOrProgram}
      </p>

      {/* Deadlines */}
      <div className="space-y-1 mb-3">
        {daysToReview !== null && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Review Deadline</span>
            <span className={`font-medium ${urgency.text}`}>
              {formatDisplayDate(entry.reviewDeadline)}
              {isLarge && (
                <span className="ml-2 text-xs">
                  ({daysToReview} days)
                </span>
              )}
            </span>
          </div>
        )}
        {daysToSubmission !== null && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Submission</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {formatDisplayDate(entry.submissionDeadline)}
            </span>
          </div>
        )}
      </div>

      {/* Countdown (large variant) */}
      {isLarge && daysToReview !== null && (
        <div className={`text-center py-2 rounded-lg mb-3 ${urgency.bg}`}>
          <span className={`text-2xl font-bold ${urgency.text}`}>
            {daysToReview < 0 ? 'OVERDUE' : `${daysToReview} DAYS`}
          </span>
        </div>
      )}

      {/* Countdown badge (default variant) */}
      {!isLarge && daysToReview !== null && (
        <div className="flex items-center gap-2 mb-3">
          <span className={`
            inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
            ${daysToReview < 30 ? urgency.bg : 'bg-gray-100 dark:bg-gray-700'}
            ${daysToReview < 30 ? urgency.text : 'text-gray-600 dark:text-gray-400'}
          `}>
            {daysToReview < 0 ? 'Overdue' : `${daysToReview} days left`}
          </span>
        </div>
      )}

      {/* Assigned To */}
      {entry.assignedTo && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Assigned: {entry.assignedTo}
        </p>
      )}

      {/* Notes */}
      {entry.notes && (
        <p className={`text-sm text-gray-600 dark:text-gray-400 ${showFullNotes ? '' : 'line-clamp-2'}`}>
          {entry.notes}
        </p>
      )}
    </div>
  );
}
