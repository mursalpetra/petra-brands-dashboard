import { AlertTriangle } from 'lucide-react';
import DeadlineCard from './DeadlineCard';
import { isImmediate, getDaysUntil, getEarliestDeadline } from '../utils/dateHelpers';
import { sortByDeadline } from '../utils/filterHelpers';

export default function ImmediatePanel({ entries, onCardClick }) {
  // Filter for immediate window (30 days) and sort by earliest deadline
  const immediateEntries = entries
    .filter(e => !e.archived && isImmediate(e))
    .sort((a, b) => {
      const aDeadline = getEarliestDeadline(a);
      const bDeadline = getEarliestDeadline(b);
      return (aDeadline.days ?? Infinity) - (bDeadline.days ?? Infinity);
    });

  // Count critical items (< 7 days)
  const criticalCount = immediateEntries.filter(e => {
    const earliest = getEarliestDeadline(e);
    return earliest.days !== null && earliest.days < 7;
  }).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <AlertTriangle className={criticalCount > 0 ? 'text-red-600' : 'text-orange-600'} size={20} />
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Immediate Deadlines — Next 30 Days
          </h2>
          <span className={`ml-auto px-2 py-0.5 rounded-full text-sm font-medium ${
            criticalCount > 0
              ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
              : 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'
          }`}>
            {immediateEntries.length}
          </span>
        </div>

        {criticalCount > 0 && (
          <div className="mt-2 flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
            <AlertTriangle size={14} />
            <span>{criticalCount} item{criticalCount > 1 ? 's' : ''} due in less than 7 days!</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-h-[600px] overflow-auto">
        {immediateEntries.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No deadlines in the next 30 days
          </p>
        ) : (
          immediateEntries.map(entry => (
            <DeadlineCard
              key={entry.id}
              entry={entry}
              variant="immediate"
              onClick={onCardClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
