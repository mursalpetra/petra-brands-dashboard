import { Search, Filter } from 'lucide-react';

export default function FilterBar({
  brandFilter,
  setBrandFilter,
  retailerFilter,
  setRetailerFilter,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
  retailers
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
            <option value="OVERDUE">Overdue</option>
            <option value="URGENT">Urgent</option>
            <option value="PREP_NOW">Prep Now</option>
            <option value="ON_TRACK">On Track</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
