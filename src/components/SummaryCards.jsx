import { Calendar, AlertTriangle, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { getDaysRemaining, getStatus, formatDate } from '../utils/dateUtils';

export default function SummaryCards({ reviews }) {
  const activeReviews = reviews.filter(r => !r.completed);

  const overdue = activeReviews.filter(r => getDaysRemaining(r.submissionDeadline) < 0);
  const next30Days = activeReviews.filter(r => {
    const days = getDaysRemaining(r.submissionDeadline);
    return days >= 0 && days <= 30;
  });
  const next60Days = activeReviews.filter(r => {
    const days = getDaysRemaining(r.submissionDeadline);
    return days >= 0 && days <= 60;
  });

  const nextUpcoming = activeReviews
    .filter(r => getDaysRemaining(r.submissionDeadline) >= 0)
    .sort((a, b) => getDaysRemaining(a.submissionDeadline) - getDaysRemaining(b.submissionDeadline))[0];

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="card-icon blue">
          <Calendar size={24} />
        </div>
        <div className="card-content">
          <div className="card-value">{activeReviews.length}</div>
          <div className="card-label">Active Reviews</div>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon orange">
          <Clock size={24} />
        </div>
        <div className="card-content">
          <div className="card-value">{next30Days.length}</div>
          <div className="card-label">Due in 30 Days</div>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon yellow">
          <Clock size={24} />
        </div>
        <div className="card-content">
          <div className="card-value">{next60Days.length}</div>
          <div className="card-label">Due in 60 Days</div>
        </div>
      </div>

      <div className={`summary-card ${overdue.length > 0 ? 'alert' : ''}`}>
        <div className={`card-icon ${overdue.length > 0 ? 'red' : 'green'}`}>
          {overdue.length > 0 ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
        </div>
        <div className="card-content">
          <div className="card-value">{overdue.length}</div>
          <div className="card-label">Overdue</div>
        </div>
      </div>

      <div className="summary-card next-deadline">
        <div className="card-icon purple">
          <ArrowRight size={24} />
        </div>
        <div className="card-content">
          {nextUpcoming ? (
            <>
              <div className="card-value small">{nextUpcoming.retailer}</div>
              <div className="card-label">{formatDate(nextUpcoming.submissionDeadline)}</div>
            </>
          ) : (
            <div className="card-label">No upcoming</div>
          )}
        </div>
      </div>
    </div>
  );
}
