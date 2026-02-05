import { useState } from 'react';
import { Search, X, ChevronDown, Filter } from 'lucide-react';
import { BRANDS, RETAILERS, STATUSES, CATEGORIES } from '../utils/constants';

function MultiSelect({ label, options, selected, onChange, renderOption }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:border-gray-400 dark:hover:border-gray-500 transition-colors min-w-[140px]"
      >
        <span className="text-gray-700 dark:text-gray-300">
          {selected.length === 0 ? label : `${label} (${selected.length})`}
        </span>
        <ChevronDown size={16} className="text-gray-500 ml-auto" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-64 overflow-auto">
            {options.map((option, idx) => {
              const value = typeof option === 'string' ? option : option.name;
              const isSelected = selected.includes(value);

              return (
                <button
                  key={idx}
                  onClick={() => toggleOption(value)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                  }`}
                >
                  <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  {renderOption ? renderOption(option) : (
                    <span className="text-gray-700 dark:text-gray-300">{value}</span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function FilterBar({ filters, setFilters }) {
  const { brands, retailers, statuses, categories, search } = filters;

  const hasActiveFilters =
    brands.length > 0 ||
    retailers.length > 0 ||
    statuses.length > 0 ||
    categories.length > 0 ||
    search.trim() !== '';

  const clearFilters = () => {
    setFilters({
      brands: [],
      retailers: [],
      statuses: [],
      categories: [],
      search: '',
    });
  };

  return (
    <div className="sticky top-0 z-30 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex flex-wrap items-center gap-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Filter size={18} />
          <span className="text-sm font-medium">Filters</span>
        </div>

        <MultiSelect
          label="Brand"
          options={BRANDS}
          selected={brands}
          onChange={(val) => setFilters({ ...filters, brands: val })}
          renderOption={(brand) => (
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${brand.dotClass}`} />
              <span className="text-gray-700 dark:text-gray-300">{brand.name}</span>
            </div>
          )}
        />

        <MultiSelect
          label="Retailer"
          options={RETAILERS}
          selected={retailers}
          onChange={(val) => setFilters({ ...filters, retailers: val })}
        />

        <MultiSelect
          label="Status"
          options={STATUSES}
          selected={statuses}
          onChange={(val) => setFilters({ ...filters, statuses: val })}
          renderOption={(status) => (
            <div className="flex items-center gap-2">
              <div className={`px-1.5 py-0.5 rounded text-xs ${status.bgClass} ${status.textClass}`}>
                {status.name}
              </div>
            </div>
          )}
        />

        <MultiSelect
          label="Season"
          options={CATEGORIES}
          selected={categories}
          onChange={(val) => setFilters({ ...filters, categories: val })}
        />

        <div className="flex-1 min-w-[200px] max-w-xs">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X size={16} />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
