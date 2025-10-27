import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import './room.css'
import Sidebar from '../../Components/SideBar/Sidebar'
import Footer from '../../Components/Footer/Footer'

const EditRoom = () => {
    // useNavigate hook navigate to other urls
    const navigate = useNavigate()

    // Scrolls the page to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className="mainContainer">
                <Sidebar />
                <main className="room-content">
                    <header className="add-room-header">
                        <h2>Edit Room Details</h2>
                        <p>Edit the details of room which are wrong or incorrect.</p>
                    </header>

                    <section className="add-room-form-container">
                        <form className="add-room-form">
                            <div className="form-section-title">Room Details</div>

                            <div className="form-group grid-2-col">
                                <label for="roomNo">Room No.</label>
                                <div className="input-prefix-wrapper">
                                    <input type="text" id="roomNo" placeholder="e.g., 101" />
                                    <span className="prefix">#</span>
                                </div>
                            </div>

                            <div className="form-group grid-2-col">
                                <label for="roomType">Room Type</label>
                                <div className="select-wrapper">
                                    <select id="roomType">
                                        <option value="">Select room type</option>
                                        <option value="single">Single</option>
                                        <option value="double">Double</option>
                                        <option value="triple">Triple</option>
                                    </select>
                                    <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label for="description">Description</label>
                                <textarea id="description" rows="4" placeholder="Provide a detailed description of the room amenities and features."></textarea>
                            </div>

                            <div className="form-group grid-2-col">
                                <label for="price">Price (per month)</label>
                                <div className="input-prefix-wrapper">
                                    <span className="prefix">$</span>
                                    <input type="text" id="price" placeholder="e.g., 500" />
                                </div>
                            </div>

                            <div className="form-group grid-2-col">
                                <label for="capacity">Capacity</label>
                                <div className="input-suffix-wrapper">
                                    <input type="text" id="capacity" placeholder="e.g., 2" />
                                    <svg className="suffix-icon" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8 0c-.29 0-.62.02-.97.05C14.15 14.17 12 15.34 12 18v2h12v-2c0-2.66-5.33-4-8-4z" /></svg>
                                </div>
                            </div>

                            <div className="form-section-title full-width media-upload-heading">Media Upload</div>

                            <div className="form-group full-width dropzone-container">
                                <div className="dropzone">
                                    <svg className="upload-icon" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg>
                                    <button type="button" className="btn-primary" style={{ marginBottom: '15px', cursor: "pointer" }}>Upload Images</button>
                                    <p>Or drag and drop images here</p>
                                    <p className="upload-info">Maximum 5 pictures (5MB max)</p>
                                </div>
                            </div>

                            <div className="form-actions full-width">
                                <button type="button" className="cancel-btn" onClick={() => navigate('/rooms')}>Cancel</button>
                                <button type="submit" className="submit-btn">Add Room</button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default EditRoom
