import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider }           from "react-redux";
import { store }              from "./app/store";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import { seedMockData } from "./utils/mockData";
seedMockData(); 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
