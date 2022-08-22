import { NavLink } from 'react-router-dom';

// STYLES & IMAGES
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'

import React from 'react';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-content">
                <div className="user">
                    {/* avatar and username here later */}
                    <p>Hey user</p>
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink exact to="/">
                                <img src={DashboardIcon} alt="Dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="Add project icon" />
                                <span>New project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
