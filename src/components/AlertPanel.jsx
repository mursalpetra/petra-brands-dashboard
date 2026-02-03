import { AlertCircle, PartyPopper, Palette } from 'lucide-react';
import { getDaysRemaining, getClosestMilestone, formatShortDate, isFutureReview } from '../utils/dateUtils';

export default function AlertPanel({ reviews, showPast }) {
  const activeReviews = reviews.filter(r => !r.completed);

  // Filter to future reviews only (unless showPast enabled)
  const futureReviews = showPast
    ? activeReviews
    : activeReviews.filter(r => isFutureReview(r.submissionDeadline));

  // Get closest milestone for each review and sort by milestone proximity
  const urgentItems = futureReviews
    .map(r => {
      const closestMilestone = getClosestMilestone(r.submissionDeadline);
      return {
        ...r,
        daysRemaining: getDaysRemaining(r.submissionDeadline),
        closestMilestone,
        milestoneDaysUntil: closestMilestone ? closestMilestone.daysUntil : 999
      };
    })
    .filter(r => r.closestMilestone && r.milestoneDaysUntil <= 60) // Only items with milestones in next 60 days
    .sort((a, b) => {
      // Sort by closest milestone first (most urgent)
      return a.milestoneDaysUntil - b.milestoneDaysUntil;
    })
    .slice(0, 5);

  if (urgentItems.length === 0) {
    return (
      <div className="alert-panel">
        <h3><AlertCircle size={18} /> Action Items</h3>
        <div className="no-alerts">
          <span>No urgent items - you're all caught up!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="alert-panel">
      <h3><AlertCircle size={18} /> Top 5 Action Items</h3>
      <div className="alert-list">
        {urgentItems.map(item => {
          const milestone = item.closestMilestone;
          const isToday = milestone.daysUntil === 0;
          const isTomorrow = milestone.daysUntil === 1;
          const isUrgent = milestone.daysUntil <= 7;

          return (
            <div
              key={item.id}
              className={`alert-item ${isToday ? 'overdue' : isUrgent ? 'urgent' : 'warning'}`}
            >
              <div className="alert-brand">
                {item.brand === 'House of Party' ? (
                  <PartyPopper size={16} className="brand-icon party" />
                ) : (
                  <Palette size={16} className="brand-icon craft" />
                )}
              </div>
              <div className="alert-details">
                <div className="alert-retailer">{item.retailer}</div>
                <div className="alert-category">
                  {item.category.substring(0, 50)}{item.category.length > 50 ? '...' : ''}
                </div>
                <div className="alert-milestone">
                  {isToday ? (
                    <span className="today-text">{milestone.name} is TODAY!</span>
                  ) : isTomorrow ? (
                    <span className="urgent-text">{milestone.name} is TOMORROW</span>
                  ) : (
                    <span>{milestone.name} in {milestone.daysUntil} days</span>
                  )}
                </div>
              </div>
              <div className="alert-date">
                {formatShortDate(item.submissionDeadline)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
