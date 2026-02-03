// Category Review Data from HarvestHub
// Auto-assigned brands based on category keywords

const rawData = [
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-07-17", reviewType: "Minor" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-07-17", reviewType: "Speed to Shelf" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring", deadline: "2026-07-17", reviewType: "Major" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2026-05-22", reviewType: "Reset" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, Paper Products, Wraps, Garbage Bags", deadline: "2026-05-15", reviewType: "Minor" },
  { retailer: "Ahold Delhaize: Giant Food HQ", categories: "Misc. Outdoors", deadline: "2026-04-27", reviewType: "Full Review" },
  { retailer: "Raley's HQ", categories: "Misc. Outdoors, Film/Electronics", deadline: "2026-04-17", reviewType: "Reset" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors", deadline: "2026-04-10", reviewType: "Major" },
  { retailer: "Ahold Delhaize: Hannaford HQ", categories: "Misc. Outdoors", deadline: "2026-04-06", reviewType: "Reset" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-04-03", reviewType: "Reset" },
  { retailer: "Harmons HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-03-12", reviewType: "" },
  { retailer: "Kroger: Harris Teeter HQ", categories: "Misc. Outdoors, Household Hardware", deadline: "2026-02-25", reviewType: "" },
  { retailer: "Raley's HQ", categories: "Misc. Outdoors", deadline: "2026-02-20", reviewType: "Refresh" },
  { retailer: "Publix Super Markets HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", reviewType: "Major" },
  { retailer: "Mother's Market HQ", categories: "House & Kitchenware, Misc. Household, Misc. Outdoors", deadline: "2026-02-13", reviewType: "Full Review" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", reviewType: "Major" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors", deadline: "2026-02-13", reviewType: "Minor" },
  { retailer: "Raley's HQ", categories: "Misc. Outdoors", deadline: "2026-02-06", reviewType: "Reset" },
  { retailer: "Busch's HQ", categories: "Misc. Outdoors, General Merchandise - Summer, Spring", deadline: "2026-01-16", reviewType: "" },
  { retailer: "Kroger HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-01-03", reviewType: "4 Week Blitz" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2026-01-02", reviewType: "Reset" },
  { retailer: "Ahold Delhaize: Giant Food HQ", categories: "Candy, Air Fresheners, Office/School Supplies, Gifts, Floral", deadline: "2025-12-29", reviewType: "Full Review" },
  { retailer: "Publix Super Markets HQ", categories: "Office/School Supplies, Cards, Stationery, Balloons", deadline: "2025-12-19", reviewType: "Major" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, Paper Products", deadline: "2025-12-12", reviewType: "Major" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, General Merchandise", deadline: "2025-12-12", reviewType: "Major" },
  { retailer: "Ahold Delhaize: Giant Company HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-12-08", reviewType: "Reset" },
  { retailer: "Ahold Delhaize: Hannaford HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-12-08", reviewType: "Reset" },
  { retailer: "Albertsons HQ", categories: "Misc. Grocery, Misc. Household, Misc. Outdoors", deadline: "2025-12-05", reviewType: "Reset" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Outdoors, General Merchandise", deadline: "2025-11-28", reviewType: "Major" },
  { retailer: "Raley's HQ", categories: "Misc. Household, General Merchandise", deadline: "2025-11-28", reviewType: "Refresh" },
  { retailer: "Mother's Market HQ", categories: "Flowers, Planters, Vases, Misc. Outdoors", deadline: "2025-11-14", reviewType: "Full Review" },
  { retailer: "Ahold Delhaize: Giant Food HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-11-10", reviewType: "Full Review" },
  { retailer: "Kroger HQ", categories: "Misc. Outdoors", deadline: "2025-11-08", reviewType: "NII" },
  { retailer: "Ahold Delhaize: Food Lion HQ", categories: "Misc. Outdoors", deadline: "2025-11-03", reviewType: "Reset" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. HABA, Misc. Outdoors", deadline: "2025-10-31", reviewType: "Major" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Household, Office/School Supplies", deadline: "2025-10-31", reviewType: "Major" },
  { retailer: "Ahold Delhaize: Giant Food HQ", categories: "Baby/Kid Products, Misc. Household, Gifts, Office Supplies", deadline: "2025-10-27", reviewType: "Full Review" },
  { retailer: "WinCo Foods HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-23", reviewType: "Major" },
  { retailer: "Raley's HQ", categories: "Misc. Outdoors, Film/Electronics", deadline: "2025-10-17", reviewType: "Refresh" },
  { retailer: "Harmons HQ", categories: "Misc. Outdoors, Misc. Household", deadline: "2025-10-16", reviewType: "" },
  { retailer: "Ahold Delhaize: Giant Company HQ", categories: "Misc. Outdoors", deadline: "2025-10-13", reviewType: "Reset" },
  { retailer: "Ahold Delhaize: Hannaford HQ", categories: "Misc. Outdoors", deadline: "2025-10-13", reviewType: "Reset" },
  { retailer: "Ahold Delhaize: Stop & Shop HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-06", reviewType: "Reset" },
  { retailer: "Ahold Delhaize: Food Lion HQ", categories: "Misc. Outdoors", deadline: "2025-10-06", reviewType: "Reset" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Outdoors", deadline: "2025-10-03", reviewType: "Major" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Outdoors", deadline: "2025-09-26", reviewType: "Major" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-09-19", reviewType: "Refresh" },
  { retailer: "Kroger: Harris Teeter HQ", categories: "Misc. Outdoors, Household Hardware", deadline: "2025-09-17", reviewType: "" },
  { retailer: "Publix Super Markets HQ", categories: "General Merchandise - Summer", deadline: "2025-09-01", reviewType: "Major" },
  { retailer: "Ahold Delhaize: Giant Food HQ", categories: "Misc. Outdoors, Misc. Household", deadline: "2025-09-01", reviewType: "Full Review" },
  { retailer: "Lowes Foods HQ", categories: "Misc. Outdoors, General Merchandise", deadline: "2025-08-26", reviewType: "" },
  { retailer: "Publix Super Markets HQ", categories: "Film/Electronics, Misc. Outdoors", deadline: "2025-08-22", reviewType: "Major" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2025-08-15", reviewType: "Reset" },
  { retailer: "Ahold Delhaize: Stop & Shop HQ", categories: "Misc. Outdoors", deadline: "2025-08-11", reviewType: "Reset" },
  { retailer: "Raley's HQ", categories: "Misc. Outdoors", deadline: "2025-08-08", reviewType: "Reset" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Outdoors", deadline: "2025-07-25", reviewType: "Major" },
  { retailer: "Raley's HQ", categories: "Misc. Household, General Merchandise", deadline: "2025-07-25", reviewType: "New/Refresh" },
  { retailer: "Kroger HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-07-19", reviewType: "4 Week Blitz" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-07-18", reviewType: "Minor" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, General Merchandise", deadline: "2025-07-18", reviewType: "Major" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2025-07-18", reviewType: "Reset" },
  { retailer: "Northwest Grocers Group HQ", categories: "General Merchandise - Winter", deadline: "2025-07-14", reviewType: "Major" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Outdoors", deadline: "2025-07-11", reviewType: "Major" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Outdoors", deadline: "2025-06-27", reviewType: "Major" },
  { retailer: "WinCo Foods HQ", categories: "Misc. Outdoors, Food Storage", deadline: "2025-06-26", reviewType: "Major" },
  { retailer: "Kroger: Harris Teeter HQ", categories: "Misc. Outdoors, Misc. Household", deadline: "2025-06-25", reviewType: "" },
  { retailer: "Kroger HQ", categories: "Misc. Outdoors, Misc. Household", deadline: "2025-06-21", reviewType: "Update" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2025-06-20", reviewType: "Reset" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-06-13", reviewType: "Speed to Shelf" },
  { retailer: "Good Eggs HQ", categories: "Holiday/Misc, General Merchandise", deadline: "2025-06-07", reviewType: "Full Review" },
  { retailer: "Ingles Markets HQ", categories: "Paper Products, Misc. Outdoors", deadline: "2025-06-04", reviewType: "Major" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Outdoors, General Merchandise", deadline: "2025-05-30", reviewType: "Major" },
  { retailer: "Albertsons: United Division HQ", categories: "Misc. Outdoors", deadline: "2025-05-26", reviewType: "Major" },
  { retailer: "Kroger HQ", categories: "Misc. Outdoors", deadline: "2025-05-24", reviewType: "NII" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2025-05-23", reviewType: "Reset" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, Paper Products", deadline: "2025-05-16", reviewType: "Minor" },
  { retailer: "Northwest Grocers Group HQ", categories: "General Merchandise - Fall", deadline: "2025-05-12", reviewType: "Major" },
  { retailer: "Albertsons: Haggen HQ", categories: "Misc. Household, Misc. Outdoors", deadline: "2025-05-01", reviewType: "Major" },
  { retailer: "Thrive Market HQ", categories: "Holiday/Misc, General Merchandise", deadline: "2025-03-30", reviewType: "" },
  { retailer: "Harmons HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-03-13", reviewType: "Major" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Misc. Household", deadline: "2025-03-06", reviewType: "Reset" },
  { retailer: "Raley's HQ", categories: "Misc. Outdoors", deadline: "2025-02-21", reviewType: "Minor" },
  { retailer: "WinCo Foods HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-02-20", reviewType: "Major" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors", deadline: "2025-02-14", reviewType: "Minor" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-02-14", reviewType: "Major" },
  { retailer: "Mother's Market HQ", categories: "House & Kitchenware, Misc. Household, Misc. Outdoors", deadline: "2025-02-14", reviewType: "Major" },
  { retailer: "Publix Super Markets HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-02-14", reviewType: "Major" },
  { retailer: "Kroger: Harris Teeter HQ", categories: "Misc. Outdoors, Household Hardware", deadline: "2025-02-12", reviewType: "" },
  { retailer: "Raley's HQ", categories: "Misc. Outdoors, Film/Electronics", deadline: "2025-02-10", reviewType: "Reset" },
  { retailer: "Albertsons: Kings/Balducci's HQ", categories: "Misc. Outdoors, Misc. Household", deadline: "2025-01-30", reviewType: "Major" },
  { retailer: "Southeastern Grocers HQ", categories: "Misc. Outdoors", deadline: "2025-01-30", reviewType: "" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-01-27", reviewType: "Reset" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, Office/School Supplies", deadline: "2025-01-24", reviewType: "Reset" },
  { retailer: "Ahold Delhaize: Giant Food HQ", categories: "Candy, Air Fresheners, Office Supplies, Gifts, Floral", deadline: "2025-01-20", reviewType: "Reset" },
  { retailer: "Northwest Grocers Group HQ", categories: "General Merchandise - Summer", deadline: "2025-01-13", reviewType: "Major" },
  { retailer: "Albertsons HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-01-10", reviewType: "NICI" },
  { retailer: "Harmons HQ", categories: "Misc. Outdoors, Misc. Household", deadline: "2025-01-02", reviewType: "Major" },
];

// Keywords for brand assignment
const partyKeywords = ['party', 'balloon', 'celebration', 'seasonal', 'gift', 'card', 'stationery', 'floral', 'candy', 'holiday'];
const craftKeywords = ['craft', 'art', 'hobby', 'diy', 'kid', 'school', 'office', 'supplies'];

function assignBrand(categories) {
  const lowerCat = categories.toLowerCase();

  // Check for party-related keywords
  const isParty = partyKeywords.some(kw => lowerCat.includes(kw));
  const isCraft = craftKeywords.some(kw => lowerCat.includes(kw));

  if (isParty && !isCraft) return 'House of Party';
  if (isCraft && !isParty) return 'Craft Hero';
  if (isParty && isCraft) return 'Both';

  // Default assignment based on category patterns
  if (lowerCat.includes('outdoor') || lowerCat.includes('general merchandise')) {
    return 'House of Party';
  }
  return 'House of Party'; // Default
}

// Process and enhance the data
let idCounter = 1;
export const reviewData = rawData.map(item => {
  const brand = assignBrand(item.categories);
  return {
    id: idCounter++,
    brand,
    retailer: item.retailer,
    category: item.categories,
    submissionDeadline: item.deadline,
    reviewType: item.reviewType || 'Standard',
    lineReviewDate: null,
    resetDate: null,
    notes: '',
    completed: false
  };
});

export default reviewData;
