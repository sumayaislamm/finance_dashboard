import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';

const Root = () => {
    return (
        <div>
            <Sidebar></Sidebar>
            <Footer></Footer>
        </div>
    );
};

export default Root;