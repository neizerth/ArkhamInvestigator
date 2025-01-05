import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import { AppProvider } from './app/AppProvider/AppProvider.tsx'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
