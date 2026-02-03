import { AlertCircle, PartyPopper, Palette } from 'lucide-react';
import { getDaysRemaining, getNextMilestone, formatShortDate } from '../utils/dateUtils';

export default function AlertPanel({ reviews }) {
  const activeReviews = reviews.filter(r => !r.completed);

  const urgentItems = activeReviews
    .map(r => ({
      ...r,
      daysRemaining: getDaysRemaining(r.submissionDeadline),
      nextMilestone: getNextMilestone(r.submissionDeadline)
    }))
    .filter(r => r.daysRemaining <= 60)
    .sort((a, b) => a.daysRemaining - b.daysRemaining)
    .slice(0, 5);

  if (urgentItems.length === 0) {
    return (
      <div className="alert-panel">
        <h3><AlertCircle size={18} /> Action Items</h3>
        <div className="no-alerts">
          <span>No urgent items</span>
        </div>
      </div>
    );
  }

  return (
    <div className="alert-panel">
      <h3><AlertCircle size={18} /> Top 5 Action Items</h3>
      <div className="alert-list">
        {urgentItems.map(item => (
          <div key={item.id} className={`alert-item ${item.daysRemaining < 0 ? 'overdue' : item.daysRemaining <= 14 ? 'urgent' : 'warning'}`}>
            <div className="alert-brand">
              {item.brand === 'House of Party' ? (
                <PartyPopper size={16} className="brand-icon party" />
              ) : (
                <Palette size={16} className="brand-icon craft" />
              )}
            </div>
            <div className="alert-details">
              <div className="alert-retailer">{item.retailer}</div>
              <div className="alert-category">{item.category.substring(0, 50)}{item.category.length > 50 ? '...' : ''}</div>
              <div className="alert-milestone">
                {item.nextMilestone.daysUntil < 0 ? (
                  <span className="overdue-text">{item.nextMilestone.name} was {Math.abs(item.nextMilestone.daysUntil)} days ago</span>
                ) : item.nextMilestone.daysUntil === 0 ? (
                  <span className="today-text">{item.nextMilestone.name} is TODAY</span>
                ) : (
                  <span>{item.nextMilestone.name} in {item.nextMilestone.daysUntil} days</span>
                )}
              </div>
            </div>
            <div className="alert-date">
              {formatShortDate(item.submissionDeadline)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
