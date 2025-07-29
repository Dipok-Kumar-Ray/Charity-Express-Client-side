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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast'


const queryClient = new QueryClient();



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-7xl mx-auto'>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router} />
      <Toaster/>
    </AuthProvider>
    </QueryClientProvider>
    </div>
  </StrictMode>,
)
