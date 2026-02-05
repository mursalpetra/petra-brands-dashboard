// Convert old reviewData format to new reviewDeadlines.json format
// Run: node scripts/convertData.js

const rawData = [
  // ========== TJX GROUP ==========
  { retailer: "TJX (Marshalls/TJ Maxx/HomeGoods)", categories: "Valentine's Day Party & Celebrations", deadline: "2025-07-01", resetDate: "2026-02-01", notes: "TJX US - Est. 7-month lead, pitch window May-Aug", source: "TJX (Estimated)" },
  { retailer: "TJX (Marshalls/TJ Maxx/HomeGoods)", categories: "Easter/Spring Party & Celebrations", deadline: "2025-09-01", resetDate: "2026-04-01", notes: "TJX US - Est. 7-month lead, pitch window Jul-Oct", source: "TJX (Estimated)" },
  { retailer: "TJX (Marshalls/TJ Maxx/HomeGoods)", categories: "Summer Party & Celebrations", deadline: "2025-11-01", resetDate: "2026-06-01", notes: "TJX US - Est. 7-month lead, pitch window Sep-Dec", source: "TJX (Estimated)" },
  { retailer: "TJX (Marshalls/TJ Maxx/HomeGoods)", categories: "Back to School", deadline: "2026-01-15", resetDate: "2026-08-01", notes: "TJX US - Est. 7-month lead, pitch window Nov-Feb", source: "TJX (Estimated)" },
  { retailer: "TJX (Marshalls/TJ Maxx/HomeGoods)", categories: "Halloween/Fall Party & Celebrations", deadline: "2026-03-01", resetDate: "2026-10-01", notes: "TJX US - Est. 7-month lead, pitch window Jan-Apr", source: "TJX (Estimated)" },
  { retailer: "TJX (Marshalls/TJ Maxx/HomeGoods)", categories: "Holiday/Christmas Party & Celebrations", deadline: "2026-04-15", resetDate: "2026-11-01", notes: "TJX US - Est. 7-month lead, pitch window Feb-May", source: "TJX (Estimated)" },
  { retailer: "TJX Canada (HomeSense/Marshalls/Winners)", categories: "Valentine's Day Party & Celebrations", deadline: "2025-07-01", resetDate: "2026-02-01", notes: "TJX Canada - Est. 7-month lead, pitch window May-Aug", source: "TJX (Estimated)" },
  { retailer: "TJX Canada (HomeSense/Marshalls/Winners)", categories: "Easter/Spring Party & Celebrations", deadline: "2025-09-01", resetDate: "2026-04-01", notes: "TJX Canada - Est. 7-month lead, pitch window Jul-Oct", source: "TJX (Estimated)" },
  { retailer: "TJX Canada (HomeSense/Marshalls/Winners)", categories: "Summer Party & Celebrations", deadline: "2025-11-01", resetDate: "2026-06-01", notes: "TJX Canada - Est. 7-month lead, pitch window Sep-Dec", source: "TJX (Estimated)" },
  { retailer: "TJX Canada (HomeSense/Marshalls/Winners)", categories: "Back to School", deadline: "2026-01-15", resetDate: "2026-08-01", notes: "TJX Canada - Est. 7-month lead, pitch window Nov-Feb", source: "TJX (Estimated)" },
  { retailer: "TJX Canada (HomeSense/Marshalls/Winners)", categories: "Halloween/Fall Party & Celebrations", deadline: "2026-03-01", resetDate: "2026-10-01", notes: "TJX Canada - Est. 7-month lead, pitch window Jan-Apr", source: "TJX (Estimated)" },
  { retailer: "TJX Canada (HomeSense/Marshalls/Winners)", categories: "Holiday/Christmas Party & Celebrations", deadline: "2026-04-15", resetDate: "2026-11-01", notes: "TJX Canada - Est. 7-month lead, pitch window Feb-May", source: "TJX (Estimated)" },

  // ========== KROGER SEASONAL ==========
  { retailer: "Kroger", categories: "S011 Valentine's 2026", deadline: "2025-04-19", resetDate: "2025-12-21", notes: "Buyer Review 1/31/25, Lockout 6/7/25, Holiday 2/14/26", source: "Kroger Seasonal", crManager: "" },
  { retailer: "Kroger", categories: "S021 Easter & S032 Early Spring/Summer 2026", deadline: "2025-06-14", resetDate: "2026-02-15", notes: "Buyer Review 3/28/25, Lockout 8/2/25, Holiday 4/5/26", source: "Kroger Seasonal" },
  { retailer: "Kroger", categories: "S031 Spring/Summer Core 2026", deadline: "2025-08-06", resetDate: "2026-04-05", notes: "Buyer Review 5/20/25, Lockout 9/24/25, Holiday 7/4/26", source: "Kroger Seasonal" },
  { retailer: "Kroger", categories: "S051 Back to School 2026", deadline: "2025-10-18", resetDate: "2026-06-21", notes: "Buyer Review 8/1/25, Lockout 12/6/25, Holiday 9/8/26", source: "Kroger Seasonal" },
  { retailer: "Kroger", categories: "S076 Halloween 2026", deadline: "2025-12-20", resetDate: "2026-08-23", notes: "Buyer Review 10/3/25, Lockout 2/7/26, Holiday 10/31/26", source: "Kroger Seasonal" },
  { retailer: "Kroger", categories: "S086-S089 Christmas 2026", deadline: "2026-02-14", resetDate: "2026-10-18", notes: "Buyer Review 11/28/25, Lockout 4/4/26, Holiday 12/25/26", source: "Kroger Seasonal" },

  // ========== TARGET D53 ==========
  { retailer: "Target", categories: "D53 Celebrations - Valentine's", deadline: "2025-04-20", resetDate: "2025-12-28", notes: "C1 2026 - Vendor Confirmation 4/20/25", source: "Target" },
  { retailer: "Target", categories: "D53 Celebrations - Easter", deadline: "2025-06-15", resetDate: "2026-02-15", notes: "C2 2026 - Vendor Confirmation 6/15/25", source: "Target" },
  { retailer: "Target", categories: "D53 Celebrations - Inline Party", deadline: "2025-07-13", resetDate: "2026-03-15", notes: "C3 2026 - Vendor Confirmation 7/13/25", source: "Target" },
  { retailer: "Target", categories: "D53 Celebrations - Inline Bags & Wrap", deadline: "2025-07-13", resetDate: "2026-03-15", notes: "C3 2026 - Vendor Confirmation 7/13/25", source: "Target" },
  { retailer: "Target", categories: "D53 Celebrations - Spring/Grad/Mother's Day/Americana", deadline: "2025-08-03", resetDate: "2026-04-05", notes: "C3 April Endcaps 2026 - Vendor Confirmation 8/3/25", source: "Target" },
  { retailer: "Target", categories: "D53 Celebrations - Father's Day/Summer", deadline: "2025-09-07", resetDate: "2026-05-10", notes: "C3 May Endcaps 2026 - Vendor Confirmation 9/7/25", source: "Target" },
  { retailer: "Target", categories: "D53 Celebrations - Back to School", deadline: "2025-10-05", resetDate: "2026-06-14", notes: "C4 BTS Rear 2026 - Vendor Confirmation 10/5/25", source: "Target" },
  { retailer: "Target", categories: "D53 Celebrations - Summer Division Endcap", deadline: "2025-10-05", resetDate: "2026-06-14", notes: "C4 Division Endcap 2026 - Vendor Confirmation 10/5/25", source: "Target" },
  { retailer: "Target", categories: "D53 Celebrations - Halloween/Fall/Thanksgiving", deadline: "2025-12-14", resetDate: "2026-09-06", notes: "C5 2026 - Vendor Confirmation 12/14/25", source: "Target" },
  { retailer: "Target", categories: "D53 Celebrations - Holiday/New Year's", deadline: "2026-02-08", resetDate: "2026-11-01", notes: "C6 2026 - Vendor Confirmation 2/8/26", source: "Target" },

  // ========== HARVESTHUB ==========
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-07-17", source: "HarvestHub" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring", deadline: "2026-07-17", source: "HarvestHub" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2026-05-22", source: "HarvestHub" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-04-03", source: "HarvestHub" },
  { retailer: "Harmons HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-03-12", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", storeCount: 1448, crManager: "Anna Reynolds", source: "HarvestHub" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", source: "HarvestHub" },

  // ========== STARTUP CPG ==========
  { retailer: "Publix", categories: "Party Goods", deadline: "2025-12-26", resetDate: "2026-06-12", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Party Goods Shadow Box", deadline: "2025-12-26", resetDate: "2026-06-12", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Party Goods Rack", deadline: "2025-12-26", resetDate: "2026-06-12", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Acrylics, Party Ware", deadline: "2026-02-06", resetDate: "2026-07-24", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Holiday", deadline: "2026-01-16", resetDate: "2026-07-03", crManager: "RACHEL SANTOS", source: "StartupCPG" },
  { retailer: "Publix", categories: "Channukah", deadline: "2026-03-21", resetDate: "2026-10-30", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Winter Seasonal", deadline: "2026-03-21", resetDate: "2026-10-30", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Valentine", deadline: "2026-03-30", resetDate: "2026-12-31", crManager: "IVONNE LEON", source: "StartupCPG" },
  { retailer: "Publix", categories: "Easter", deadline: "2026-03-30", resetDate: "2026-12-31", crManager: "IVONNE LEON", source: "StartupCPG" },
  { retailer: "Publix", categories: "Spring Seasonal", deadline: "2026-04-29", resetDate: "2027-04-23", crManager: "IVONNE LEON", source: "StartupCPG" },
  { retailer: "Publix", categories: "Summer Seasonal", deadline: "2026-04-29", resetDate: "2027-04-23", crManager: "IVONNE LEON", source: "StartupCPG" },
  { retailer: "Publix", categories: "Toys", deadline: "2026-05-01", resetDate: "2026-10-16", crManager: "ED EASOM", source: "StartupCPG" },
  { retailer: "Publix", categories: "Passover", deadline: "2026-06-18", resetDate: "2027-02-26", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Fall Seasonal", deadline: "2026-10-30", resetDate: "2027-09-10", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Halloween", deadline: "2026-10-30", resetDate: "2027-09-10", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Christmas", deadline: "2026-10-30", resetDate: "2027-10-08", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "New Year", deadline: "2026-10-30", resetDate: "2027-10-08", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Stationery/School Supplies", deadline: "2026-09-04", resetDate: "2027-02-19", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Art/Craft", deadline: "2026-09-04", resetDate: "2027-02-19", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Education/Activity", deadline: "2026-09-04", resetDate: "2027-02-19", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Sewing/Rit Dye Panel", deadline: "2026-04-03", resetDate: "2026-09-18", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Kroger: Harris Teeter", categories: "Disposable Cups/Plates/Party Plastics", deadline: "2026-02-11", resetDate: "2026-08-10", source: "StartupCPG" },
  { retailer: "Harmons", categories: "Toys/Puzzles/Games", deadline: "2026-01-12", resetDate: "2026-07-01", source: "StartupCPG" },
  { retailer: "Harmons", categories: "Christmas/Halloween/Seasonal", deadline: "2026-01-12", resetDate: "2026-07-01", source: "StartupCPG" },
  { retailer: "Harmons", categories: "School/Office Supplies", deadline: "2026-01-12", resetDate: "2026-07-01", source: "StartupCPG" },
  { retailer: "Harmons", categories: "Picnic: Utensils/Straws/Cups/Plates/Bowls", deadline: "2026-01-12", resetDate: "2026-07-01", source: "StartupCPG" },
  { retailer: "Harmons", categories: "Candles", deadline: "2026-06-01", resetDate: "2026-11-01", source: "StartupCPG" },
  { retailer: "Basha's", categories: "School Home Office", deadline: "2026-02-09", resetDate: "2026-06-01", source: "StartupCPG" },
  { retailer: "Good Eggs", categories: "Halloween/Thanksgiving/Christmas Bakery", deadline: "2026-04-01", source: "StartupCPG" },
  { retailer: "Good Eggs", categories: "Q4 Holiday Specific", deadline: "2026-05-01", source: "StartupCPG" },
  { retailer: "Lucky's & SaveMart", categories: "Stationery/School Supplies", deadline: "2026-03-05", resetDate: "2026-07-03", crManager: "Allen", source: "StartupCPG" },
  { retailer: "Mother's Market", categories: "Floral & Garden Products", deadline: "2025-11-14", resetDate: "2026-03-21", source: "StartupCPG" },
  { retailer: "Mother's Market", categories: "Gift Wrap & Decorations", deadline: "2026-06-19", resetDate: "2026-10-24", source: "StartupCPG" },
  { retailer: "Nugget", categories: "Halloween/Thanksgiving/Christmas Seasonal", deadline: "2026-05-01", source: "StartupCPG" },
  { retailer: "Nugget", categories: "Paper-Picnic", deadline: "2026-05-01", source: "StartupCPG" },
  { retailer: "Nugget", categories: "Valentines Day", deadline: "2026-09-01", source: "StartupCPG" },
  { retailer: "Nugget", categories: "Easter-Passover", deadline: "2026-11-01", source: "StartupCPG" },
  { retailer: "Albertsons Safeway", categories: "Gifting Candy", deadline: "2026-03-29", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Picnic Supplies", deadline: "2026-06-15", resetDate: "2026-10-06", notes: "New Item - Plug & Pull Opportunity", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Lunch Box", deadline: "2026-06-29", resetDate: "2026-10-20", notes: "New Item - Plug & Pull Opportunity", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Premium Party", deadline: "2026-06-29", resetDate: "2026-10-20", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Social Expr. / Party Goods", deadline: "2026-06-29", resetDate: "2026-10-20", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Sewing & Shoe Care", deadline: "2026-08-24", resetDate: "2026-12-15", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Sundries (Office & School)", deadline: "2026-10-05", resetDate: "2027-01-26", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Premium Party", deadline: "2026-11-30", resetDate: "2027-03-23", notes: "New Item - Plug & Pull Opportunity", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Social Expr. / Party Goods", deadline: "2026-11-30", resetDate: "2027-03-23", notes: "New Item - Plug & Pull Opportunity", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Picnic Supplies", deadline: "2026-12-14", resetDate: "2027-04-06", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Office & School Supplies", deadline: "2027-02-08", resetDate: "2027-06-01", notes: "Category Review (Analysis)", source: "StartupCPG" },
  { retailer: "Raley's", categories: "Holiday (All Categories)", deadline: "2027-04-01", resetDate: "2027-05-04", notes: "New Item (holiday) - Presentations April 1st", source: "StartupCPG" },
  { retailer: "Sprouts", categories: "Holiday Easter", deadline: "2025-08-01", resetDate: "2026-02-09", source: "StartupCPG" },
  { retailer: "Sprouts", categories: "Holiday Spring", deadline: "2025-09-01", resetDate: "2026-03-30", source: "StartupCPG" },
  { retailer: "Sprouts", categories: "Holiday Summer", deadline: "2025-11-03", resetDate: "2026-05-11", source: "StartupCPG" },
  { retailer: "Sprouts", categories: "Holiday Fall / Harvest / Halloween", deadline: "2026-02-01", resetDate: "2026-08-24", source: "StartupCPG" },
  { retailer: "Sprouts", categories: "Holiday Item Submission - Frozen", deadline: "2026-02-01", resetDate: "2026-09-14", source: "StartupCPG" },
  { retailer: "Sprouts", categories: "Holiday", deadline: "2026-04-01", resetDate: "2026-10-26", source: "StartupCPG" },
  { retailer: "Lucky's & SaveMart", categories: "Paper - Picnic", deadline: "2025-10-30", resetDate: "2026-02-27", crManager: "Crain", notes: "Standard Cut-In", source: "StartupCPG" },
  { retailer: "Publix", categories: "Stationery/School Supplies", deadline: "2025-09-05", resetDate: "2026-02-20", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Art/Craft", deadline: "2025-09-05", resetDate: "2026-02-20", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Education/Activity", deadline: "2025-09-05", resetDate: "2026-02-20", crManager: "KRISTIN GRUBKA", source: "StartupCPG" },
  { retailer: "Publix", categories: "Spring Seasonal", deadline: "2025-04-30", resetDate: "2026-04-24", crManager: "IVONNE LEON", source: "StartupCPG" },
  { retailer: "Publix", categories: "Summer Seasonal", deadline: "2025-04-30", resetDate: "2026-04-24", crManager: "IVONNE LEON", source: "StartupCPG" },
  { retailer: "Publix", categories: "Passover", deadline: "2025-06-19", resetDate: "2026-02-27", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Fall Seasonal", deadline: "2025-10-31", resetDate: "2026-09-11", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Halloween", deadline: "2025-10-31", resetDate: "2026-09-11", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "Christmas", deadline: "2025-10-31", resetDate: "2026-10-09", crManager: "DAN BRYAN", source: "StartupCPG" },
  { retailer: "Publix", categories: "New Year", deadline: "2025-10-31", resetDate: "2026-10-09", crManager: "DAN BRYAN", source: "StartupCPG" },

  // ========== HISTORICAL ==========
  { retailer: "Busch's HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring", deadline: "2026-01-16", source: "HarvestHub" },
  { retailer: "Kroger HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-01-03", source: "HarvestHub" },
  { retailer: "Ahold Delhaize: Giant Food HQ", categories: "Candy, Air Fresheners, Office/School Supplies, Gifts, Floral", deadline: "2025-12-29", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "Office/School Supplies, Cards, Stationery, Balloons", deadline: "2025-12-19", storeCount: 1448, crManager: "Anna Reynolds", source: "HarvestHub" },
  { retailer: "Ahold Delhaize: The Giant Company HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-12-08", source: "HarvestHub" },
  { retailer: "Ahold Delhaize: Hannaford HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-12-08", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring, General Merchandise - Winter", deadline: "2025-11-28", storeCount: 1448, source: "HarvestHub" },
  { retailer: "Ahold Delhaize: Giant Food HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-11-10", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "Misc. Household, Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-31", storeCount: 1448, source: "HarvestHub" },
  { retailer: "WinCo Foods HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-23", source: "HarvestHub" },
  { retailer: "Ahold Delhaize: Stop & Shop HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-10-06", source: "HarvestHub" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2025-09-19", source: "HarvestHub" },
  { retailer: "Publix Super Markets HQ", categories: "General Merchandise - Summer", deadline: "2025-09-01", storeCount: 1448, source: "HarvestHub" },
];

// Brand assignment keywords
const partyKeywords = ['party', 'balloon', 'celebration', 'seasonal', 'gift', 'card', 'stationery', 'floral', 'candy', 'holiday', 'outdoor', 'general merchandise', 'valentine', 'easter', 'halloween', 'christmas', 'thanksgiving', 'summer', 'spring', 'fall', 'winter', 'picnic', 'cups', 'plates', 'tableware', 'disposable', 'decoration', 'wrap', 'new year', 'passover', 'channukah', 'candle', 'toy', 'game', 'puzzle', 'gifting'];
const craftKeywords = ['craft', 'art', 'hobby', 'diy', 'kid', 'school', 'office', 'supplies', 'stationery', 'education', 'activity', 'sewing', 'latch'];

function assignBrand(cats) {
  const lower = cats.toLowerCase();
  const isParty = partyKeywords.some(kw => lower.includes(kw));
  const isCraft = craftKeywords.some(kw => lower.includes(kw));
  if (isParty && isCraft) return 'House of Party'; // Default to HoP when both
  if (isCraft) return 'Craft Hero';
  return 'House of Party';
}

function convertTo2026(dateStr) {
  if (!dateStr) return null;
  const year = parseInt(dateStr.substring(0, 4));
  if (year < 2026) return dateStr.replace(/^\d{4}/, '2026');
  return dateStr;
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

// Map categories to season/program names
function deriveSeasonProgram(cats, retailer) {
  const lower = cats.toLowerCase();
  if (lower.includes('valentine')) return "Valentine's Day";
  if (lower.includes('easter') || lower.includes('passover')) return "Easter / Spring";
  if (lower.includes('summer') || lower.includes('picnic') || lower.includes('paper-picnic')) return "Summer";
  if (lower.includes('back to school') || lower.includes('bts') || lower.includes('school')) return "Back to School";
  if (lower.includes('halloween')) return "Halloween";
  if (lower.includes('thanksgiving') || lower.includes('fall') || lower.includes('harvest')) return "Thanksgiving / Fall";
  if (lower.includes('christmas') || lower.includes('holiday') || lower.includes('new year') || lower.includes('channukah')) return "Christmas / Holiday";
  if (lower.includes('spring')) return "Easter / Spring";
  if (lower.includes('craft') || lower.includes('art')) return "Everyday / Core";
  return "Everyday / Core";
}

let idCounter = 1;
const converted = rawData.map(item => {
  const year = parseInt(item.deadline.substring(0, 4));
  const isEstimate = year < 2026;
  const submissionDeadline = convertTo2026(item.deadline);
  const reviewDeadline = addDays(submissionDeadline, 14);

  let notes = item.notes || '';
  const resetInfo = item.resetDate ? `In-store: ${item.resetDate}` : '';
  const sourceInfo = `Source: ${item.source}`;
  const storeInfo = item.storeCount ? `${item.storeCount} stores` : '';
  const estimateInfo = isEstimate ? `Estimate (original: ${item.deadline})` : '';

  const parts = [notes, resetInfo, storeInfo, estimateInfo, sourceInfo].filter(Boolean);
  notes = parts.join(' | ');

  return {
    id: String(idCounter++),
    brand: assignBrand(item.categories),
    retailer: item.retailer,
    category: item.categories,
    reviewType: "Line Review",
    reviewDeadline: reviewDeadline,
    submissionDeadline: submissionDeadline,
    seasonOrProgram: deriveSeasonProgram(item.categories, item.retailer),
    status: "Not Started",
    notes: notes,
    assignedTo: item.crManager || "",
    designLeadTime: 90
  };
});

console.log(JSON.stringify(converted, null, 2));
