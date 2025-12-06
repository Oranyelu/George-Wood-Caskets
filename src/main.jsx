import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import AuthProvider from "./Providers/AuthProvider";
import ProductProvider from "./Providers/ProductProvider";
import OrderProvider from "./Providers/OrderProvider";
import ThemeProvider from "./Providers/ThemeContext";

import { HelmetProvider } from 'react-helmet-async';
import './i18n';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <ProductProvider>
              <OrderProvider>
                <App />
              </OrderProvider>
            </ProductProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
