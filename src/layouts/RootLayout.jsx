import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default RootLayout;