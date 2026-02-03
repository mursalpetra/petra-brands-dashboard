import { Calendar, Clock, PlayCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { getDaysRemaining, formatDate, isStartingPrepThisWeek, isFutureReview } from '../utils/dateUtils';

export default function SummaryCards({ reviews, showPast }) {
  // Filter to future reviews only (unless showPast is enabled)
  const futureReviews = showPast
    ? reviews.filter(r => !r.completed)
    : reviews.filter(r => !r.completed && isFutureReview(r.submissionDeadline));

  // Count reviews where prep is starting this week
  const startingPrepThisWeek = futureReviews.filter(r => isStartingPrepThisWeek(r.submissionDeadline));

  // For showPast mode, also count overdue
  const overdue = showPast
    ? reviews.filter(r => !r.completed && getDaysRemaining(r.submissionDeadline) < 0)
    : [];

  const next30Days = futureReviews.filter(r => {
    const days = getDaysRemaining(r.submissionDeadline);
    return days >= 0 && days <= 30;
  });

  const next60Days = futureReviews.filter(r => {
    const days = getDaysRemaining(r.submissionDeadline);
    return days >= 0 && days <= 60;
  });

  const nextUpcoming = futureReviews
    .filter(r => getDaysRemaining(r.submissionDeadline) >= 0)
    .sort((a, b) => getDaysRemaining(a.submissionDeadline) - getDaysRemaining(b.submissionDeadline))[0];

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="card-icon blue">
          <Calendar size={24} />
        </div>
        <div className="card-content">
          <div className="card-value">{futureReviews.length}</div>
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

      {showPast ? (
        <div className={`summary-card ${overdue.length > 0 ? 'alert' : ''}`}>
          <div className={`card-icon ${overdue.length > 0 ? 'red' : 'green'}`}>
            <AlertTriangle size={24} />
          </div>
          <div className="card-content">
            <div className="card-value">{overdue.length}</div>
            <div className="card-label">Overdue</div>
          </div>
        </div>
      ) : (
        <div className={`summary-card ${startingPrepThisWeek.length > 0 ? 'highlight' : ''}`}>
          <div className={`card-icon ${startingPrepThisWeek.length > 0 ? 'teal' : 'gray'}`}>
            <PlayCircle size={24} />
          </div>
          <div className="card-content">
            <div className="card-value">{startingPrepThisWeek.length}</div>
            <div className="card-label">Starting Prep</div>
          </div>
        </div>
      )}

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
