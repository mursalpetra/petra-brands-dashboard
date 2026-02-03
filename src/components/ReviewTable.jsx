import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, Check, PartyPopper, Palette } from 'lucide-react';
import {
  getDaysRemaining,
  getStatus,
  getStatusConfig,
  calculateMilestones,
  formatDate,
  formatShortDate
} from '../utils/dateUtils';

function StatusBadge({ status }) {
  const config = getStatusConfig(status);
  return (
    <span
      className="status-badge"
      style={{ backgroundColor: config.bgColor, color: config.color }}
    >
      {config.emoji} {config.label}
    </span>
  );
}

function BrandBadge({ brand }) {
  const isParty = brand === 'House of Party';
  const isBoth = brand === 'Both';
  return (
    <span className={`brand-badge ${isParty ? 'party' : isBoth ? 'both' : 'craft'}`}>
      {isParty ? <PartyPopper size={14} /> : isBoth ? '🎨' : <Palette size={14} />}
      <span>{brand}</span>
    </span>
  );
}

function ExpandedRow({ review }) {
  const milestones = calculateMilestones(review.submissionDeadline);
  const daysRemaining = getDaysRemaining(review.submissionDeadline);

  const timelineItems = [
    { label: 'Prep Start (T-8 weeks)', date: milestones.prepStart, desc: 'Begin gathering data, pricing, assortment' },
    { label: 'Internal Brief Due (T-6 weeks)', date: milestones.internalBriefDue, desc: 'Category story, deck, product selection finalized' },
    { label: 'Samples Ready (T-4 weeks)', date: milestones.samplesReady, desc: 'Samples shipped or staged' },
    { label: 'Assets Ready (T-3 weeks)', date: milestones.assetsReady, desc: 'All submission materials done' },
    { label: 'Final Review (T-1 week)', date: milestones.finalReview, desc: 'Leadership reviews before submission' },
    { label: 'Submission Deadline', date: milestones.submissionDeadline, desc: 'Everything submitted to retailer' }
  ];

  return (
    <tr className="expanded-row">
      <td colSpan="13">
        <div className="timeline-container">
          <h4>Prep Timeline for {review.retailer}</h4>
          <div className="timeline">
            {timelineItems.map((item, idx) => {
              const itemDays = getDaysRemaining(item.date);
              const isPast = itemDays < 0;
              const isCurrent = itemDays >= 0 && itemDays <= 7;
              return (
                <div key={idx} className={`timeline-item ${isPast ? 'past' : ''} ${isCurrent ? 'current' : ''}`}>
                  <div className="timeline-marker">
                    {isPast ? <Check size={14} /> : <span>{idx + 1}</span>}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-label">{item.label}</div>
                    <div className="timeline-date">{formatDate(item.date)}</div>
                    <div className="timeline-desc">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function ReviewTable({ reviews, onToggleComplete }) {
  const [expandedId, setExpandedId] = useState(null);
  const [sortField, setSortField] = useState('daysRemaining');
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const enrichedReviews = reviews.map(r => ({
    ...r,
    daysRemaining: getDaysRemaining(r.submissionDeadline),
    status: getStatus(getDaysRemaining(r.submissionDeadline), r.completed),
    milestones: calculateMilestones(r.submissionDeadline)
  }));

  const sortedReviews = [...enrichedReviews].sort((a, b) => {
    // Completed items always go to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    let comparison = 0;
    switch (sortField) {
      case 'daysRemaining':
        comparison = a.daysRemaining - b.daysRemaining;
        break;
      case 'retailer':
        comparison = a.retailer.localeCompare(b.retailer);
        break;
      case 'brand':
        comparison = a.brand.localeCompare(b.brand);
        break;
      case 'deadline':
        comparison = a.daysRemaining - b.daysRemaining;
        break;
      default:
        comparison = 0;
    }
    return sortDir === 'asc' ? comparison : -comparison;
  });

  const SortHeader = ({ field, children }) => (
    <th onClick={() => handleSort(field)} className="sortable">
      {children}
      {sortField === field && (
        sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
      )}
    </th>
  );

  return (
    <div className="table-container">
      <table className="review-table">
        <thead>
          <tr>
            <th></th>
            <SortHeader field="daysRemaining">Status</SortHeader>
            <SortHeader field="brand">Brand</SortHeader>
            <SortHeader field="retailer">Retailer</SortHeader>
            <th>Category</th>
            <SortHeader field="deadline">Deadline</SortHeader>
            <th>Days Left</th>
            <th>Prep Start</th>
            <th>Brief Due</th>
            <th>Assets Ready</th>
            <th>Final Review</th>
            <th>Review Type</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {sortedReviews.map(review => (
            <>
              <tr
                key={review.id}
                className={`${review.completed ? 'completed-row' : ''} ${expandedId === review.id ? 'expanded' : ''}`}
              >
                <td className="expand-cell" onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}>
                  <ChevronRight size={18} className={expandedId === review.id ? 'rotated' : ''} />
                </td>
                <td><StatusBadge status={review.status} /></td>
                <td><BrandBadge brand={review.brand} /></td>
                <td className="retailer-cell">{review.retailer}</td>
                <td className="category-cell" title={review.category}>
                  {review.category.substring(0, 40)}{review.category.length > 40 ? '...' : ''}
                </td>
                <td>{formatShortDate(review.submissionDeadline)}</td>
                <td className={`days-cell ${review.daysRemaining < 0 ? 'overdue' : review.daysRemaining <= 14 ? 'urgent' : ''}`}>
                  {review.daysRemaining}
                </td>
                <td>{formatShortDate(review.milestones.prepStart)}</td>
                <td>{formatShortDate(review.milestones.internalBriefDue)}</td>
                <td>{formatShortDate(review.milestones.assetsReady)}</td>
                <td>{formatShortDate(review.milestones.finalReview)}</td>
                <td>{review.reviewType}</td>
                <td>
                  <button
                    className={`complete-btn ${review.completed ? 'completed' : ''}`}
                    onClick={() => onToggleComplete(review.id)}
                  >
                    <Check size={16} />
                  </button>
                </td>
              </tr>
              {expandedId === review.id && <ExpandedRow review={review} />}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
