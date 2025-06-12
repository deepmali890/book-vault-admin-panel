import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from './components/ui/sonner'



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster
      position="top-center"
      richColors 
      toastOptions={{
        style: {
          zIndex: 999999, // sabke upar le jao
          // background: '#333',
          // color: '#fff',
        }
      }}/>
  </React.StrictMode>,
)
