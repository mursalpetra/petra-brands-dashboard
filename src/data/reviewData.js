// Category Review Data from HarvestHub
// Processed with category filtering for Petra Brands (House of Party + Craft Hero)

import { categorizeReview } from '../utils/categoryUtils';

const rawData = [
  // Future reviews (2026)
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-07-17", reviewType: "Minor", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-07-17", reviewType: "Speed to Shelf", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring", deadline: "2026-07-17", reviewType: "Major", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2026-05-22", reviewType: "Reset", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-04-03", reviewType: "Reset", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Harmons HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-03-12", reviewType: "Standard", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Publix Super Markets HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", reviewType: "Major", storeCount: 1448, crManager: "Anna Reynolds", distributors: "UNFI HQ, KeHE HQ, and others" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", reviewType: "Major", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", reviewType: "Major", storeCount: null, crManager: null, distributors: "Various" },
  // Past reviews (2025-2026)
  { retailer: "Busch's HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring", deadline: "2026-01-16", reviewType: "Standard", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Kroger HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-01-03", reviewType: "4 Week Blitz", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Kroger HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-01-03", reviewType: "Update", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2026-01-02", reviewType: "Reset", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Ahold Delhaize: Giant Food HQ (Giant Landover)", categories: "Candy - Chocolate, Candy - Gum, Candy - Other, Bulk Candy, Air Fresheners/Candles/Potpourri, Office/School Supplies, Cards, Stationery and Gift, Floral and Gifts - Other/Misc, Gifts, Floral and Gifts All", deadline: "2025-12-29", reviewType: "Full Review", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Publix Super Markets HQ", categories: "Office/School Supplies, Cards, Stationery and Gift, Ballons", deadline: "2025-12-19", reviewType: "Major", storeCount: 1448, crManager: "Anna Reynolds", distributors: "UNFI HQ, KeHE HQ, and others" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring", deadline: "2025-12-12", reviewType: "Major", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Ahold Delhaize: The Giant Company HQ (Martin's, Giant-Carlisle)", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-12-08", reviewType: "Reset", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Ahold Delhaize: Hannaford HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-12-08", reviewType: "Reset", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring, General Merchandise - Winter", deadline: "2025-11-28", reviewType: "Major", storeCount: 1448, crManager: "Anna Reynolds", distributors: "UNFI HQ, KeHE HQ, and others" },
  { retailer: "Raley's HQ", categories: "Misc. Household, General Merchandise - Summer, General Merchandise - Spring, General Merchandise - Winter", deadline: "2025-11-28", reviewType: "Refresh", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Ahold Delhaize: Giant Food HQ (Giant Landover)", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-11-10", reviewType: "Full Review", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Household, Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-31", reviewType: "Major", storeCount: 1448, crManager: "Anna Reynolds", distributors: "UNFI HQ, KeHE HQ, and others" },
  { retailer: "Ahold Delhaize: Giant Food HQ (Giant Landover)", categories: "Baby/Kid Products (formula, diapers, wipes, etc.), Misc. Household, Gifts, Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-27", reviewType: "Full Review", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "WinCo Foods HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-23", reviewType: "Major", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Ahold Delhaize: Stop & Shop HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-06", reviewType: "Reset", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Ahold Delhaize: Stop & Shop HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-06", reviewType: "Reset", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-09-19", reviewType: "Refresh", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Publix Super Markets HQ", categories: "General Merchandise - Summer", deadline: "2025-09-01", reviewType: "Major", storeCount: 1448, crManager: "Anna Reynolds", distributors: "UNFI HQ, KeHE HQ, and others" },
  { retailer: "Lowes Foods HQ (Alex Lee, Just Save)", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring", deadline: "2025-08-26", reviewType: "Standard", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2025-08-15", reviewType: "Reset", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Raley's HQ", categories: "Misc. Household, General Merchandise - Summer, General Merchandise - Spring, General Merchandise - Winter", deadline: "2025-07-25", reviewType: "New/ Refresh", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Kroger HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-07-19", reviewType: "4 Week Blitz", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-07-18", reviewType: "Minor", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring", deadline: "2025-07-18", reviewType: "Major", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2025-07-18", reviewType: "Reset", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Northwest Grocers Group HQ (NWG)", categories: "General Merchandise - Winter", deadline: "2025-07-14", reviewType: "Major", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2025-06-20", reviewType: "Reset", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-06-13", reviewType: "Speed to Shelf", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Good Eggs HQ", categories: "Deli - Holiday/Misc, HABA - Holiday/Misc, Dairy - Holiday/Misc, Other - Holiday/Misc, Bakery - Holiday/Misc, Frozen - Holiday/Misc, Grocery - Holiday/Misc, Produce - Holiday/Misc, General Merchandise - Holiday/Misc", deadline: "2025-06-07", reviewType: "Full Review", storeCount: null, crManager: null, distributors: "Various" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring, General Merchandise - Winter", deadline: "2025-05-30", reviewType: "Major", storeCount: 1448, crManager: "Anna Reynolds", distributors: "UNFI HQ, KeHE HQ, and others" },
];

// Process and enhance the data with category filtering
let idCounter = 1;
export const reviewData = rawData.map(item => {
  const catResult = categorizeReview(item.categories);

  return {
    id: idCounter++,
    brand: catResult.brand || 'House of Party',
    retailer: item.retailer,
    category: item.categories,
    submissionDeadline: item.deadline,
    reviewType: item.reviewType || 'Standard',
    lineReviewDate: null,
    resetDate: null,
    notes: catResult.needsVerification ? '⚠️ Verify category' : '',
    completed: false,
    // Category filtering metadata
    categoryIncluded: catResult.included,
    needsVerification: catResult.needsVerification
  };
});

export default reviewData;
