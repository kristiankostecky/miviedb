import App from './App.tsx'
import './index.css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme accentColor="violet" appearance="light">
      <App />
    </Theme>
  </React.StrictMode>
)
