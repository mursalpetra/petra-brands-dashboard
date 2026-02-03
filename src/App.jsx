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
  const [showAllCategories, setShowAllCategories] = useState(false); // Default: only show relevant categories

  // Get unique retailers for filter dropdown (from filtered reviews)
  const retailers = useMemo(() => {
    const reviewsToUse = reviews.filter(r => {
      // Apply category filter
      if (!showAllCategories && !r.categoryIncluded) return false;
      // Apply time filter
      if (!showPast && !isFutureReview(r.submissionDeadline)) return false;
      return true;
    });
    const unique = [...new Set(reviewsToUse.map(r => r.retailer))];
    return unique.sort();
  }, [reviews, showPast, showAllCategories]);

  // Filter reviews - apply category filter FIRST, then other filters
  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      // FIRST: Category filter (unless showAllCategories is enabled)
      if (!showAllCategories && !review.categoryIncluded) {
        return false;
      }

      // SECOND: Filter to future reviews only (unless showPast is enabled)
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
  }, [reviews, brandFilter, retailerFilter, statusFilter, searchQuery, showPast, showAllCategories]);

  // Get base filtered reviews for summary cards and alerts (category + time filtered)
  const baseFilteredReviews = useMemo(() => {
    return reviews.filter(review => {
      if (!showAllCategories && !review.categoryIncluded) return false;
      if (!showPast && !isFutureReview(review.submissionDeadline)) return false;
      return true;
    });
  }, [reviews, showPast, showAllCategories]);

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

  // Count stats for header
  const relevantCount = reviews.filter(r => r.categoryIncluded).length;
  const totalCount = reviews.length;

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
          {!showAllCategories && (
            <div className="filter-indicator">
              Showing {relevantCount} of {totalCount} categories
            </div>
          )}
        </div>
      </header>

      <main className="main-content">
        <div className="top-section">
          <SummaryCards reviews={baseFilteredReviews} showPast={showPast} />
          <AlertPanel reviews={baseFilteredReviews} showPast={showPast} />
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
          showAllCategories={showAllCategories}
          setShowAllCategories={setShowAllCategories}
        />

        <ReviewTable
          reviews={filteredReviews}
          onToggleComplete={handleToggleComplete}
          showPast={showPast}
        />
      </main>

      <footer className="footer">
        <p>Petra Brands Sales Operations Dashboard — Seasonal Party & Craft Categories</p>
      </footer>
    </div>
  );
}

export default App;
