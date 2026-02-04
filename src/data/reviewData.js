// Category Review Data from HarvestHub + Startup CPG Review Calendar
// Processed with category filtering for Petra Brands (House of Party + Craft Hero)

import { categorizeReview } from '../utils/categoryUtils';

const rawData = [
  // ========== HARVESTHUB DATA ==========
  // Future reviews (2026)
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-07-17", reviewType: "Minor", source: "HarvestHub" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-07-17", reviewType: "Speed to Shelf", source: "HarvestHub" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring", deadline: "2026-07-17", reviewType: "Major", source: "HarvestHub" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2026-05-22", reviewType: "Reset", source: "HarvestHub" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-04-03", reviewType: "Reset", source: "HarvestHub" },
  { retailer: "Harmons HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-03-12", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", reviewType: "Major", storeCount: 1448, crManager: "Anna Reynolds", source: "HarvestHub" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", reviewType: "Major", source: "HarvestHub" },

  // ========== STARTUP CPG DATA ==========
  // Publix - Party & Seasonal
  { retailer: "Publix", categories: "Party Goods", deadline: "2025-12-26", resetDate: "2026-06-12", reviewType: "Standard", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Party Goods Shadow Box", deadline: "2025-12-26", resetDate: "2026-06-12", reviewType: "Standard", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Party Goods Rack", deadline: "2025-12-26", resetDate: "2026-06-12", reviewType: "Standard", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Acrylics, Party Ware", deadline: "2026-02-06", resetDate: "2026-07-24", reviewType: "Standard", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Holiday", deadline: "2026-01-16", resetDate: "2026-07-03", reviewType: "Standard", crManager: "RACHEL SANTOS", source: "StartupCPG" },
  { retailer: "Publix", categories: "Channukah", deadline: "2026-03-21", resetDate: "2026-10-30", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Winter Seasonal", deadline: "2026-03-21", resetDate: "2026-10-30", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Valentine", deadline: "2026-03-30", resetDate: "2026-12-31", reviewType: "Standard", crManager: "IVONNE LEON", source: "StartupCPG" },
  { retailer: "Publix", categories: "Easter", deadline: "2026-03-30", resetDate: "2026-12-31", reviewType: "Standard", crManager: "IVONNE LEON", source: "StartupCPG" },
  { retailer: "Publix", categories: "Spring Seasonal", deadline: "2026-04-29", resetDate: "2027-04-23", reviewType: "Standard", crManager: "IVONNE LEON", source: "StartupCPG" },
  { retailer: "Publix", categories: "Summer Seasonal", deadline: "2026-04-29", resetDate: "2027-04-23", reviewType: "Standard", crManager: "IVONNE LEON", source: "StartupCPG" },
  { retailer: "Publix", categories: "Toys", deadline: "2026-05-01", resetDate: "2026-10-16", reviewType: "Standard", crManager: "ED EASOM", source: "StartupCPG" },
  { retailer: "Publix", categories: "Passover", deadline: "2026-06-18", resetDate: "2027-02-26", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Fall Seasonal", deadline: "2026-10-30", resetDate: "2027-09-10", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Halloween", deadline: "2026-10-30", resetDate: "2027-09-10", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Christmas", deadline: "2026-10-30", resetDate: "2027-10-08", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "New Year", deadline: "2026-10-30", resetDate: "2027-10-08", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },

  // Publix - Crafts & Stationery
  { retailer: "Publix", categories: "Stationery/School Supplies", deadline: "2026-09-04", resetDate: "2027-02-19", reviewType: "Standard", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Art/Craft", deadline: "2026-09-04", resetDate: "2027-02-19", reviewType: "Standard", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Education/Activity", deadline: "2026-09-04", resetDate: "2027-02-19", reviewType: "Standard", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Sewing/Rit Dye Panel", deadline: "2026-04-03", resetDate: "2026-09-18", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },

  // Kroger/Harris Teeter - Party
  { retailer: "Kroger: Harris Teeter", categories: "Disposable Cups/Plates/Party Plastics", deadline: "2026-02-11", resetDate: "2026-08-10", reviewType: "Standard", source: "StartupCPG" },

  // Harmons - Party & Seasonal
  { retailer: "Harmons", categories: "Toys/Puzzles/Games", deadline: "2026-01-12", resetDate: "2026-07-01", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Harmons", categories: "Christmas/Halloween/Seasonal", deadline: "2026-01-12", resetDate: "2026-07-01", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Harmons", categories: "School/Office Supplies", deadline: "2026-01-12", resetDate: "2026-07-01", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Harmons", categories: "Picnic: Utensils/Straws/Cups/Plates/Bowls", deadline: "2026-01-12", resetDate: "2026-07-01", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Harmons", categories: "Candles", deadline: "2026-06-01", resetDate: "2026-11-01", reviewType: "Standard", source: "StartupCPG" },

  // Basha's
  { retailer: "Basha's", categories: "School Home Office", deadline: "2026-02-09", resetDate: "2026-06-01", reviewType: "Reset", source: "StartupCPG" },

  // Good Eggs
  { retailer: "Good Eggs", categories: "Halloween/Thanksgiving/Christmas Bakery", deadline: "2026-04-01", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Good Eggs", categories: "Q4 Holiday Specific", deadline: "2026-05-01", reviewType: "Standard", source: "StartupCPG" },

  // Lucky's & SaveMart
  { retailer: "Lucky's & SaveMart", categories: "Stationery/School Supplies", deadline: "2026-03-05", resetDate: "2026-07-03", reviewType: "Standard", crManager: "Allen", source: "StartupCPG" },

  // Mother's Market
  { retailer: "Mother's Market", categories: "Floral & Garden Products", deadline: "2025-11-14", resetDate: "2026-03-21", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Mother's Market", categories: "Gift Wrap & Decorations", deadline: "2026-06-19", resetDate: "2026-10-24", reviewType: "Standard", source: "StartupCPG" },

  // Nugget
  { retailer: "Nugget", categories: "Halloween/Thanksgiving/Christmas Seasonal", deadline: "2026-05-01", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Nugget", categories: "Paper-Picnic", deadline: "2026-05-01", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Nugget", categories: "Valentines Day", deadline: "2026-09-01", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Nugget", categories: "Easter-Passover", deadline: "2026-11-01", reviewType: "Standard", source: "StartupCPG" },

  // Albertsons Safeway
  { retailer: "Albertsons Safeway", categories: "Gifting Candy", deadline: "2026-03-29", reviewType: "Standard", source: "StartupCPG" },

  // Raley's - Party & Picnic
  { retailer: "Raley's", categories: "Picnic Supplies", deadline: "2026-06-15", resetDate: "2026-10-06", reviewType: "Standard", notes: "New Item - Plug & Pull Opportunity", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Lunch Box", deadline: "2026-06-29", resetDate: "2026-10-20", reviewType: "Standard", notes: "New Item - Plug & Pull Opportunity", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Premium Party", deadline: "2026-06-29", resetDate: "2026-10-20", reviewType: "Reset", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Social Expr. / Party Goods", deadline: "2026-06-29", resetDate: "2026-10-20", reviewType: "Reset", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Sewing & Shoe Care", deadline: "2026-08-24", resetDate: "2026-12-15", reviewType: "Reset", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Sundries (Office & School)", deadline: "2026-10-05", resetDate: "2027-01-26", reviewType: "Reset", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Premium Party", deadline: "2026-11-30", resetDate: "2027-03-23", reviewType: "Standard", notes: "New Item - Plug & Pull Opportunity", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Social Expr. / Party Goods", deadline: "2026-11-30", resetDate: "2027-03-23", reviewType: "Standard", notes: "New Item - Plug & Pull Opportunity", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Picnic Supplies", deadline: "2026-12-14", resetDate: "2027-04-06", reviewType: "Reset", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Office & School Supplies", deadline: "2027-02-08", resetDate: "2027-06-01", reviewType: "Reset", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Holiday (All Categories)", deadline: "2027-04-01", resetDate: "2027-05-04", reviewType: "Standard", notes: "New Item (holiday) - Presentations April 1st", source: "StartupCPG" },

  // Sprouts - Holiday Seasonal
  { retailer: "Sprouts", categories: "Holiday Easter", deadline: "2025-08-01", resetDate: "2026-02-09", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Sprouts", categories: "Holiday Spring", deadline: "2025-09-01", resetDate: "2026-03-30", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Sprouts", categories: "Holiday Summer", deadline: "2025-11-03", resetDate: "2026-05-11", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Sprouts", categories: "Holiday Fall / Harvest / Halloween", deadline: "2026-02-01", resetDate: "2026-08-24", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Sprouts", categories: "Holiday Item Submission - Frozen", deadline: "2026-02-01", resetDate: "2026-09-14", reviewType: "Standard", source: "StartupCPG" },
  { retailer: "Sprouts", categories: "Holiday", deadline: "2026-04-01", resetDate: "2026-10-26", reviewType: "Standard", source: "StartupCPG" },

  // Lucky's & SaveMart - Additional
  { retailer: "Lucky's & SaveMart", categories: "Paper - Picnic", deadline: "2025-10-30", resetDate: "2026-02-27", reviewType: "Standard", crManager: "Crain", notes: "Standard Cut-In", source: "StartupCPG" },

  // Publix - Earlier submissions with 2026 resets
  { retailer: "Publix", categories: "Stationery/School Supplies", deadline: "2025-09-05", resetDate: "2026-02-20", reviewType: "Standard", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Art/Craft", deadline: "2025-09-05", resetDate: "2026-02-20", reviewType: "Standard", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Education/Activity", deadline: "2025-09-05", resetDate: "2026-02-20", reviewType: "Standard", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Spring Seasonal", deadline: "2025-04-30", resetDate: "2026-04-24", reviewType: "Standard", crManager: "IVONNE LEON", source: "StartupCPG" },
  { retailer: "Publix", categories: "Summer Seasonal", deadline: "2025-04-30", resetDate: "2026-04-24", reviewType: "Standard", crManager: "IVONNE LEON", source: "StartupCPG" },
  { retailer: "Publix", categories: "Passover", deadline: "2025-06-19", resetDate: "2026-02-27", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Fall Seasonal", deadline: "2025-10-31", resetDate: "2026-09-11", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Halloween", deadline: "2025-10-31", resetDate: "2026-09-11", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Christmas", deadline: "2025-10-31", resetDate: "2026-10-09", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "New Year", deadline: "2025-10-31", resetDate: "2026-10-09", reviewType: "Standard", crManager: "DAN BRYAN", source: "StartupCPG" },

  // ========== HISTORICAL DATA (Past reviews for reference) ==========
  { retailer: "Busch's HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring", deadline: "2026-01-16", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Kroger HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-01-03", reviewType: "4 Week Blitz", source: "HarvestHub" },
  { retailer: "Ahold Delhaize: Giant Food HQ", categories: "Candy, Air Fresheners, Office/School Supplies, Gifts, Floral", deadline: "2025-12-29", reviewType: "Full Review", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "Office/School Supplies, Cards, Stationery, Balloons", deadline: "2025-12-19", reviewType: "Major", storeCount: 1448, crManager: "Anna Reynolds", source: "HarvestHub" },
  { retailer: "Ahold Delhaize: The Giant Company HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-12-08", reviewType: "Reset", source: "HarvestHub" },
  { retailer: "Ahold Delhaize: Hannaford HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-12-08", reviewType: "Reset", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring, General Merchandise - Winter", deadline: "2025-11-28", reviewType: "Major", storeCount: 1448, source: "HarvestHub" },
  { retailer: "Ahold Delhaize: Giant Food HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-11-10", reviewType: "Full Review", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Household, Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-31", reviewType: "Major", storeCount: 1448, source: "HarvestHub" },
  { retailer: "WinCo Foods HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-23", reviewType: "Major", source: "HarvestHub" },
  { retailer: "Ahold Delhaize: Stop & Shop HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-06", reviewType: "Reset", source: "HarvestHub" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-09-19", reviewType: "Refresh", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "General Merchandise - Summer", deadline: "2025-09-01", reviewType: "Major", storeCount: 1448, source: "HarvestHub" },
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
    resetDate: item.resetDate || null,
    reviewType: item.reviewType || 'Standard',
    storeCount: item.storeCount || null,
    crManager: item.crManager || null,
    source: item.source || 'Unknown',
    notes: catResult.needsVerification ? '⚠️ Verify category' : '',
    completed: false,
    // Category filtering metadata
    categoryIncluded: catResult.included,
    needsVerification: catResult.needsVerification
  };
});

export default reviewData;
