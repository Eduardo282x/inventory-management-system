import { Login } from "./components/login/Login";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from './components/home/Home';
import {Layout} from './components/Layout/Layout'
import {Inventory} from './components/inventory/Inventory'
import {Profile} from './components/profile/Profile'
import {Reports} from './components/reports/Reports'
import {Users} from './components/users/Users'
import { Cart } from "./components/cart/cart";
import { Clients } from "./components/clients/client";
import {PdfGenerate} from "./components/shared/pdfGenerate/pdfGenerate";

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
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/client",
        element: <Clients />
      },
    ]
  },
  {
    path: "/pdf",
    element: <PdfGenerate/>
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
