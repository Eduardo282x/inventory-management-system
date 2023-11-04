import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Home } from './components/home/Home.jsx';
import {Profile} from './components/profile/Profile.jsx';
import {Inventory} from './components/inventory/Inventory.jsx';

import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Login } from './components/login/Login.jsx'
import Layout from './components/Layout/Layout.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    element: <Layout/>,
    children: [
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/profile",
        element: <Profile />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
