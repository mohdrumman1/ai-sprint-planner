import React, { useState } from 'react'
import StoryCard from './StoryCard'

export default function SprintSection({ sprint, stories }) {
  const [open, setOpen] = useState(true)
  const totalPts = stories.reduce((sum, s) => sum + (s.storyPoints || 0), 0)

  return (
    <details
      className="sprint-section"
      open={open}
      onToggle={e => setOpen(e.currentTarget.open)}
    >
      <summary>
        <div className="sprint-header-left">
          <span className="sprint-chevron">▶</span>
          <span className="sprint-name">Sprint {sprint}</span>
        </div>
        <span className="sprint-meta">
          {stories.length} {stories.length === 1 ? 'story' : 'stories'} · {totalPts} pts
        </span>
      </summary>
      <div className="sprint-stories">
        {stories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </details>
  )
}
