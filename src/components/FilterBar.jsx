import React, { useState } from 'react'

function buildCsv(results) {
  const headers = ['Story ID', 'Title', 'User Story', 'Acceptance Criteria', 'Story Points', 'Sprint', 'Priority', 'Dependencies']
  const rows = [
    headers,
    ...(results.stories || []).map(s => [
      s.id,
      s.title,
      s.userStory,
      (s.acceptanceCriteria || []).join(' | '),
      s.storyPoints,
      `Sprint ${s.sprint}`,
      s.priority,
      (s.dependsOn || []).join(', '),
    ]),
  ]
  return rows
    .map(row => row.map(cell => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\n')
}

function buildPlainText(data, epicTitle) {
  let t = `SPRINT PLAN: ${epicTitle}\n`
  t += `${'═'.repeat(60)}\n`
  t += `Total Story Points: ${data.totalStoryPoints}  |  Estimated Sprints: ${data.estimatedSprints}  |  Stories: ${(data.stories || []).length}\n\n`
  t += `EPIC SUMMARY\n${data.epicSummary}\n`

  const groups = {}
  ;(data.stories || []).forEach(s => {
    if (!groups[s.sprint]) groups[s.sprint] = []
    groups[s.sprint].push(s)
  })

  Object.keys(groups).sort((a, b) => a - b).forEach(sprint => {
    t += `\n${'─'.repeat(60)}\nSPRINT ${sprint}\n${'─'.repeat(60)}\n`
    groups[sprint].forEach(s => {
      t += `\n[${s.id}] ${s.title}\n`
      t += `Points: ${s.storyPoints}  |  Priority: ${s.priority}  |  Sprint: ${s.sprint}\n`
      t += `\n${s.userStory}\n\nAcceptance Criteria:\n`
      ;(s.acceptanceCriteria || []).forEach(ac => { t += `  ☐ ${ac}\n` })
      if (s.dependsOn && s.dependsOn.length) t += `\nDepends on: ${s.dependsOn.join(', ')}\n`
    })
  })

  return t
}

export default function FilterBar({ sprintNums, filters, onFilterChange, results, epicTitle }) {
  const [copied, setCopied] = useState(false)

  function handleExportCsv() {
    const csv = buildCsv(results)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sprint-plan-${epicTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  async function handleCopyText() {
    try {
      await navigator.clipboard.writeText(buildPlainText(results, epicTitle))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div id="filter-bar">
      <label>Filter by</label>
      <select
        value={filters.sprint}
        onChange={e => onFilterChange(prev => ({ ...prev, sprint: e.target.value }))}
      >
        <option value="">All Sprints</option>
        {sprintNums.map(n => (
          <option key={n} value={String(n)}>Sprint {n}</option>
        ))}
      </select>
      <select
        value={filters.priority}
        onChange={e => onFilterChange(prev => ({ ...prev, priority: e.target.value }))}
      >
        <option value="">All Priorities</option>
        <option value="must-have">Must Have</option>
        <option value="should-have">Should Have</option>
        <option value="nice-to-have">Nice to Have</option>
      </select>
      <div className="filter-spacer" />
      <div className="export-row">
        <button className="btn btn-secondary" onClick={handleExportCsv}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export CSV
        </button>
        <button className="btn btn-secondary" onClick={handleCopyText}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          {copied ? 'Copied!' : 'Copy All as Text'}
        </button>
      </div>
    </div>
  )
}
