import { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus } from 'lucide-react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import SummaryStats from './components/SummaryStats';
import DesignTeamPanel from './components/DesignTeamPanel';
import SalesTeamPanel from './components/SalesTeamPanel';
import ImmediatePanel from './components/ImmediatePanel';
import AddEditModal from './components/AddEditModal';
import ArchivedModal from './components/ArchivedModal';
import AutoArchiveToast from './components/AutoArchiveToast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { applyFilters } from './utils/filterHelpers';
import { isPastDeadline } from './utils/dateHelpers';
import seedData from './data/reviewDeadlines.json';

function App() {
  // Dark mode
  const [darkMode, setDarkMode] = useLocalStorage('petra-dark-mode', false);

  // Data from localStorage, merged with seed data
  const [entries, setEntries] = useLocalStorage('petra-review-deadlines', seedData);

  // Filters
  const [filters, setFilters] = useState({
    brands: [],
    retailers: [],
    statuses: [],
    categories: [],
    search: '',
  });

  // Modals
  const [editingEntry, setEditingEntry] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isArchivedModalOpen, setIsArchivedModalOpen] = useState(false);

  // Auto-archive toast
  const [archivedCount, setArchivedCount] = useState(0);
  const [showArchiveToast, setShowArchiveToast] = useState(false);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Auto-archive logic
  const runAutoArchive = useCallback(() => {
    const toArchive = entries.filter(e => !e.archived && isPastDeadline(e));
    if (toArchive.length > 0) {
      const updatedEntries = entries.map(e => {
        if (toArchive.some(a => a.id === e.id)) {
          return { ...e, archived: true };
        }
        return e;
      });
      setEntries(updatedEntries);
      setArchivedCount(toArchive.length);
      setShowArchiveToast(true);
    }
  }, [entries, setEntries]);

  // Run auto-archive on mount and every hour
  useEffect(() => {
    runAutoArchive();
    const interval = setInterval(runAutoArchive, 60 * 60 * 1000); // Every hour
    return () => clearInterval(interval);
  }, []); // Only run once on mount

  // Apply filters
  const filteredEntries = useMemo(() => {
    return applyFilters(entries, filters);
  }, [entries, filters]);

  // Handle save from modal
  const handleSave = (entryData) => {
    if (editingEntry) {
      // Update existing
      setEntries(entries.map(e => e.id === entryData.id ? entryData : e));
    } else {
      // Add new
      setEntries([...entries, entryData]);
    }
    setEditingEntry(null);
    setIsAddModalOpen(false);
  };

  // Handle card click (open edit modal)
  const handleCardClick = (entry) => {
    setEditingEntry(entry);
    setIsAddModalOpen(true);
  };

  // Handle add button click
  const handleAddClick = () => {
    setEditingEntry(null);
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <SummaryStats entries={filteredEntries} />

      {/* Main Panels */}
      <main className="px-6 py-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DesignTeamPanel entries={filteredEntries} onCardClick={handleCardClick} />
          <SalesTeamPanel entries={filteredEntries} onCardClick={handleCardClick} />
          <ImmediatePanel entries={filteredEntries} onCardClick={handleCardClick} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>Petra Brands &copy; 2025</p>
      </footer>

      {/* Floating Add Button */}
      <button
        onClick={handleAddClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-40"
        aria-label="Add new deadline"
      >
        <Plus size={24} />
      </button>

      {/* Modals */}
      <AddEditModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingEntry(null);
        }}
        onSave={handleSave}
        entry={editingEntry}
      />

      <ArchivedModal
        isOpen={isArchivedModalOpen}
        onClose={() => setIsArchivedModalOpen(false)}
        entries={entries}
      />

      {/* Auto-Archive Toast */}
      {showArchiveToast && (
        <AutoArchiveToast
          count={archivedCount}
          onViewArchived={() => {
            setShowArchiveToast(false);
            setIsArchivedModalOpen(true);
          }}
          onDismiss={() => setShowArchiveToast(false)}
        />
      )}
    </div>
  );
}

export default App;
