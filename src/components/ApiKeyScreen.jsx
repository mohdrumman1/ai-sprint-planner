import React, { useState } from 'react'
import Header from './Header'

export default function ApiKeyScreen({ onSubmit }) {
  const [value, setValue] = useState('')
  const [invalid, setInvalid] = useState(false)

  function handleSubmit() {
    const trimmed = value.trim()
    if (!trimmed.startsWith('sk-')) {
      setInvalid(true)
      return
    }
    onSubmit(trimmed)
  }

  return (
    <>
      <Header />
      <div id="api-screen">
        <div className="api-card">
          <h2>Enter Your API Key</h2>
          <p>You'll need an OpenRouter API key to generate sprint plans. Get one at openrouter.ai.</p>
          <div className="form-group">
            <label htmlFor="api-key-input">OpenRouter API Key</label>
            <input
              type="password"
              id="api-key-input"
              placeholder="sk-or-..."
              autoComplete="off"
              value={value}
              style={invalid ? { borderColor: 'var(--red)' } : {}}
              onChange={e => { setValue(e.target.value); setInvalid(false) }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>Continue</button>
          <div className="api-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Your key is stored in this browser session only. It is never logged or sent anywhere except OpenRouter.
          </div>
        </div>
      </div>
    </>
  )
}
