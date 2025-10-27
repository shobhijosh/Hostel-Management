import React from 'react'
import './sidebar.css'
import { NavLink,Link } from 'react-router'

const Sidebar = () => {
    return (
        <>
            <aside className="sidebar">
                <div className="sidebar-header">
                    <Link to='/'>Hostel Hub</Link>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><NavLink to="/admin"><i className="fa-solid fa-gauge-high"></i> Dashboard</NavLink></li>
                        <li><NavLink to="/rooms"><i className="fa-solid fa-bed"></i> Rooms</NavLink></li>
                        <li><NavLink to="/students"><i className="fa-solid fa-user-graduate"></i> Students</NavLink></li>
                        <li><NavLink to="/fees"><i className="fa-solid fa-money-check-dollar"></i> Billing &amp; Fees</NavLink></li>
                        <li><NavLink to="/mess"><i className="fa-solid fa-utensils"></i> Mess Menu</NavLink></li>
                        <li><NavLink to="/complaints"><i className="fa-solid fa-file-invoice"></i> Track Complaints</NavLink></li>
                        <li><NavLink to="/"><i className="fa-solid fa-sign-out"></i>Log Out</NavLink></li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar
