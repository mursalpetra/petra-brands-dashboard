import { ClipboardList } from 'lucide-react';
import DeadlineCard from './DeadlineCard';
import { isInSalesWindow } from '../utils/dateHelpers';
import { countByField, sortByDeadline } from '../utils/filterHelpers';

export default function SalesTeamPanel({ entries, onCardClick }) {
  // Filter for sales window and sort by submission deadline
  const salesEntries = sortByDeadline(
    entries.filter(e => !e.archived && isInSalesWindow(e)),
    'submissionDeadline',
    true
  );

  // Count by retailer
  const retailerCounts = countByField(salesEntries, 'retailer');

  // Get top 3 retailers for display
  const topRetailers = Object.entries(retailerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardList className="text-blue-600" size={20} />
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Sales Team — Prep & Submissions
          </h2>
          <span className="ml-auto px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            {salesEntries.length}
          </span>
        </div>

        {/* Retailer breakdown */}
        {topRetailers.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {topRetailers.map(([retailer, count]) => (
              <span
                key={retailer}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {retailer}: {count}
              </span>
            ))}
            {Object.keys(retailerCounts).length > 3 && (
              <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                +{Object.keys(retailerCounts).length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 max-h-[600px] overflow-auto">
        {salesEntries.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No submissions due in the next 90 days
          </p>
        ) : (
          salesEntries.map(entry => (
            <DeadlineCard
              key={entry.id}
              entry={entry}
              onClick={onCardClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
