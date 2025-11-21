
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import AuthProvider from "./Providers/AuthProvider";
import ProductProvider from "./Providers/ProductProvider";
import OrderProvider from "./Providers/OrderProvider";
import SplashCursor from "./SplashCursor";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <OrderProvider>
            <SplashCursor />
              <App />
            
          </OrderProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
