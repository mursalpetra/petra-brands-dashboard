import { differenceInDays, parseISO, subDays, format, isAfter, isBefore, startOfDay } from 'date-fns';

// Get today's date at start of day for consistent comparisons
export function getToday() {
  return startOfDay(new Date());
}

// Calculate design start date (reviewDeadline - designLeadTime days)
export function getDesignStartDate(reviewDeadline, designLeadTime = 90) {
  const deadline = parseISO(reviewDeadline);
  return subDays(deadline, designLeadTime);
}

// Get days until a deadline
export function getDaysUntil(dateStr) {
  if (!dateStr) return null;
  const date = parseISO(dateStr);
  const today = getToday();
  return differenceInDays(date, today);
}

// Check if an entry is in the design window
// designStartDate <= today <= reviewDeadline
export function isInDesignWindow(entry) {
  const today = getToday();
  const reviewDeadline = parseISO(entry.reviewDeadline);
  const designStartDate = getDesignStartDate(entry.reviewDeadline, entry.designLeadTime || 90);

  // Exclude entries that are Accepted, Submitted, or Under Review
  const excludedStatuses = ['Accepted', 'Submitted', 'Under Review'];
  if (excludedStatuses.includes(entry.status)) {
    return false;
  }

  return !isBefore(today, designStartDate) && !isAfter(today, reviewDeadline);
}

// Check if design window is coming up (within next 14 days)
export function isDesignComingUp(entry) {
  const today = getToday();
  const designStartDate = getDesignStartDate(entry.reviewDeadline, entry.designLeadTime || 90);
  const daysUntilDesignStart = differenceInDays(designStartDate, today);

  // Exclude entries that are Accepted, Submitted, or Under Review
  const excludedStatuses = ['Accepted', 'Submitted', 'Under Review'];
  if (excludedStatuses.includes(entry.status)) {
    return false;
  }

  return daysUntilDesignStart > 0 && daysUntilDesignStart <= 14;
}

// Check if entry should show in sales panel
// submissionDeadline within 90 days, status not Accepted/Rejected
export function isInSalesWindow(entry) {
  const daysUntilSubmission = getDaysUntil(entry.submissionDeadline);
  const excludedStatuses = ['Accepted', 'Rejected'];

  if (excludedStatuses.includes(entry.status)) {
    return false;
  }

  return daysUntilSubmission !== null && daysUntilSubmission >= 0 && daysUntilSubmission <= 90;
}

// Check if entry is in immediate window (30 days)
export function isImmediate(entry) {
  const daysUntilReview = getDaysUntil(entry.reviewDeadline);
  const daysUntilSubmission = getDaysUntil(entry.submissionDeadline);

  const reviewInWindow = daysUntilReview !== null && daysUntilReview >= 0 && daysUntilReview <= 30;
  const submissionInWindow = daysUntilSubmission !== null && daysUntilSubmission >= 0 && daysUntilSubmission <= 30;

  return reviewInWindow || submissionInWindow;
}

// Check if review deadline has passed (for auto-archive)
export function isPastDeadline(entry) {
  const daysUntilReview = getDaysUntil(entry.reviewDeadline);
  return daysUntilReview !== null && daysUntilReview < 0;
}

// Get urgency level based on days remaining
export function getUrgencyLevel(daysLeft) {
  if (daysLeft < 0) return 'overdue';
  if (daysLeft < 7) return 'critical';
  if (daysLeft < 14) return 'high';
  if (daysLeft < 30) return 'medium';
  if (daysLeft < 60) return 'low';
  return 'normal';
}

// Get urgency color classes
export function getUrgencyClasses(daysLeft) {
  const level = getUrgencyLevel(daysLeft);
  switch (level) {
    case 'overdue':
      return { border: 'border-red-500', text: 'text-red-600', bg: 'bg-red-50' };
    case 'critical':
      return { border: 'border-red-500 urgent-pulse', text: 'text-red-600', bg: 'bg-red-50' };
    case 'high':
      return { border: 'border-red-400', text: 'text-red-500', bg: 'bg-red-50' };
    case 'medium':
      return { border: 'border-orange-400', text: 'text-orange-600', bg: 'bg-orange-50' };
    case 'low':
      return { border: 'border-yellow-400', text: 'text-yellow-600', bg: 'bg-yellow-50' };
    default:
      return { border: 'border-green-400', text: 'text-green-600', bg: 'bg-green-50' };
  }
}

// Format date for display
export function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  return format(parseISO(dateStr), 'MMM d, yyyy');
}

// Format short date
export function formatShortDate(dateStr) {
  if (!dateStr) return '';
  return format(parseISO(dateStr), 'MM/dd/yy');
}

// Get earliest deadline between review and submission
export function getEarliestDeadline(entry) {
  const reviewDays = getDaysUntil(entry.reviewDeadline);
  const submissionDays = getDaysUntil(entry.submissionDeadline);

  if (submissionDays === null) return { type: 'review', days: reviewDays, date: entry.reviewDeadline };
  if (reviewDays === null) return { type: 'submission', days: submissionDays, date: entry.submissionDeadline };

  if (submissionDays <= reviewDays) {
    return { type: 'submission', days: submissionDays, date: entry.submissionDeadline };
  }
  return { type: 'review', days: reviewDays, date: entry.reviewDeadline };
}

// Check if entry is archived
export function isArchived(entry) {
  return entry.archived === true;
}

// Get month name
export function getMonthName(dateStr) {
  return format(parseISO(dateStr), 'MMMM yyyy');
}
