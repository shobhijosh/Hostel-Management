import React from 'react'
import './footer.css'
import { Link } from 'react-router'

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container footer-grid">
                <div className="footer-col about-col">
                    <h4>HostelHub</h4>
                    <p>The modern, cloud-based platform designed for effortless hostel management.</p>
                    <div className="social-links">
                        <Link to="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></Link>
                        <Link to="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></Link>
                        <Link to="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></Link>
                        <Link to="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></Link>
                    </div>
                </div>
                <div className="footer-col">
                    <h4>Platform</h4>
                    <ul>
                        <li><Link to="/admin">Admin Dashboard</Link></li>
                        <li><Link to="/rooms">Room Allocation</Link></li>
                        <li><Link to="/fees">Billing & Payments</Link></li>
                        <li><Link to="/complaints">Track Complaint</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><Link to="#">About Us</Link></li>
                        <li><Link to="#">Our Vision</Link></li>
                        <li><Link to="#">Careers</Link></li>
                        <li><Link to="#">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Support</h4>
                    <ul>
                        <li><Link to="#">Help Center</Link></li>
                        <li><Link to="#">User Guides</Link></li>
                        <li><Link to="#">Privacy Policy</Link></li>
                        <li><Link to="#">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    &copy; 2025 HostelHub. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer
