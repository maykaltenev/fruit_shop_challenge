import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
// Router
import { BrowserRouter } from "react-router-dom";
// Context
import { ProductContextProvider } from "./components/Context/ProductContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </BrowserRouter>,
);


