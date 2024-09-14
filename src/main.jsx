// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import { OrderProvider } from "./OrderProvider"; // Import OrderProvider
import Contacts from "./Pages/Contacts";
import NotFoundPage from "./Pages/NotFoundPage";
import AboutUs from "./Pages/AboutUs";
import Xclusive from "./Pages/Xclusive";
import OrderTrackingPage from "./Pages/Tracking";
import Giving from "./Pages/Giving";
import Services from "./Pages/Services";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Confirmation from "./Pages/Confirmation";
import ProductProvider from "./ProductProvider";
import ProductDetail from "./Pages/Products";
import ProductsPage from "./Pages/ProductsPage"; // Import OrderTrackingPage
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
      <OrderProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="register" element={<Register />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="xclusive" element={<Xclusive />} />
            <Route path="track-order" element={<OrderTrackingPage />} />
            <Route path="giving" element={<Giving />} />
            <Route path="product/:productId" element={<ProductDetail />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="login" element={<Login />} />
            <Route path="services" element={<Services />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="confirmation" element={<Confirmation />} />
            <Route
              path="order-tracking/:orderId"
              element={<OrderTrackingPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </OrderProvider>
    </ProductProvider>
  </React.StrictMode>
);
