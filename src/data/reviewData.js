// Category Review Data from HarvestHub + Startup CPG Review Calendar
// Processed with category filtering for Petra Brands (House of Party + Craft Hero)

import { categorizeReview } from '../utils/categoryUtils';

const rawData = [
  // ========== TJX GROUP (Off-Price Retail) ==========
  // TJX buys 6-9 months out for seasonal placements
  // Estimated deadlines based on 7-month lead time

  // TJX US (TJ Maxx, HomeGoods, Marshalls)
  { retailer: "TJX US (TJ Maxx/HomeGoods/Marshalls)", categories: "Valentine's Day Party & Celebrations", deadline: "2025-07-01", resetDate: "2026-02-01", reviewType: "Standard", notes: "Est. 7-month lead - pitch window May-Aug", source: "TJX (Estimated)" },
  { retailer: "TJX US (TJ Maxx/HomeGoods/Marshalls)", categories: "Easter/Spring Party & Celebrations", deadline: "2025-09-01", resetDate: "2026-04-01", reviewType: "Standard", notes: "Est. 7-month lead - pitch window Jul-Oct", source: "TJX (Estimated)" },
  { retailer: "TJX US (TJ Maxx/HomeGoods/Marshalls)", categories: "Summer Party & Celebrations", deadline: "2025-11-01", resetDate: "2026-06-01", reviewType: "Standard", notes: "Est. 7-month lead - pitch window Sep-Dec", source: "TJX (Estimated)" },
  { retailer: "TJX US (TJ Maxx/HomeGoods/Marshalls)", categories: "Back to School", deadline: "2026-01-15", resetDate: "2026-08-01", reviewType: "Standard", notes: "Est. 7-month lead - pitch window Nov-Feb", source: "TJX (Estimated)" },
  { retailer: "TJX US (TJ Maxx/HomeGoods/Marshalls)", categories: "Halloween/Fall Party & Celebrations", deadline: "2026-03-01", resetDate: "2026-10-01", reviewType: "Standard", notes: "Est. 7-month lead - pitch window Jan-Apr", source: "TJX (Estimated)" },
  { retailer: "TJX US (TJ Maxx/HomeGoods/Marshalls)", categories: "Holiday/Christmas Party & Celebrations", deadline: "2026-04-15", resetDate: "2026-11-01", reviewType: "Standard", notes: "Est. 7-month lead - pitch window Feb-May", source: "TJX (Estimated)" },

  // TJX Canada (HomeSense, Marshalls, Winners)
  { retailer: "TJX Canada (HomeSense/Marshalls/Winners)", categories: "Valentine's Day Party & Celebrations", deadline: "2025-07-01", resetDate: "2026-02-01", reviewType: "Standard", notes: "Est. 7-month lead - pitch window May-Aug", source: "TJX (Estimated)" },
  { retailer: "TJX Canada (HomeSense/Marshalls/Winners)", categories: "Easter/Spring Party & Celebrations", deadline: "2025-09-01", resetDate: "2026-04-01", reviewType: "Standard", notes: "Est. 7-month lead - pitch window Jul-Oct", source: "TJX (Estimated)" },
  { retailer: "TJX Canada (HomeSense/Marshalls/Winners)", categories: "Summer Party & Celebrations", deadline: "2025-11-01", resetDate: "2026-06-01", reviewType: "Standard", notes: "Est. 7-month lead - pitch window Sep-Dec", source: "TJX (Estimated)" },
  { retailer: "TJX Canada (HomeSense/Marshalls/Winners)", categories: "Back to School", deadline: "2026-01-15", resetDate: "2026-08-01", reviewType: "Standard", notes: "Est. 7-month lead - pitch window Nov-Feb", source: "TJX (Estimated)" },
  { retailer: "TJX Canada (HomeSense/Marshalls/Winners)", categories: "Halloween/Fall Party & Celebrations", deadline: "2026-03-01", resetDate: "2026-10-01", reviewType: "Standard", notes: "Est. 7-month lead - pitch window Jan-Apr", source: "TJX (Estimated)" },
  { retailer: "TJX Canada (HomeSense/Marshalls/Winners)", categories: "Holiday/Christmas Party & Celebrations", deadline: "2026-04-15", resetDate: "2026-11-01", reviewType: "Standard", notes: "Est. 7-month lead - pitch window Feb-May", source: "TJX (Estimated)" },

  // ========== KROGER 2026 SEASONAL ==========
  // Key dates: IMFs & Quotes Due = submission deadline, In Store (Core) = reset date

  // Z093 Post Christmas 2025 & S011 Valentine's 2026
  { retailer: "Kroger", categories: "S011 Valentine's 2026", deadline: "2025-04-19", resetDate: "2025-12-21", reviewType: "Standard", notes: "Buyer Review 1/31/25, Lockout 6/7/25, Holiday 2/14/26", source: "Kroger Seasonal" },

  // S021 Easter & S032 Early Spring Summer 2026
  { retailer: "Kroger", categories: "S021 Easter & S032 Early Spring/Summer 2026", deadline: "2025-06-14", resetDate: "2026-02-15", reviewType: "Standard", notes: "Buyer Review 3/28/25, Lockout 8/2/25, Holiday 4/5/26", source: "Kroger Seasonal" },

  // S031 Spring Summer Core 2026
  { retailer: "Kroger", categories: "S031 Spring/Summer Core 2026", deadline: "2025-08-06", resetDate: "2026-04-05", reviewType: "Standard", notes: "Buyer Review 5/20/25, Lockout 9/24/25, Holiday 7/4/26", source: "Kroger Seasonal" },

  // S051 BTS 2026
  { retailer: "Kroger", categories: "S051 Back to School 2026", deadline: "2025-10-18", resetDate: "2026-06-21", reviewType: "Standard", notes: "Buyer Review 8/1/25, Lockout 12/6/25, Holiday 9/8/26", source: "Kroger Seasonal" },

  // S076 Halloween 2026
  { retailer: "Kroger", categories: "S076 Halloween 2026", deadline: "2025-12-20", resetDate: "2026-08-23", reviewType: "Standard", notes: "Buyer Review 10/3/25, Lockout 2/7/26, Holiday 10/31/26", source: "Kroger Seasonal" },

  // S086-S088-S089 Christmas 2026
  { retailer: "Kroger", categories: "S086-S089 Christmas 2026", deadline: "2026-02-14", resetDate: "2026-10-18", reviewType: "Standard", notes: "Buyer Review 11/28/25, Lockout 4/4/26, Holiday 12/25/26", source: "Kroger Seasonal" },

  // ========== TARGET D53 CELEBRATIONS ==========
  // 2026 Cycles - Using Vendor Confirmation as deadline, Set Date as reset
  // Note: DVS vs Instore TBD - marked as Holistic for now
  // C1 - Valentine's
  { retailer: "Target", categories: "D53 Celebrations - Valentine's", deadline: "2025-04-20", resetDate: "2025-12-28", reviewType: "Standard", notes: "C1 2026 - Vendor Confirmation 4/20/25", source: "Target" },
  // C2 - Easter
  { retailer: "Target", categories: "D53 Celebrations - Easter", deadline: "2025-06-15", resetDate: "2026-02-15", reviewType: "Standard", notes: "C2 2026 - Vendor Confirmation 6/15/25", source: "Target" },
  // C3 - Inline Party
  { retailer: "Target", categories: "D53 Celebrations - Inline Party", deadline: "2025-07-13", resetDate: "2026-03-15", reviewType: "Standard", notes: "C3 2026 - Vendor Confirmation 7/13/25", source: "Target" },
  // C3 - Inline Bags & Wrap
  { retailer: "Target", categories: "D53 Celebrations - Inline Bags & Wrap", deadline: "2025-07-13", resetDate: "2026-03-15", reviewType: "Standard", notes: "C3 2026 - Vendor Confirmation 7/13/25", source: "Target" },
  // C3 - April Endcaps (Spring, Grad, Mother's Day, Americana)
  { retailer: "Target", categories: "D53 Celebrations - Spring/Grad/Mother's Day/Americana", deadline: "2025-08-03", resetDate: "2026-04-05", reviewType: "Standard", notes: "C3 April Endcaps 2026 - Vendor Confirmation 8/3/25", source: "Target" },
  // C3 - May Endcaps (Father's Day, Summer)
  { retailer: "Target", categories: "D53 Celebrations - Father's Day/Summer", deadline: "2025-09-07", resetDate: "2026-05-10", reviewType: "Standard", notes: "C3 May Endcaps 2026 - Vendor Confirmation 9/7/25", source: "Target" },
  // C4 - BTS Rear (Back to School)
  { retailer: "Target", categories: "D53 Celebrations - Back to School", deadline: "2025-10-05", resetDate: "2026-06-14", reviewType: "Standard", notes: "C4 BTS Rear 2026 - Vendor Confirmation 10/5/25", source: "Target" },
  // C4 - Division Endcap (Summer)
  { retailer: "Target", categories: "D53 Celebrations - Summer Division Endcap", deadline: "2025-10-05", resetDate: "2026-06-14", reviewType: "Standard", notes: "C4 Division Endcap 2026 - Vendor Confirmation 10/5/25", source: "Target" },
  // C5 - Halloween, Fall, Thanksgiving
  { retailer: "Target", categories: "D53 Celebrations - Halloween/Fall/Thanksgiving", deadline: "2025-12-14", resetDate: "2026-09-06", reviewType: "Standard", notes: "C5 2026 - Vendor Confirmation 12/14/25", source: "Target" },
  // C6 - Holiday, New Year's
  { retailer: "Target", categories: "D53 Celebrations - Holiday/New Year's", deadline: "2026-02-08", resetDate: "2026-11-01", reviewType: "Standard", notes: "C6 2026 - Vendor Confirmation 2/8/26", source: "Target" },

  // ========== HARVESTHUB DATA ==========
  // Future reviews (2026) - Deduplicated, review types standardized
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-07-17", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring", deadline: "2026-07-17", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2026-05-22", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-04-03", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Harmons HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-03-12", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", reviewType: "Standard", storeCount: 1448, crManager: "Anna Reynolds", source: "HarvestHub" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", reviewType: "Standard", source: "HarvestHub" },

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
  { retailer: "Basha's", categories: "School Home Office", deadline: "2026-02-09", resetDate: "2026-06-01", reviewType: "Standard", source: "StartupCPG" },

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
  { retailer: "Raley's", categories: "Premium Party", deadline: "2026-06-29", resetDate: "2026-10-20", reviewType: "Standard", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Social Expr. / Party Goods", deadline: "2026-06-29", resetDate: "2026-10-20", reviewType: "Standard", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Sewing & Shoe Care", deadline: "2026-08-24", resetDate: "2026-12-15", reviewType: "Standard", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Sundries (Office & School)", deadline: "2026-10-05", resetDate: "2027-01-26", reviewType: "Standard", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Premium Party", deadline: "2026-11-30", resetDate: "2027-03-23", reviewType: "Standard", notes: "New Item - Plug & Pull Opportunity", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Social Expr. / Party Goods", deadline: "2026-11-30", resetDate: "2027-03-23", reviewType: "Standard", notes: "New Item - Plug & Pull Opportunity", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Picnic Supplies", deadline: "2026-12-14", resetDate: "2027-04-06", reviewType: "Standard", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Office & School Supplies", deadline: "2027-02-08", resetDate: "2027-06-01", reviewType: "Standard", notes: "Category Review (Analysis)", source: "StartupCPG" },
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
  { retailer: "Kroger HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-01-03", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Ahold Delhaize: Giant Food HQ", categories: "Candy, Air Fresheners, Office/School Supplies, Gifts, Floral", deadline: "2025-12-29", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "Office/School Supplies, Cards, Stationery, Balloons", deadline: "2025-12-19", reviewType: "Standard", storeCount: 1448, crManager: "Anna Reynolds", source: "HarvestHub" },
  { retailer: "Ahold Delhaize: The Giant Company HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-12-08", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Ahold Delhaize: Hannaford HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-12-08", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring, General Merchandise - Winter", deadline: "2025-11-28", reviewType: "Standard", storeCount: 1448, source: "HarvestHub" },
  { retailer: "Ahold Delhaize: Giant Food HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-11-10", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Household, Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-31", reviewType: "Standard", storeCount: 1448, source: "HarvestHub" },
  { retailer: "WinCo Foods HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-23", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Ahold Delhaize: Stop & Shop HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-06", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-09-19", reviewType: "Standard", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "General Merchandise - Summer", deadline: "2025-09-01", reviewType: "Standard", storeCount: 1448, source: "HarvestHub" },
];

// Helper function to convert 2025 date to 2026 equivalent
function convertTo2026(dateStr) {
  if (!dateStr) return null;
  const year = parseInt(dateStr.substring(0, 4));
  if (year < 2026) {
    return dateStr.replace(/^(\d{4})/, '2026');
  }
  return dateStr;
}

// Helper function to determine if date is actual (2026+) or estimate (2025)
function getDateType(dateStr) {
  if (!dateStr) return 'Unknown';
  const year = parseInt(dateStr.substring(0, 4));
  return year >= 2026 ? 'Actual' : 'Estimate';
}

// Process and enhance the data with category filtering
let idCounter = 1;
export const reviewData = rawData.map(item => {
  const catResult = categorizeReview(item.categories);
  const deadlineYear = parseInt(item.deadline.substring(0, 4));
  const isEstimate = deadlineYear < 2026;

  // Convert 2025 dates to 2026 equivalents for visibility
  const displayDeadline = convertTo2026(item.deadline);
  const displayResetDate = item.resetDate ? convertTo2026(item.resetDate) : null;

  // Build notes - include original date if it was converted
  let notes = item.notes || '';
  if (isEstimate) {
    const originalNote = `Original: ${item.deadline}`;
    notes = notes ? `${notes} | ${originalNote}` : originalNote;
  }
  if (catResult.needsVerification && !notes.includes('Verify')) {
    notes = notes ? `⚠️ Verify category | ${notes}` : '⚠️ Verify category';
  }

  return {
    id: idCounter++,
    brand: catResult.brand || 'House of Party',
    retailer: item.retailer,
    category: item.categories,
    submissionDeadline: displayDeadline,
    originalDeadline: item.deadline,
    resetDate: displayResetDate,
    originalResetDate: item.resetDate || null,
    dateType: isEstimate ? 'Estimate' : 'Actual',
    reviewType: item.reviewType || 'Standard',
    storeCount: item.storeCount || null,
    crManager: item.crManager || null,
    source: item.source || 'Unknown',
    notes: notes,
    completed: false,
    // Category filtering metadata
    categoryIncluded: catResult.included,
    needsVerification: catResult.needsVerification
  };
});

export default reviewData;
