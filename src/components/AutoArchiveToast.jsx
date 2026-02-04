import { Clock, X } from 'lucide-react';

export default function AutoArchiveToast({ count, onViewArchived, onDismiss }) {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3 max-w-sm animate-slide-up">
      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
        <Clock size={18} className="text-gray-600 dark:text-gray-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-900 dark:text-white">
          {count} past deadline{count > 1 ? 's' : ''} auto-archived
        </p>
        <button
          onClick={onViewArchived}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          View archived items
        </button>
      </div>
      <button
        onClick={onDismiss}
        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <X size={16} />
      </button>
    </div>
  );
}
