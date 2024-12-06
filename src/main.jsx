import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from './pages/Home.jsx'
import AddCampaing from './pages/AddCampaing.jsx'
import AllCampaings from './pages/AllCampaings'
import MyCampaing from './pages/MyCampaing.jsx'
import CampaignDetails from './pages/CampaignDetails.jsx' // Import the CampaignDetails component
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import NotFound from './pages/NotFound.jsx'
import MainLayout from './layout/MainLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    errorElement: <NotFound/>,
    children :[
      {
        path : '/',
        element : <Home></Home>
      },
      {
        path: 'campaigns',
        element: <AllCampaings/>,
        loader: () => fetch('http://localhost:3530/campaign')
      }
      

    ]
  },
  {
    path: 'addCampaign',
    element: <AddCampaing/>
  },
  {
    path: 'myCampaign',
    element: <MyCampaing/>
  },
  {
    path: 'campaign/:id', 
    element: <CampaignDetails/> 
  },
  {
    path: 'signin',
    element: <Login/>
  },
  {
    path : 'signup',
    element :<Register/>
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
