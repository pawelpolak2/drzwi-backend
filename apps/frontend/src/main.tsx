import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App onSubmit={(code) => {
      const endpoint = `http://${window.location.hostname}:3000/open?password=${code}`
      fetch(endpoint)
    }} />
  </StrictMode>
)
