
import { StrictMode } from 'react'
import './index.css'
import AuthProvider from './providers/AuthProvider'
import { RouterProvider } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)