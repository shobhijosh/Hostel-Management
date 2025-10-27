import React, { useState } from 'react'
import './login.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

const Login = () => {
    const [activeTab, setActiveTab] = useState("admin")

    return (
        <>
            <Navbar />
            <div className="main-content">
                <div className="login-container">
                    <h1 className="welcome-title">Welcome to Hostel Hub</h1>
                    <div className="tab-controls">
                        <button className="tab-button" id={activeTab == 'admin' && 'active'} onClick={() => setActiveTab('admin')}>Admin Login</button>
                        <button className="tab-button" id={activeTab == 'student' && 'active'} onClick={() => setActiveTab('student')}>Student Login</button>
                    </div>
                    {activeTab === 'admin' && (
                        <div id="admin-content" className="tab-content active">
                            <form className="login-form">
                                <div className="form-group">
                                    <label htmlFor="admin-email">Email ID</label>
                                    <input type="email" id="admin-email" placeholder="Enter your email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="admin-password">Password</label>
                                    <input type="password" id="admin-password" placeholder="Enter your password" required />
                                </div>
                                <button type="submit" className="submit-button">Admin Login</button>
                            </form>
                        </div>
                    )}
                    {activeTab === 'student' && (
                        <div id="student-content" className="tab-content active">
                            <form className="login-form">
                                <div className="form-group">
                                    <label htmlFor="student-email">Student ID</label>
                                    <input type="text" id="student-email" placeholder="Enter student id" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="student-password">Password</label>
                                    <input type="password" id="student-password" placeholder="Enter your password" required />
                                </div>
                                <button type="submit" className="submit-button">Student Login</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Login
