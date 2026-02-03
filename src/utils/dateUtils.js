import { differenceInDays, subWeeks, format, parseISO } from 'date-fns';

// Current date for the dashboard (Feb 3, 2026)
export const CURRENT_DATE = new Date('2026-02-03');

export function getDaysRemaining(deadlineStr) {
  const deadline = parseISO(deadlineStr);
  return differenceInDays(deadline, CURRENT_DATE);
}

export function getStatus(daysRemaining, completed) {
  if (completed) return 'COMPLETED';
  if (daysRemaining < 0) return 'OVERDUE';
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
  return {
    prepStart: format(subWeeks(deadline, 8), 'yyyy-MM-dd'),
    internalBriefDue: format(subWeeks(deadline, 6), 'yyyy-MM-dd'),
    samplesReady: format(subWeeks(deadline, 4), 'yyyy-MM-dd'),
    assetsReady: format(subWeeks(deadline, 3), 'yyyy-MM-dd'),
    finalReview: format(subWeeks(deadline, 1), 'yyyy-MM-dd'),
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
    { name: 'Internal Brief Due', date: milestones.internalBriefDue },
    { name: 'Samples Ready', date: milestones.samplesReady },
    { name: 'Assets Ready', date: milestones.assetsReady },
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
