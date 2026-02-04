import { Palette } from 'lucide-react';
import DeadlineCard from './DeadlineCard';
import { isInDesignWindow, isDesignComingUp } from '../utils/dateHelpers';
import { countByField } from '../utils/filterHelpers';
import { BRANDS } from '../utils/constants';

export default function DesignTeamPanel({ entries, onCardClick }) {
  // Filter for design window
  const designEntries = entries.filter(e => !e.archived && isInDesignWindow(e));
  const comingUpEntries = entries.filter(e => !e.archived && isDesignComingUp(e));

  // Count by brand
  const brandCounts = countByField(designEntries, 'brand');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="text-purple-600" size={20} />
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Design Team — Work On Now
          </h2>
          <span className="ml-auto px-2 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
            {designEntries.length}
          </span>
        </div>

        {/* Brand breakdown */}
        {Object.keys(brandCounts).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {BRANDS.map(brand => {
              const count = brandCounts[brand.name] || 0;
              if (count === 0) return null;
              return (
                <span
                  key={brand.id}
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${brand.bgClass} ${brand.textClass}`}
                >
                  {brand.name}: {count}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-h-[600px] overflow-auto">
        {designEntries.length === 0 && comingUpEntries.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No items currently in the design window
          </p>
        ) : (
          <>
            {/* Current Design Work */}
            {designEntries.length > 0 && (
              <div className="space-y-3">
                {designEntries.map(entry => (
                  <DeadlineCard
                    key={entry.id}
                    entry={entry}
                    onClick={onCardClick}
                  />
                ))}
              </div>
            )}

            {/* Coming Up */}
            {comingUpEntries.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  Coming Up (next 14 days)
                </h3>
                <div className="space-y-3">
                  {comingUpEntries.map(entry => (
                    <DeadlineCard
                      key={entry.id}
                      entry={entry}
                      onClick={onCardClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
