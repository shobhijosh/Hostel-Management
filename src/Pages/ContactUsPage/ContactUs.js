import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
// import './contact.css'

const ContactUs = () => {
    return (
        <>
            <Navbar />
            <main class="container">
                <section class="intro">
                    <h1>Get in Touch</h1>
                    <p>We'd love to hear from you. Please fill out the form below or use our contact details to reach us.</p>
                </section>

                <div class="content-layout">
                    <div class="left-panel">
                        <div class="contact-form">
                            <form>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="name">Name*</label>
                                        <input type="text" id="name" placeholder="Enter your name" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email*</label>
                                        <input type="email" id="email" placeholder="Enter your email address" required />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="subject">Subject</label>
                                    <input type="text" id="subject" placeholder="Enter the subject of your message" />
                                </div>

                                <div class="form-group">
                                    <label for="message">Message*</label>
                                    <textarea id="message" rows="5" placeholder="Write your message here..." required></textarea>
                                </div>

                                <button type="submit" class="btn btn-send-message">Send Message</button>
                            </form>
                        </div>
                    </div>
                    <div class="right-panel">
                        <div class="card contact-info">
                            <h3>Contact Information</h3>
                            <div class="info-item">
                                <i class="fas fa-phone-alt icon-blue"></i>
                                <div>
                                    <span class="label">Phone</span>
                                    <span class="value">+1 (234) 567-890</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-envelope icon-blue"></i>
                                <div>
                                    <span class="label">Email</span>
                                    <span class="value">contact@hostel.com</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-map-marker-alt icon-blue"></i>
                                <div>
                                    <span class="label">Address</span>
                                    <span class="value">123 Hostel St, Wanderlust City, 45678</span>
                                </div>
                            </div>
                        </div>

                        <div class="card map-placeholder">
                            <img src="https://placehold.co/400x150/f0f4f7/1c6d83?text=Map+Placeholder" alt="Map Location" style={{width:'100%',borderRadius:'8px',filter:"grayscale(10%)"}}/>
                        </div>

                        <div class="card connect-us">
                            <h3>Connect with Us</h3>
                            <div class="social-icons">
                                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default ContactUs
