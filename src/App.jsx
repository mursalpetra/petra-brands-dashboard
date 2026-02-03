import { useState, useMemo } from 'react';
import { PartyPopper, Palette, Calendar } from 'lucide-react';
import { reviewData } from './data/reviewData';
import { getDaysRemaining, getStatus, isFutureReview, CURRENT_DATE } from './utils/dateUtils';
import SummaryCards from './components/SummaryCards';
import AlertPanel from './components/AlertPanel';
import FilterBar from './components/FilterBar';
import ReviewTable from './components/ReviewTable';
import './App.css';

function App() {
  const [reviews, setReviews] = useState(reviewData);
  const [brandFilter, setBrandFilter] = useState('All');
  const [retailerFilter, setRetailerFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPast, setShowPast] = useState(false); // Default: only show future reviews

  // Get unique retailers for filter dropdown (from future reviews only, unless showPast)
  const retailers = useMemo(() => {
    const reviewsToUse = showPast
      ? reviews
      : reviews.filter(r => isFutureReview(r.submissionDeadline));
    const unique = [...new Set(reviewsToUse.map(r => r.retailer))];
    return unique.sort();
  }, [reviews, showPast]);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      // FIRST: Filter to future reviews only (unless showPast is enabled)
      if (!showPast && !isFutureReview(review.submissionDeadline)) {
        return false;
      }

      // Brand filter
      if (brandFilter !== 'All' && review.brand !== brandFilter) return false;

      // Retailer filter
      if (retailerFilter !== 'All' && review.retailer !== retailerFilter) return false;

      // Status filter
      if (statusFilter !== 'All') {
        const status = getStatus(getDaysRemaining(review.submissionDeadline), review.completed, showPast);
        if (status !== statusFilter) return false;
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !review.retailer.toLowerCase().includes(query) &&
          !review.category.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [reviews, brandFilter, retailerFilter, statusFilter, searchQuery, showPast]);

  const handleToggleComplete = (id) => {
    setReviews(reviews.map(r =>
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  const formattedDate = CURRENT_DATE.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1>Petra Brands — Category Review Tracker</h1>
          <div className="brand-labels">
            <span className="brand-label party"><PartyPopper size={16} /> House of Party</span>
            <span className="brand-label craft"><Palette size={16} /> Craft Hero</span>
          </div>
        </div>
        <div className="header-right">
          <div className="current-date">
            <Calendar size={18} />
            <span>{formattedDate}</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="top-section">
          <SummaryCards reviews={reviews} showPast={showPast} />
          <AlertPanel reviews={reviews} showPast={showPast} />
        </div>

        <FilterBar
          brandFilter={brandFilter}
          setBrandFilter={setBrandFilter}
          retailerFilter={retailerFilter}
          setRetailerFilter={setRetailerFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          retailers={retailers}
          showPast={showPast}
          setShowPast={setShowPast}
        />

        <ReviewTable
          reviews={filteredReviews}
          onToggleComplete={handleToggleComplete}
          showPast={showPast}
        />
      </main>

      <footer className="footer">
        <p>Petra Brands Sales Operations Dashboard</p>
      </footer>
    </div>
  );
}

export default App;
