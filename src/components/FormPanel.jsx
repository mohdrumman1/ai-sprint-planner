import React, { useState } from 'react'

export default function FormPanel({ onGenerate, loading, error }) {
  const [epicTitle, setEpicTitle] = useState('')
  const [epicDesc, setEpicDesc] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [sprintLen, setSprintLen] = useState('')
  const [techStack, setTechStack] = useState('')

  const canSubmit = epicTitle && epicDesc && teamSize && sprintLen && !loading

  function handleSubmit() {
    if (!canSubmit) return
    onGenerate({ epicTitle, epicDesc, teamSize, sprintLen, techStack })
  }

  return (
    <aside id="form-panel">
      <div className="panel-title">Epic Brief</div>

      <div className="form-group">
        <label htmlFor="epic-title">Epic Title</label>
        <input
          type="text"
          id="epic-title"
          placeholder="e.g. AI Receptionist for Dental Practice"
          value={epicTitle}
          onChange={e => setEpicTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="epic-desc">Epic Description</label>
        <span className="helper">Describe the feature or goal in plain English. More detail = better stories.</span>
        <textarea
          id="epic-desc"
          rows={5}
          placeholder="e.g. Build an AI phone receptionist that answers calls 24/7, books appointments, handles FAQs, and routes urgent calls to staff. Integrate with existing booking software."
          value={epicDesc}
          onChange={e => setEpicDesc(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="team-size">Team Size</label>
        <select id="team-size" value={teamSize} onChange={e => setTeamSize(e.target.value)}>
          <option value="" disabled>Select team size</option>
          <option value="Solo">Solo</option>
          <option value="2–3 people">2–3 people</option>
          <option value="4–6 people">4–6 people</option>
          <option value="7+ people">7+ people</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="sprint-length">Sprint Length</label>
        <select id="sprint-length" value={sprintLen} onChange={e => setSprintLen(e.target.value)}>
          <option value="" disabled>Select sprint length</option>
          <option value="1 week">1 week</option>
          <option value="2 weeks">2 weeks</option>
          <option value="3 weeks">3 weeks</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="tech-stack">
          Tech Stack{' '}
          <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(optional)</span>
        </label>
        <span className="helper">Helps tailor technical acceptance criteria.</span>
        <input
          type="text"
          id="tech-stack"
          placeholder="e.g. React, Node.js, Twilio"
          value={techStack}
          onChange={e => setTechStack(e.target.value)}
        />
      </div>

      {error && <div className="error-box">{error}</div>}

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="13 2 13 9 20 9"/>
          <polygon points="22 2 2 22 13 13 22 2"/>
        </svg>
        Generate Sprint Plan
      </button>

    </aside>
  )
}
