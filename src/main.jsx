import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from "./Routes/Routes";
import { RoleProvider } from './context/RoleContext';
import { TransactionProvider } from './context/TransactionContext';
import { WalletProvider } from './context/WalletContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




createRoot(document.getElementById('root')).render(

  <StrictMode>
      <RoleProvider>
        <TransactionProvider>
          <WalletProvider>
            <RouterProvider router={router} />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              theme="colored"
            />
          </WalletProvider>
        </TransactionProvider>

      </RoleProvider>
  </StrictMode>
)
