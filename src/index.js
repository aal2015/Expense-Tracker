import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Homepage from './Homepage';
import TransactionDetail from './components/Transaction/TransactionDetail';
import AddTransaction from './components/Input/AddTransaction';
import EditTransaction from './components/Edit/EditTransaction';
import { CurrencyContextProvider } from './context/currency-context';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "transactionDetail/:id",
        element: <TransactionDetail />
      },
      {
        path: "addTransactionRecord",
        element: <AddTransaction />
      }
      ,
      {
        path: "editTransaction/:id",
        element: <EditTransaction />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrencyContextProvider>
      <RouterProvider router={router} />
    </CurrencyContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
