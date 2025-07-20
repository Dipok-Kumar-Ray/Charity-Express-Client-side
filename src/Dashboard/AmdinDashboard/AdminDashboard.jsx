import React from 'react';
import { NavLink, Outlet } from 'react-router';

import UseUserRole from '../../../RoleManage/UseUserRole';

const AdminDashboard = () => {
   
    const {role} = UseUserRole();
    console.log(role);
    return (
        <div>
            <header>
                <ul>
                    <NavLink to='/'>

                    </NavLink>
                </ul>
            </header>
            <Outlet/>
        </div>
    );
};

export default AdminDashboard;