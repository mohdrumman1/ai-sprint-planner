import React, { useState } from 'react'
import ApiKeyScreen from './components/ApiKeyScreen'
import Header from './components/Header'
import FormPanel from './components/FormPanel'
import OutputPanel from './components/OutputPanel'

const STATUS_STEPS = [
  'Parsing your epic...',
  'Generating user stories...',
  'Estimating story points...',
  'Assigning sprint schedule...',
  'Finalising your sprint plan...',
]

const SYSTEM_PROMPT = `You are an experienced Agile project manager and technical lead. Given an epic or feature request, produce a complete sprint-ready breakdown.
Follow these rules:

Write user stories in the format: "As a [user], I want to [action] so that [benefit]"
Each story must have 2–4 clear acceptance criteria
Assign story points using Fibonacci: 1, 2, 3, 5, 8, 13
Assign each story to a sprint number starting from Sprint 1
Keep stories small enough to complete within a single sprint
Flag any stories that have dependencies on other stories using the dependsOn field

Respond ONLY with a valid JSON object (no markdown fences, no extra text) with this exact structure:
{
  "epicSummary": "string",
  "totalStoryPoints": number,
  "estimatedSprints": number,
  "stories": [
    {
      "id": "string (e.g. US-001)",
      "title": "string",
      "userStory": "string",
      "acceptanceCriteria": ["string"],
      "storyPoints": number,
      "sprint": number,
      "priority": "must-have|should-have|nice-to-have",
      "dependsOn": ["string (story id) or empty array"]
    }
  ]
}`

function getInitialKey() {
  if (typeof window !== 'undefined' && window.FORMA_API_KEY) return window.FORMA_API_KEY
  return sessionStorage.getItem('forma_api_key') || ''
}

export default function App() {
  const [apiKey, setApiKey] = useState(getInitialKey)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [error, setError] = useState(null)
  const [results, setResults] = useState(null)
  const [epicTitle, setEpicTitle] = useState('')
  const [filters, setFilters] = useState({ sprint: '', priority: '' })

  const isAuthenticated = apiKey.startsWith('sk-')

  function handleApiKeySubmit(key) {
    setApiKey(key)
    sessionStorage.setItem('forma_api_key', key)
  }

  function handleChangeKey() {
    setApiKey('')
    sessionStorage.removeItem('forma_api_key')
  }

  async function handleGenerate(formData) {
    const { epicTitle: title, epicDesc, teamSize, sprintLen, techStack } = formData
    setError(null)
    setLoading(true)
    setLoadingStep(0)
    setResults(null)
    setEpicTitle(title)

    const userMessage = [
      `Epic title: ${title}`,
      `Epic description: ${epicDesc}`,
      `Team size: ${teamSize}`,
      `Sprint length: ${sprintLen}`,
      techStack ? `Tech stack: ${techStack}` : '',
    ].filter(Boolean).join('\n')

    const interval = setInterval(() => {
      setLoadingStep(prev => Math.min(prev + 1, STATUS_STEPS.length - 1))
    }, 1600)

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://mohdrumman1.github.io/ai-sprint-planner/',
          'X-Title': 'AI Sprint Planner',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-001',
          max_tokens: 4000,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userMessage },
          ],
        }),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        setError(
          response.status === 401
            ? 'Invalid API key. Check your key and try again.'
            : errData?.error?.message || `API error (${response.status}). Please try again.`
        )
        return
      }

      const data = await response.json()
      const raw = data?.choices?.[0]?.message?.content || ''
      const jsonMatch = raw.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new SyntaxError('No JSON object found in response')
      const parsed = JSON.parse(jsonMatch[0])
      setResults(parsed)
      setFilters({ sprint: '', priority: '' })
    } catch (err) {
      setError(
        err instanceof SyntaxError
          ? 'The API returned an unexpected format. Please try again.'
          : 'Could not connect to the API. Check your internet connection and try again.'
      )
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <ApiKeyScreen onSubmit={handleApiKeySubmit} />
  }

  return (
    <>
      <Header />
      <div id="app-wrapper">
        <div id="app-screen">
          <FormPanel
            onGenerate={handleGenerate}
            onChangeKey={handleChangeKey}
            loading={loading}
            error={error}
          />
          <OutputPanel
            loading={loading}
            loadingStep={loadingStep}
            statusSteps={STATUS_STEPS}
            results={results}
            epicTitle={epicTitle}
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
      </div>
    </>
  )
}
