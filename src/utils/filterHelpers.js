// Apply all filters with AND logic
export function applyFilters(entries, filters) {
  const { brands, retailers, statuses, categories, search } = filters;

  return entries.filter(entry => {
    // Brand filter (multi-select)
    if (brands && brands.length > 0) {
      if (!brands.includes(entry.brand)) return false;
    }

    // Retailer filter (multi-select)
    if (retailers && retailers.length > 0) {
      if (!retailers.includes(entry.retailer)) return false;
    }

    // Status filter (multi-select)
    if (statuses && statuses.length > 0) {
      if (!statuses.includes(entry.status)) return false;
    }

    // Category filter (matches against seasonOrProgram for cleaner grouping)
    if (categories && categories.length > 0) {
      if (!categories.includes(entry.seasonOrProgram)) return false;
    }

    // Search filter (searches across all text fields)
    if (search && search.trim()) {
      const query = search.toLowerCase().trim();
      const searchableFields = [
        entry.brand,
        entry.retailer,
        entry.category,
        entry.seasonOrProgram,
        entry.notes,
        entry.assignedTo,
        entry.reviewType,
      ].filter(Boolean);

      const matches = searchableFields.some(field =>
        field.toLowerCase().includes(query)
      );

      if (!matches) return false;
    }

    return true;
  });
}

// Get unique values for filter dropdowns
export function getUniqueValues(entries, field) {
  const values = entries.map(entry => entry[field]).filter(Boolean);
  return [...new Set(values)].sort();
}

// Count entries by field (for summaries)
export function countByField(entries, field) {
  const counts = {};
  entries.forEach(entry => {
    const value = entry[field];
    if (value) {
      counts[value] = (counts[value] || 0) + 1;
    }
  });
  return counts;
}

// Sort entries by deadline
export function sortByDeadline(entries, field = 'submissionDeadline', ascending = true) {
  return [...entries].sort((a, b) => {
    const dateA = new Date(a[field]);
    const dateB = new Date(b[field]);
    return ascending ? dateA - dateB : dateB - dateA;
  });
}
