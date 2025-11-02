import { useNavigate } from 'react-router'
import Sidebar from '../../Components/SideBar/Sidebar';
import Footer from '../../Components/Footer/Footer';
import { useEffect } from 'react'

const EditStudent = () => {
    // useNavigate hook navigate to other urls
    const navigate = useNavigate();

    // Scrolls the page to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className='mainContainer'>
                <Sidebar />
                <main className="main-student-content">
                    <header className="add-student-header">
                        <h2>Edit Student Details</h2>
                        <p>Edit the details of student which are wrong or incorrect.</p>
                    </header>

                    <section className="add-student-form-container">
                        <form className="add-student-form">
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name of student</label>
                                <div className="input-with-icon">
                                    <input type="text" id="fullName" placeholder="Enter full name" />
                                    <svg className="input-icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="studentID">Student ID</label>
                                <div className="input-with-icon">
                                    <input type="text" id="studentID" placeholder="Enter student ID" />
                                    <svg className="input-icon" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14zm-5-8h-1V9h-1v2h-1v-2H8v2h-.5c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5H11v-3.5c0-.28-.22-.5-.5-.5z" /></svg>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="contactNo">Contact No.</label>
                                <div className="input-with-icon">
                                    <input type="text" id="contactNo" placeholder="Enter contact number" />
                                    <svg className='input-icon' viewBox="0 0 24 24">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C10.74 21 3 13.26 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.75-.24 1.02l-2.2 2.2z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="course">Course</label>
                                <div className="input-with-icon">
                                    <input type="text" id="course" placeholder="Enter course name" />
                                    <svg className="input-icon" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28l6.82 3.72zM17 15.99l-5 2.88-5-2.88V13.1l5 2.88 5-2.88v2.89z" /></svg>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="roomNo">Room No.</label>
                                <div className="select-wrapper">
                                    <select id="roomNo">
                                        <option value="">Select a room</option>
                                        <option value="101">101</option>
                                        <option value="102">102</option>
                                        <option value="103">103</option>
                                        <option value="104">104</option>
                                        <option value="201">201</option>
                                        <option value="201">203</option>
                                        <option value="201">301</option>
                                        <option value="201">501</option>
                                    </select>
                                    <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="roomType">Room Type</label>
                                <input type="text" id="roomType" placeholder="Room Type" disabled />
                            </div>

                            <div className="form-actions full-width">
                                <button type="button" className="cancel-btn" onClick={() => navigate('/students')}>Cancel</button>
                                <button type="submit" className="submit-btn">Edit Student</button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default EditStudent
