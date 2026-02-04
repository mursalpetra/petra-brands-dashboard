import { differenceInDays, subWeeks, subDays, format, parseISO } from 'date-fns';

// Use dynamic current date
export const CURRENT_DATE = new Date();

export function getDaysRemaining(deadlineStr) {
  const deadline = parseISO(deadlineStr);
  return differenceInDays(deadline, CURRENT_DATE);
}

export function getStatus(daysRemaining, completed, includePast = false) {
  if (completed) return 'COMPLETED';
  if (daysRemaining < 0) {
    // Only return OVERDUE if showing past reviews
    return includePast ? 'OVERDUE' : null;
  }
  if (daysRemaining <= 14) return 'URGENT';
  if (daysRemaining <= 42) return 'PREP_NOW';
  if (daysRemaining <= 84) return 'ON_TRACK';
  return 'UPCOMING';
}

export function getStatusConfig(status) {
  const configs = {
    OVERDUE: { label: 'Overdue', color: '#EF4444', bgColor: '#FEE2E2', emoji: '🔴' },
    URGENT: { label: 'Urgent', color: '#F97316', bgColor: '#FFEDD5', emoji: '🟠' },
    PREP_NOW: { label: 'Prep Now', color: '#EAB308', bgColor: '#FEF9C3', emoji: '🟡' },
    ON_TRACK: { label: 'On Track', color: '#22C55E', bgColor: '#DCFCE7', emoji: '🟢' },
    UPCOMING: { label: 'Upcoming', color: '#3B82F6', bgColor: '#DBEAFE', emoji: '🔵' },
    COMPLETED: { label: 'Completed', color: '#9CA3AF', bgColor: '#F3F4F6', emoji: '⚪' }
  };
  return configs[status] || configs.UPCOMING;
}

export function calculateMilestones(deadlineStr) {
  const deadline = parseISO(deadlineStr);
  const finalReviewDate = subWeeks(deadline, 1); // T-1 week
  return {
    prepStart: format(subWeeks(deadline, 5), 'yyyy-MM-dd'),        // T-5 weeks
    pitchDue: format(subWeeks(deadline, 4), 'yyyy-MM-dd'),         // T-4 weeks
    samplesReady: format(subDays(finalReviewDate, 15), 'yyyy-MM-dd'), // T-15 days from Final Review
    sampleShip: format(subDays(finalReviewDate, 7), 'yyyy-MM-dd'),    // T-7 days from Final Review
    finalReview: format(finalReviewDate, 'yyyy-MM-dd'),            // T-1 week
    submissionDeadline: deadlineStr
  };
}

export function formatDate(dateStr) {
  if (!dateStr) return '-';
  return format(parseISO(dateStr), 'MMM d, yyyy');
}

export function formatShortDate(dateStr) {
  if (!dateStr) return '-';
  return format(parseISO(dateStr), 'MM/dd/yy');
}

export function getNextMilestone(deadlineStr) {
  const milestones = calculateMilestones(deadlineStr);
  const today = CURRENT_DATE;

  const orderedMilestones = [
    { name: 'Prep Start', date: milestones.prepStart },
    { name: 'Pitch Due', date: milestones.pitchDue },
    { name: 'Samples Ready', date: milestones.samplesReady },
    { name: 'Sample Ship', date: milestones.sampleShip },
    { name: 'Final Review', date: milestones.finalReview },
    { name: 'Submission Deadline', date: milestones.submissionDeadline }
  ];

  for (const milestone of orderedMilestones) {
    const milestoneDate = parseISO(milestone.date);
    const daysUntil = differenceInDays(milestoneDate, today);
    if (daysUntil >= 0) {
      return { ...milestone, daysUntil };
    }
  }

  return { name: 'Overdue', date: milestones.submissionDeadline, daysUntil: getDaysRemaining(deadlineStr) };
}

// Check if review is in the future (deadline >= today)
export function isFutureReview(deadlineStr) {
  return getDaysRemaining(deadlineStr) >= 0;
}

// Check if prep is starting this week (T-5 to T-4 weeks window)
export function isStartingPrepThisWeek(deadlineStr) {
  const milestones = calculateMilestones(deadlineStr);
  const prepStartDays = getDaysRemaining(milestones.prepStart);
  const pitchDueDays = getDaysRemaining(milestones.pitchDue);

  // Currently in prep start window: prep start has passed (or today) but pitch not due yet
  return prepStartDays <= 0 && pitchDueDays > 0;
}

// Get the closest upcoming milestone for a review
export function getClosestMilestone(deadlineStr) {
  const milestones = calculateMilestones(deadlineStr);
  const today = CURRENT_DATE;

  const orderedMilestones = [
    { name: 'Prep Start', date: milestones.prepStart },
    { name: 'Pitch Due', date: milestones.pitchDue },
    { name: 'Samples Ready', date: milestones.samplesReady },
    { name: 'Sample Ship', date: milestones.sampleShip },
    { name: 'Final Review', date: milestones.finalReview },
    { name: 'Submission Deadline', date: milestones.submissionDeadline }
  ];

  for (const milestone of orderedMilestones) {
    const milestoneDate = parseISO(milestone.date);
    const daysUntil = differenceInDays(milestoneDate, today);
    if (daysUntil >= -1) { // Include if today or in future (or just yesterday for "is TODAY" display)
      return { ...milestone, daysUntil };
    }
  }

  return null;
}
