// Brand definitions with colors
export const BRANDS = [
  { id: 'house-of-party', name: 'House of Party', color: '#9333EA', bgClass: 'bg-purple-100', textClass: 'text-purple-700', dotClass: 'bg-purple-500' },
  { id: 'roofus', name: 'Roofus', color: '#F97316', bgClass: 'bg-orange-100', textClass: 'text-orange-700', dotClass: 'bg-orange-500' },
  { id: 'fomin', name: 'Fomin', color: '#14B8A6', bgClass: 'bg-teal-100', textClass: 'text-teal-700', dotClass: 'bg-teal-500' },
  { id: 'luna', name: 'Luna', color: '#EC4899', bgClass: 'bg-pink-100', textClass: 'text-pink-700', dotClass: 'bg-pink-500' },
  { id: 'everymood', name: 'EveryMood', color: '#22C55E', bgClass: 'bg-green-100', textClass: 'text-green-700', dotClass: 'bg-green-500' },
  { id: 'craft-hero', name: 'Craft Hero', color: '#3B82F6', bgClass: 'bg-blue-100', textClass: 'text-blue-700', dotClass: 'bg-blue-500' },
];

// Retailers
export const RETAILERS = [
  'Ahold Delhaize: Giant Food HQ',
  'Ahold Delhaize: Hannaford HQ',
  'Ahold Delhaize: Stop & Shop HQ',
  'Ahold Delhaize: The Giant Company HQ',
  'Albertsons HQ',
  'Albertsons Safeway',
  "Basha's",
  "Busch's HQ",
  'Food City HQ',
  'Good Eggs',
  'Harmons',
  'Harmons HQ',
  'Kroger',
  'Kroger HQ',
  'Kroger: Harris Teeter',
  "Lucky's & SaveMart",
  "Mother's Market",
  'Nugget',
  'Publix',
  'Publix Super Markets HQ',
  "Raley's",
  "Raley's HQ",
  'Sprouts',
  'Target',
  'TJX (Marshalls/TJ Maxx/HomeGoods)',
  'TJX Canada (HomeSense/Marshalls/Winners)',
  'WinCo Foods HQ',
];

// Status definitions with styling
export const STATUSES = [
  { id: 'not-started', name: 'Not Started', color: '#6B7280', bgClass: 'bg-gray-100', textClass: 'text-gray-700' },
  { id: 'design-in-progress', name: 'Design In Progress', color: '#F59E0B', bgClass: 'bg-amber-100', textClass: 'text-amber-700' },
  { id: 'samples-ready', name: 'Samples Ready', color: '#3B82F6', bgClass: 'bg-blue-100', textClass: 'text-blue-700' },
  { id: 'submitted', name: 'Submitted', color: '#8B5CF6', bgClass: 'bg-purple-100', textClass: 'text-purple-700' },
  { id: 'under-review', name: 'Under Review', color: '#F97316', bgClass: 'bg-orange-100', textClass: 'text-orange-700' },
  { id: 'accepted', name: 'Accepted', color: '#22C55E', bgClass: 'bg-green-100', textClass: 'text-green-700' },
  { id: 'rejected', name: 'Rejected', color: '#EF4444', bgClass: 'bg-red-100', textClass: 'text-red-700' },
  { id: 'revision-needed', name: 'Revision Needed', color: '#DC2626', bgClass: 'bg-red-50', textClass: 'text-red-600' },
];

// Season / Program categories (used for filtering)
export const CATEGORIES = [
  'Back to School',
  'Christmas / Holiday',
  'Easter / Spring',
  'Everyday / Core',
  'Halloween',
  'Summer',
  'Thanksgiving / Fall',
  "Valentine's Day",
];

// Review types
export const REVIEW_TYPES = [
  'Line Review',
  'Category Reset',
  'New Item Submission',
  'Planogram Update',
  'Promotional Review',
  'Quarterly Review',
];

// Helper functions
export function getBrandById(id) {
  return BRANDS.find(b => b.id === id) || BRANDS[0];
}

export function getBrandByName(name) {
  return BRANDS.find(b => b.name === name) || BRANDS[0];
}

export function getStatusById(id) {
  return STATUSES.find(s => s.id === id) || STATUSES[0];
}

export function getStatusByName(name) {
  return STATUSES.find(s => s.name === name) || STATUSES[0];
}
