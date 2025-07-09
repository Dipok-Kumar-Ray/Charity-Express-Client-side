import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-7xl mx-auto'>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </div>
  </StrictMode>,
)
