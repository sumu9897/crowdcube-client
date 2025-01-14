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
import UpdateCampaign from './pages/UpdateCampaign.jsx'
import AuthLayout from './layout/AuthLayout.jsx'
import PrivateRoute from './routes/privateRoute.jsx'
import MyDonations from './pages/MyDonations.jsx'
import DonateForm from './pages/DonateForm.jsx'
import AboutUs from './pages/AboutUs.jsx'

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
        loader: () => fetch('https://crowdcube-server-lemon.vercel.app/campaign')
      },
      {
        path: 'addCampaign',
        element: (
          <PrivateRoute>
            <AddCampaing />
          </PrivateRoute>
        ),
      },{
        path: 'about',
        element:<AboutUs></AboutUs>
      },
      
      {
        path: 'myCampaign',
        element: <MyCampaing/>
      },
      {
        path: 'mydonations',
        element: <MyDonations />,
      },
      {
        path: "/donate/:id",
        element: <DonateForm/>
      },
    
      {
        path : "/updateCampaign/:id",
        element: <UpdateCampaign/>
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
      
    ]
  },


  

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
