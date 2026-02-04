import { LayoutDashboard, Palette, Calendar, AlertTriangle } from 'lucide-react';
import { isInDesignWindow, getDaysUntil } from '../utils/dateHelpers';

export default function SummaryStats({ entries }) {
  // Total active (non-archived)
  const totalActive = entries.filter(e => !e.archived).length;

  // Design team active (in design window)
  const designActive = entries.filter(e => !e.archived && isInDesignWindow(e)).length;

  // Submissions due this month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const submissionsDueThisMonth = entries.filter(e => {
    if (e.archived) return false;
    const subDate = new Date(e.submissionDeadline);
    return subDate.getMonth() === currentMonth && subDate.getFullYear() === currentYear;
  }).length;

  // Overdue/Critical: deadline < 7 days OR stuck at "Not Started" within 30 days
  const criticalCount = entries.filter(e => {
    if (e.archived) return false;
    const daysToReview = getDaysUntil(e.reviewDeadline);
    const daysToSubmission = getDaysUntil(e.submissionDeadline);
    const minDays = Math.min(daysToReview ?? Infinity, daysToSubmission ?? Infinity);

    // Overdue
    if (minDays < 0) return true;

    // Critical (< 7 days)
    if (minDays < 7) return true;

    // Stuck: Not Started within 30 days
    if (e.status === 'Not Started' && minDays <= 30) return true;

    return false;
  }).length;

  const stats = [
    {
      label: 'Total Active Reviews',
      value: totalActive,
      icon: LayoutDashboard,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
    },
    {
      label: 'Design Team Active',
      value: designActive,
      icon: Palette,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
    },
    {
      label: 'Submissions Due This Month',
      value: submissionsDueThisMonth,
      icon: Calendar,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
    },
    {
      label: 'Overdue / Critical',
      value: criticalCount,
      icon: AlertTriangle,
      color: criticalCount > 0
        ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'
        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-4 max-w-7xl mx-auto">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4"
        >
          <div className={`p-3 rounded-lg ${stat.color}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
