import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import ErrorPage from './pages/404'
import MainLayout from './layouts/MainLayout'

// Import halaman-halaman
import AboutMe from './pages/AboutMe'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Awardings from './pages/Awardings'
import Completions from './pages/Completions'
import Contacts from './pages/Contacts'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AboutMe />,
      },
     {
        path: "skills",
        element: <Skills />,
      },
      {
        path: "projects",
        element: <Projects/>,
      },
      {
        path: "achievements/awardings",
        element: <Awardings/>,
      },
      {
        path: "achievements/completions",
        element: <Completions/>,
      },
      {
        path: "contacts",
        element: <Contacts/>,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)