import React from 'react'
import logo from '../../Images/logo.png'
import './Navbar.css'
import { Link } from 'react-router'

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <div className="container">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="Hostel Hub logo" />
                        </Link>
                    </div>
                    <nav>
                        <Link to="#">About Us</Link>
                        <Link to="#">Features</Link>
                        <Link to="/contact-us">Contact Us</Link>
                    </nav>
                    <div className="nav-actions">
                        <Link to="/login" className="btn-primary">Get Started</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
