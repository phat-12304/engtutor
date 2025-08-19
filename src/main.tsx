import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import TutorsPage from './pages/TutorsPage.tsx'
import TutorDetailPage from './pages/TutorDetailPage.tsx'
import BookingPage from './pages/BookingPage.tsx'
import CheckoutPage from './pages/CheckoutPage.tsx'
import PricingPage from './pages/PricingPage.tsx'
import LoginPage from './pages/LoginPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'tutors', element: <TutorsPage /> },
      { path: 'tutors/:id', element: <TutorDetailPage /> },
      { path: 'booking/:id', element: <BookingPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
