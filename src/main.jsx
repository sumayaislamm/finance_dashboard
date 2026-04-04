import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from "./Routes/Routes";
import { RoleProvider } from './context/RoleContext';
import { TransactionProvider } from './context/TransactionContext';
import { NotificationProvider } from './context/NotificationContext';




createRoot(document.getElementById('root')).render(

<StrictMode>
  <NotificationProvider>
    <RoleProvider>
      <TransactionProvider>
        <RouterProvider router={router} />
      </TransactionProvider>
    </RoleProvider>
  </NotificationProvider>
</StrictMode>
)
