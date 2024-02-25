import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ProductsDataProvider } from "./contexts/productsContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsDataProvider>
        <App />
      </ProductsDataProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
