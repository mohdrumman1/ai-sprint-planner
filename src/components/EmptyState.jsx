import React from 'react'

export default function EmptyState() {
  return (
    <div id="empty-state">
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
      <h3>No Sprint Plan Yet</h3>
      <p>Fill in your epic brief on the left and click Generate Sprint Plan to get started.</p>
    </div>
  )
}
