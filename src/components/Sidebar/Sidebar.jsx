import React from 'react';
import { NavLink, Outlet } from 'react-router';

const Sidebar = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full flex justify-between bg-base-300 px-5">

                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost bg-base-300 text-primary font-bold">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4" ><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>

                        <div>
                            <label className="flex cursor-pointer gap-2">
                                <span className="label-text">Light</span>
                                <input
                                    type="checkbox"
                                    value="dark"
                                    className="toggle theme-controller"
                                />
                                <span className="label-text">Dark</span>
                            </label>
                        </div>
                        <div className="px-4 text-2xl text-primary font-bold">FINOVA</div>



                    </nav>
                    {/* Page content here */}
                    <div className="p-4">

                        <Outlet></Outlet>
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">


                        <NavLink
                            to="/"
                            className="flex flex-row items-center gap-2 py-2 rounded ml-8 
    hover:text-black 
    transition-all duration-300 ease-in-out"
                        >
                            <div>
                                <button
                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right 
            flex items-center gap-2"

                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="my-1.5 inline-block w-4 h-4 mr-4
                transition-transform duration-300 ease-in-out 
                hover:scale-110"
                                    >
                                        <path d="M22 4c-1 .5-2 .8-3 1a4.5 4.5 0 0 0-7.5 3V9A10.5 10.5 0 0 1 3 5s-4 9 5 13a11.6 11.6 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 22 4Z" />
                                    </svg>

                                    <span className="is-drawer-close:hidden ml-4 transition-all duration-300">
                                        FINOVA
                                    </span>
                                </button>
                            </div>
                        </NavLink>
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <NavLink
                                to="/"
                                className={({ isActive }) => `flex items-center gap-2 p-2 rounded hover:bg-gray-200 hover:text-black ${isActive ? "text-white bg-primary font-bold p-2" : ""}`}
                            >
                                <li>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                                        {/* Dashboard icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                        <span className="is-drawer-close:hidden">Dashboard</span>
                                    </button>
                                </li>
                            </NavLink>

                            {/* Transactions */}
                            <NavLink
                                to="/transactions"
                                className={({ isActive }) => `flex items-center gap-2 p-2 rounded hover:bg-gray-200 hover:text-black ${isActive ? "text-white bg-primary font-bold p-2" : ""}`}
                            >
                                <li>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Transactions">
                                        {/* Transactions icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="my-1.5 inline-block w-4 h-4">
                                            <path d="M4 4v6h6M20 20v-6h-6" />
                                            <path d="M4 10l6-6M20 14l-6 6" />
                                        </svg>
                                        <span className="is-drawer-close:hidden">Transactions</span>
                                    </button>
                                </li>
                            </NavLink>

                            {/* Analytics  */}
                            <NavLink
                                to="/analytics"
                                className={({ isActive }) => `flex items-center gap-2 p-2 rounded hover:bg-gray-200 hover:text-black ${isActive ? "text-white bg-primary font-bold p-2" : ""}`}
                            >
                                <li>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Analytics">
                                        {/* Analytics icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="my-1.5 inline-block w-4 h-4">
                                            <path d="M3 3v18h18" />
                                            <path d="M7 14v-4" />
                                            <path d="M12 14v-8" />
                                            <path d="M17 14v-2" />
                                        </svg>
                                        <span className="is-drawer-close:hidden">Analytics</span>
                                    </button>
                                </li>
                            </NavLink>

                            {/* Categories  */}
                            <NavLink
                                to="/categories"
                                className={({ isActive }) => `flex items-center gap-2 p-2 rounded hover:bg-gray-200 hover:text-black ${isActive ? "text-white bg-primary font-bold p-2" : ""}`}
                            >
                                <li>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Categories">
                                        {/* Categories icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="my-1.5 inline-block w-4 h-4">
                                            <rect x="3" y="3" width="7" height="7" />
                                            <rect x="14" y="3" width="7" height="7" />
                                            <rect x="3" y="14" width="7" height="7" />
                                            <rect x="14" y="14" width="7" height="7" />
                                        </svg>
                                        <span className="is-drawer-close:hidden">Categories</span>
                                    </button>
                                </li>
                            </NavLink>

                            {/* Reports  */}
                            <NavLink
                                to="/reports"
                                className={({ isActive }) => `flex items-center gap-2 p-2 rounded hover:bg-gray-200 hover:text-black ${isActive ? "text-white bg-primary font-bold p-2" : ""}`}
                            >
                                <li>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Reports">
                                        {/* Reports icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="my-1.5 inline-block w-4 h-4">
                                            <path d="M9 12h6M9 16h6M9 8h6" />
                                            <path d="M4 21h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" />
                                        </svg>
                                        <span className="is-drawer-close:hidden">Reports</span>
                                    </button>
                                </li>
                            </NavLink>

                            {/* Wallets */}
                            <NavLink
                                to="/wallets"
                                className={({ isActive }) => `flex items-center gap-2 p-2 rounded hover:bg-gray-200 hover:text-black ${isActive ? "text-white bg-primary font-bold p-2" : ""}`}
                            >
                                <li>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Wallets">

                                        {/* Wallets icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="my-1.5 inline-block w-4 h-4">
                                            <path d="M2 7h20v12H2z" />
                                            <path d="M2 7l4-4h12l4 4" />
                                            <circle cx="18" cy="13" r="1" />
                                        </svg> <span className="is-drawer-close:hidden">Wallets</span>
                                    </button>
                                </li>
                            </NavLink>

                       

                            {/* List item */}
                            <NavLink
                                to="/settings"
                                className={({ isActive }) => `flex items-center gap-2 p-2 rounded hover:bg-gray-200 hover:text-black ${isActive ? "text-white bg-primary font-bold p-2" : ""}`}
                            >
                                <li>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                        {/* Settings icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                        <span className="is-drawer-close:hidden">Settings</span>
                                    </button>
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;