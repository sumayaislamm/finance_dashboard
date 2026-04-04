import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Transactions from "../pages/Transactions/Transactions";
import Analytics from "../pages/Analytics/Analytics";
import Categories from "../pages/Categories/Categories";
import Reports from "../pages/Reports/Reports";
import Wallets from "../pages/Wallets/Wallets";
import Settings from "../pages/Settings/Settings";
import Notifications from "../pages/Notifications/Notifications";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    errorElement:<ErrorPage></ErrorPage>,
    children: [{
        index:true,
        path:"/",
        Component: Dashboard,
    }, 
    {
        path:"/transactions",
        Component: Transactions,
    }, 
    {
        path:"/analytics",
        Component: Analytics,
    },
    {
        path:"/categories",
        Component: Categories,
    },
    {
        path:"/reports",
        Component: Reports,
    },
    {
        path:"/wallets",
        Component: Wallets,
    },
    {
        path:"/notifications",
        Component: Notifications,
    },
    {
        path:"/settings",
        Component: Settings,
    },

    {
        path:"*",
        Component: ErrorPage,
    }
] 
}
]);