import { StrictMode } from 'react'
import  ReactDOM  from 'react-dom/client'
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

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'addCampaign',
    element: <AddCampaing/>
  },
  {
    path: 'campaigns',
    element: <AllCampaings/>,
    loader: () => fetch('http://localhost:3530/campaign')
  },
  {
    path : 'myCampaign',
    element: <MyCampaing/>
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
