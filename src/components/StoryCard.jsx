import React from 'react'

const PRIORITY_MAP = {
  'must-have':    { cls: 'pri-must',   label: 'Must Have' },
  'should-have':  { cls: 'pri-should', label: 'Should Have' },
  'nice-to-have': { cls: 'pri-nice',   label: 'Nice to Have' },
}

export default function StoryCard({ story }) {
  const pts = story.storyPoints || 0
  const ptsClass = pts <= 3 ? 'pts-low' : pts <= 8 ? 'pts-mid' : 'pts-high'
  const pri = PRIORITY_MAP[story.priority] || { cls: 'pri-should', label: story.priority }

  return (
    <div className="story-card">
      <div className="story-header">
        <div className="story-id-title">
          <span className="story-id">{story.id}</span>
          <span className="story-title">{story.title}</span>
        </div>
        <div className="story-badges">
          <span className={`badge pts-badge ${ptsClass}`}>{pts} pt{pts === 1 ? '' : 's'}</span>
          <span className={`badge pri-badge ${pri.cls}`}>{pri.label}</span>
        </div>
      </div>
      <div className="story-user-story">{story.userStory}</div>
      <div className="ac-label">Acceptance Criteria</div>
      <ul className="ac-list">
        {(story.acceptanceCriteria || []).map((ac, i) => (
          <li key={i}>{ac}</li>
        ))}
      </ul>
      {story.dependsOn && story.dependsOn.length > 0 && (
        <div className="story-deps">
          Depends on:{' '}
          {story.dependsOn.map((d, i) => (
            <React.Fragment key={d}>
              {i > 0 && ', '}
              <span>{d}</span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
