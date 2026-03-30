import React from 'react'

export default function SummaryBar({ data, epicTitle }) {
  return (
    <div id="summary-bar">
      <div className="stat-card">
        <div className="stat-label">Epic</div>
        <div className="stat-value small">{epicTitle}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Total Points</div>
        <div className="stat-value">{data.totalStoryPoints}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Sprints</div>
        <div className="stat-value">{data.estimatedSprints}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Stories</div>
        <div className="stat-value">{(data.stories || []).length}</div>
      </div>
    </div>
  )
}
