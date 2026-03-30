import React from 'react'

export default function LoadingState({ step, steps }) {
  const progress = Math.round(((step + 1) / steps.length) * 88)

  return (
    <div id="loading-state">
      <div className="loading-spinner" />
      <div className="loading-text">
        <div className="loading-label">Building Your Sprint Plan</div>
        <div id="loading-message">{steps[Math.min(step, steps.length - 1)]}</div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
