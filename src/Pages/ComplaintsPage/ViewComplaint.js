import React, { useEffect } from 'react'
import './complaint.css'
import Sidebar from '../../Components/SideBar/Sidebar'
import Footer from '../../Components/Footer/Footer'

const ViewComplaint = () => {
    // Scrolls the page to top when the component mounts
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            <div className='mainContainer'>
                <Sidebar />
                <main className="main-complaint-content">
                    <header className="room-header">
                        <h2>Complaint Details</h2>
                        <p>Manage and resolve student complaints</p>
                    </header>

                    <div className="complaint-details-layout">
                        <div className="left-panel">
                            <section className="room-card complaint-information">
                                <h3>Complaint Information</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="label">Complaint ID</span>
                                        <span className="value">#12345</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Date Submitted</span>
                                        <span className="value">2024-10-26</span>
                                    </div>
                                    <div className="info-item full-width">
                                        <span className="label">Subject</span>
                                        <span className="value">Leaky Faucet in Washroom</span>
                                    </div>
                                    <div className="info-item full-width">
                                        <span className="label">Description</span>
                                        <span className="value">The faucet in the washroom of Room 405 has been leaking for the past two days. It's wasting a lot of water and creating a slippery floor surface, which is a safety hazard.</span>
                                    </div>
                                </div>
                            </section>

                            <section className="room-card student-information">
                                <h3>Student Information</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="label">Student Name</span>
                                        <span className="value">Alex Doe</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Room Number</span>
                                        <span className="value">405</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Contact Number</span>
                                        <span className="value">+1 234 567 890</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Email</span>
                                        <span className="value">alex.doe@university.edu</span>
                                    </div>
                                </div>
                            </section>

                            {/* <section className="room-card complaint-history">
                                <h3>Complaint History</h3>
                                <div className="history-item">
                                    <span className="history-dot blue"></span>
                                    <div>
                                        <p><strong>Admin assigned this to Maintenance.</strong></p>
                                        <span className="history-date">October 27, 2024, 09:30 AM</span>
                                    </div>
                                </div>
                                <div className="history-item">
                                    <span className="history-dot orange"></span>
                                    <div>
                                        <p><strong>Status changed to <span className="history-status-inprogress">In Progress</span>.</strong></p>
                                        <span className="history-date">October 27, 2024, 09:30 AM</span>
                                    </div>
                                </div>
                                <div className="history-item">
                                    <span className="history-dot yellow"></span>
                                    <div>
                                        <p><strong>Complaint submitted by Alex Doe.</strong></p>
                                        <span className="history-date">October 26, 2024, 03:15 PM</span>
                                    </div>
                                </div>
                            </section> */}
                        </div>

                        <div className="right-room-panel">
                            <section className="room-card actions-panel">
                                <h3>Actions</h3>
                                <div className="form-group">
                                    <label for="assignTo">Assign To</label>
                                    <div className="select-wrapper">
                                        <select id="assignTo">
                                            <option value="maintenance">Maintenance</option>
                                            <option value="housekeeping">Housekeeping</option>
                                            <option value="unassigned">Unassigned</option>
                                        </select>
                                        <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="updateStatus">Update Status</label>
                                    <div className="select-wrapper">
                                        <select id="updateStatus">
                                            <option value="inprogress">In Progress</option>
                                            <option value="new">New</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                        <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                                    </div>
                                </div>
                                {/* <div className="form-group">
                                    <label for="managerNotes">Manager's Notes</label>
                                    <textarea id="managerNotes" rows="4" placeholder="Add comments or actions taken..."></textarea>
                                </div> */}
                                <button className="save-changes-btn">Save Changes</button>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default ViewComplaint
