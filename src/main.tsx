import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './AuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider />
  </StrictMode>,
)
