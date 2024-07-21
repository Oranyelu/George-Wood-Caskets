import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Contacts from "./Pages/Contacts"
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import AboutUs from './Pages/AboutUs.jsx';
import Xclusive from './Pages/Xclusive.jsx';
import Tracking from './Pages/Tracking.jsx';
import Giving from './Pages/Giving.jsx';
import Product from './Pages/Product.jsx';
import Services from './Pages/Services.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/contacts",
    element: <Contacts />
  },
  {
    path: "/xclusive",
    element: <Xclusive />
  },
  {
    path: "/track-order",
    element: <Tracking />
  },
  {
    path: "/giving",
    element: <Giving />
  },
  {
    path: "/product",
    element: <Product  />
  },
  {
    path: "/services",
    element: <Services />
  },
  {
    path: "/about-us",
    element: <AboutUs />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)