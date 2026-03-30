import React from 'react'
import EmptyState from './EmptyState'
import LoadingState from './LoadingState'
import SummaryBar from './SummaryBar'
import FilterBar from './FilterBar'
import SprintSection from './SprintSection'

export default function OutputPanel({ loading, loadingStep, statusSteps, results, epicTitle, filters, onFilterChange }) {
  const sprintNums = results
    ? [...new Set(results.stories.map(s => s.sprint))].sort((a, b) => a - b)
    : []

  const filteredGroups = {}
  if (results) {
    const groups = {}
    results.stories.forEach(s => {
      if (!groups[s.sprint]) groups[s.sprint] = []
      groups[s.sprint].push(s)
    })
    Object.keys(groups).forEach(sprint => {
      const filtered = groups[sprint].filter(s => {
        const matchSprint = !filters.sprint || String(s.sprint) === filters.sprint
        const matchPriority = !filters.priority || s.priority === filters.priority
        return matchSprint && matchPriority
      })
      if (filtered.length > 0) filteredGroups[sprint] = filtered
    })
  }

  const hasNoMatch = results && Object.keys(filteredGroups).length === 0

  return (
    <main id="output-panel">
      {!loading && !results && <EmptyState />}
      {loading && <LoadingState step={loadingStep} steps={statusSteps} />}
      {!loading && results && (
        <div id="results">
          <SummaryBar data={results} epicTitle={epicTitle} />
          <div id="epic-summary-box">
            <strong>Epic Summary</strong>
            <span>{results.epicSummary}</span>
          </div>
          <FilterBar
            sprintNums={sprintNums}
            filters={filters}
            onFilterChange={onFilterChange}
            results={results}
            epicTitle={epicTitle}
          />
          <div id="stories-container">
            {Object.keys(filteredGroups)
              .sort((a, b) => a - b)
              .map(sprint => (
                <SprintSection
                  key={sprint}
                  sprint={Number(sprint)}
                  stories={filteredGroups[sprint]}
                />
              ))}
          </div>
          {hasNoMatch && (
            <div className="no-match">No stories match your current filters.</div>
          )}
        </div>
      )}
    </main>
  )
}
