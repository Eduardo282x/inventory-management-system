import { Login } from "./components/login/Login";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from './components/home/Home';
import {Layout} from './components/Layout/Layout'
import {Inventory} from './components/inventory/Inventory'
import {Profile} from './components/profile/Profile'
import {Reports} from './components/reports/Reports'
import {Users} from './components/users/Users'

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
      {
        path: "/reports",
        element: <Reports />
      },
      {
        path: "/users",
        element: <Users />
      },
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
