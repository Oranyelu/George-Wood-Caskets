import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Contacts from './Pages/Contacts';
import NotFoundPage from './Pages/NotFoundPage';
import AboutUs from './Pages/AboutUs';
import Xclusive from './Pages/Xclusive';
import Tracking from './Pages/Tracking';
import Giving from './Pages/Giving';
import Product from './Pages/Products';
import Services from './Pages/Services';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Confirmation from './Pages/Confirmation';
import ProductProvider from './ProductProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="xclusive" element={<Xclusive />} />
          <Route path="track-order" element={<Tracking />} />
          <Route path="giving" element={<Giving />} />
          <Route path="product" element={<Product />} />
          <Route path="services" element={<Services />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  </React.StrictMode>
);
