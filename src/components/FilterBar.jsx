import { Search, History, Layers } from 'lucide-react';

export default function FilterBar({
  brandFilter,
  setBrandFilter,
  retailerFilter,
  setRetailerFilter,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
  retailers,
  showPast,
  setShowPast,
  showAllCategories,
  setShowAllCategories
}) {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search retailers or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Brand</label>
          <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
            <option value="All">All Brands</option>
            <option value="House of Party">House of Party</option>
            <option value="Craft Hero">Craft Hero</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Retailer</label>
          <select value={retailerFilter} onChange={(e) => setRetailerFilter(e.target.value)}>
            <option value="All">All Retailers</option>
            {retailers.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            {showPast && <option value="OVERDUE">Overdue</option>}
            <option value="URGENT">Urgent</option>
            <option value="PREP_NOW">Prep Now</option>
            <option value="ON_TRACK">On Track</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="toggle-divider" />

        <div className="filter-group toggle-group">
          <label className="toggle-label">
            <Layers size={14} />
            <span>All Categories</span>
          </label>
          <button
            className={`toggle-switch ${showAllCategories ? 'active' : ''}`}
            onClick={() => setShowAllCategories(!showAllCategories)}
            aria-label="Toggle all categories"
            title={showAllCategories ? "Showing all categories" : "Showing only Party & Craft categories"}
          >
            <span className="toggle-knob" />
          </button>
        </div>

        <div className="filter-group toggle-group">
          <label className="toggle-label">
            <History size={14} />
            <span>Past Reviews</span>
          </label>
          <button
            className={`toggle-switch ${showPast ? 'active' : ''}`}
            onClick={() => setShowPast(!showPast)}
            aria-label="Toggle past reviews"
            title={showPast ? "Showing past reviews" : "Showing future reviews only"}
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </div>
    </div>
  );
}
