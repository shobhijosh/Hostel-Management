import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import './home.css'

const Home = () => {
    return (
        <>
            <Navbar/>
            <div className="hero-section">
                <div className="container">
                    <h1>Effortless Hostel Management Starts Here</h1>
                    <p className="subtitle">A modern, intuitive platform for managing your hostel, from bookings to billing.
                        Simplify your operations and enhance guest experience.</p>
                    <div className="hero-actions">
                        <a href="/login" className="btn-primary">Get Started</a>
                        <a href="#" className="btn-secondary">Learn More</a>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Choose HostelHub?</h2>
                    <p className="section-subtitle">Our system offers a comprehensive suite of tools designed to enhance hostel
                        management efficiency and resident satisfaction.</p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <i className="fa-solid fa-bed"></i>
                            <h3>Room Management</h3>
                            <p>Easily manage room availability, check-ins/outs, and maintenance schedules.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fa-solid fa-user-group"></i>
                            <h3>Resident Profiles</h3>
                            <p>Maintain complete profiles for each resident, including personal information and preferences.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fa-solid fa-dollar-sign"></i>
                            <h3>Billing & Payments</h3>
                            <p>Automate billing processes, track payments, and generate financial reports.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fa-solid fa-table-list"></i>
                            <h3>Complaint Resolution Dashboard</h3>
                            <p>Access a real-time feed of complaints, categorize by urgency and assign to staff.</p>
                        </div>
                    </div>

                    <div className="features-action">
                        <a href="#" className="btn-primary-blue">Explore All Features</a>
                    </div>
                </div>
            </div>

            <div className="login-section">
                <div className="container">
                    <h2 className="section-title">Login to Your Account</h2>
                    <p className="section-subtitle">Welcome back! Please select your role to login.</p>
                    <div className="login-roles">
                        <div className="role-card">
                            <i className="fa-solid fa-user-shield"></i>
                            <h3>Admin Login</h3>
                            <p>Access the management dashboard to oversee hostel operations.</p>
                            <a href="/login" className="btn-primary-blue">Login as Admin</a>
                        </div>
                        <div className="role-card">
                            <i className="fa-solid fa-graduation-cap"></i>
                            <h3>Student Login</h3>
                            <p>Access your personal portal to view details and manage your stay.</p>
                            <a href="/login" className="btn-primary-blue">Login as Student</a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default Home
