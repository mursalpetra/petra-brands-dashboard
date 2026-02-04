// Script to generate API JSON files for n8n integration
// Run with: node scripts/generateApiData.js

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'api');

// Ensure directory exists
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Raw review data (same as in src/data/reviewData.js)
const rawData = [
  // Future reviews (2026)
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-07-17", reviewType: "Minor" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-07-17", reviewType: "Speed to Shelf" },
  { retailer: "Food City HQ", categories: "Misc. Outdoors, General Merchandise - Summer, General Merchandise - Spring", deadline: "2026-07-17", reviewType: "Major" },
  { retailer: "Albertsons HQ", categories: "Misc. Outdoors, General Merchandise - Summer", deadline: "2026-05-22", reviewType: "Reset" },
  { retailer: "Raley's HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-04-03", reviewType: "Reset" },
  { retailer: "Harmons HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-03-12", reviewType: "" },
  { retailer: "Publix Super Markets HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", reviewType: "Major" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", reviewType: "Major" },
  { retailer: "Food City HQ", categories: "Office/School Supplies, Cards, Stationery and Gift", deadline: "2026-02-13", reviewType: "Major" },
];

// Category keywords for brand assignment
const partyKeywords = ['party', 'balloon', 'celebration', 'seasonal', 'gift', 'card', 'stationery', 'floral', 'candy', 'holiday', 'outdoor', 'general merchandise'];
const craftKeywords = ['craft', 'art', 'hobby', 'diy', 'kid', 'school', 'office', 'supplies'];

function assignBrand(categories) {
  const lower = categories.toLowerCase();
  const isParty = partyKeywords.some(kw => lower.includes(kw));
  const isCraft = craftKeywords.some(kw => lower.includes(kw));

  if (isParty && isCraft) return 'Both';
  if (isCraft) return 'Craft Hero';
  return 'House of Party';
}

function getDaysRemaining(deadline) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  return Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
}

function calculateMilestones(deadline) {
  const d = new Date(deadline);
  const finalReviewDate = new Date(d.getTime() - 7 * 24 * 60 * 60 * 1000); // T-1 week
  const samplesReadyDate = new Date(finalReviewDate.getTime() - 15 * 24 * 60 * 60 * 1000); // T-15 days from Final
  return {
    prepStart: new Date(d.getTime() - 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],     // T-5 weeks
    pitchDue: new Date(d.getTime() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],      // T-4 weeks
    designDue: new Date(samplesReadyDate.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 weeks before Samples Ready
    samplesReady: samplesReadyDate.toISOString().split('T')[0],                                  // T-15 days from Final
    sampleShip: new Date(finalReviewDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],    // T-7 days from Final
    finalReview: finalReviewDate.toISOString().split('T')[0],                                    // T-1 week
    submissionDeadline: deadline
  };
}

// Process data
let idCounter = 1;
const reviews = rawData
  .map(item => {
    const daysRemaining = getDaysRemaining(item.deadline);
    const milestones = calculateMilestones(item.deadline);

    return {
      id: idCounter++,
      brand: assignBrand(item.categories),
      retailer: item.retailer,
      category: item.categories,
      submissionDeadline: item.deadline,
      reviewType: item.reviewType || 'Standard',
      daysRemaining,
      milestones,
      status: daysRemaining < 0 ? 'OVERDUE' :
              daysRemaining <= 14 ? 'URGENT' :
              daysRemaining <= 42 ? 'PREP_NOW' :
              daysRemaining <= 84 ? 'ON_TRACK' : 'UPCOMING'
    };
  })
  .filter(r => r.daysRemaining >= 0) // Only future reviews
  .sort((a, b) => a.daysRemaining - b.daysRemaining);

// Generate main reviews JSON
const reviewsData = {
  generated: new Date().toISOString(),
  count: reviews.length,
  reviews
};

writeFileSync(
  join(publicDir, 'reviews.json'),
  JSON.stringify(reviewsData, null, 2)
);

// Generate alerts JSON (reviews needing attention in next 30 days)
const alerts = reviews
  .filter(r => r.daysRemaining <= 30)
  .map(r => {
    // Find the next upcoming milestone
    const today = new Date();
    const milestoneList = [
      { name: 'Prep Start', date: r.milestones.prepStart },
      { name: 'Pitch Due', date: r.milestones.pitchDue },
      { name: 'Design Due', date: r.milestones.designDue },
      { name: 'Samples Ready', date: r.milestones.samplesReady },
      { name: 'Sample Ship', date: r.milestones.sampleShip },
      { name: 'Final Review', date: r.milestones.finalReview },
      { name: 'Submission Deadline', date: r.milestones.submissionDeadline }
    ];

    const nextMilestone = milestoneList.find(m => new Date(m.date) >= today) || milestoneList[milestoneList.length - 1];
    const milestoneDays = Math.ceil((new Date(nextMilestone.date) - today) / (1000 * 60 * 60 * 24));

    return {
      ...r,
      nextMilestone: nextMilestone.name,
      nextMilestoneDate: nextMilestone.date,
      daysUntilMilestone: milestoneDays,
      urgency: milestoneDays <= 0 ? 'CRITICAL' :
               milestoneDays <= 3 ? 'HIGH' :
               milestoneDays <= 7 ? 'MEDIUM' : 'LOW'
    };
  });

const alertsData = {
  generated: new Date().toISOString(),
  count: alerts.length,
  alerts
};

writeFileSync(
  join(publicDir, 'alerts.json'),
  JSON.stringify(alertsData, null, 2)
);

console.log(`Generated ${reviews.length} reviews and ${alerts.length} alerts`);
console.log(`Files written to ${publicDir}`);
