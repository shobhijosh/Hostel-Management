import React, { useEffect, useState } from 'react'
import './mess.css'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/SideBar/Sidebar'
import TableComp from '../../Components/Table/TableComp'

const Mess = () => {
    // stotes whether the modal is open or close
    const [isOpen, setIsOpen] = useState(false)

    const tableHeading = ['Day', 'Breakfast', 'Lunch', 'Dinner', 'Actions']
    const tableData = [
        {
            day: 'Monday',
            breakfast: 'Poha',
            lunch: 'Dal Fry, Rice, Roti',
            dinner: 'Paneer Butter Masala, Roti, Rice'
        },
        {
            day: 'Tuesday',
            breakfast: 'Upma',
            lunch: 'Chole Bhature',
            dinner: 'Aloo Gobi, Roti, Rice'
        },
        {
            day: 'Wednesday',
            breakfast: 'Idli Sambar',
            lunch: 'Rajma Chawal',
            dinner: 'Mix Veg, Roti, Rice'
        },
        {
            day: 'Thursday',
            breakfast: 'Dosa',
            lunch: 'Kadhi Chawal',
            dinner: 'Bhindi Fry, Roti, Rice'
        },
        {
            day: 'Friday',
            breakfast: 'Paratha',
            lunch: 'Dal Makhani, Rice, Roti',
            dinner: 'Chana Masala, Roti, Rice'
        },
        {
            day: 'Saturday',
            breakfast: 'Sandwich',
            lunch: 'Veg Biryani, Raita',
            dinner: 'Dum Aloo, Roti, Rice'
        },
        {
            day: 'Sunday',
            breakfast: 'Puri Sabji',
            lunch: 'Pav Bhaji',
            dinner: 'Special Thali'
        },
    ]

    // Scrolls the page to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className='mainContainer'>
                <Sidebar />
                <main className="main-mess-content">
                    <header className="mess-menu-header">
                        <h2>Mess Menu Management</h2>
                        <p>Manage the weekly hostel mess menu.</p>
                    </header>

                    <div>
                        <TableComp heading={tableHeading} data={tableData} row={TableRow} />
                    </div>

                    {/* <section className="mess-menu-table-container">
                        <table className="mess-menu-table">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Breakfast</th>
                                    <th>Lunch</th>
                                    <th>Dinner</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Monday</td>
                                    <td>Poha</td>
                                    <td>Dal Fry, Rice, Roti</td>
                                    <td>Paneer Butter Masala, Roti, Rice</td>
                                    <td><button className="edit-mess-btn" onclick="alert('Edit Monday\'s menu')">Edit</button></td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td>Upma</td>
                                    <td>Chole Bhature</td>
                                    <td>Aloo Gobi, Roti, Rice</td>
                                    <td><button className="edit-mess-btn" onclick="alert('Edit Tuesday\'s menu')">Edit</button></td>
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    <td>Idli Sambar</td>
                                    <td>Rajma Chawal</td>
                                    <td>Mix Veg, Roti, Rice</td>
                                    <td><button className="edit-mess-btn" onclick="alert('Edit Wednesday\'s menu')">Edit</button></td>
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    <td>Dosa</td>
                                    <td>Kadhi Chawal</td>
                                    <td>Bhindi Fry, Roti, Rice</td>
                                    <td><button className="edit-mess-btn" onclick="alert('Edit Thursday\'s menu')">Edit</button></td>
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    <td>Paratha</td>
                                    <td>Dal Makhani, Rice, Roti</td>
                                    <td>Chana Masala, Roti, Rice</td>
                                    <td><button className="edit-mess-btn" onclick="alert('Edit Friday\'s menu')">Edit</button></td>
                                </tr>
                                <tr>
                                    <td>Saturday</td>
                                    <td>Sandwich</td>
                                    <td>Veg Biryani, Raita</td>
                                    <td>Dum Aloo, Roti, Rice</td>
                                    <td><button className="edit-mess-btn" onclick="alert('Edit Saturday\'s menu')">Edit</button></td>
                                </tr>
                                <tr>
                                    <td>Sunday</td>
                                    <td>Puri Sabji</td>
                                    <td>Pav Bhaji</td>
                                    <td>Special Thali</td>
                                    <td><button className="edit-mess-btn" onclick="alert('Edit Sunday\'s menu')">Edit</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </section> */}
                </main>
            </div>
            <Footer />

            {/* Menu edit modal */}
            <div id="editMenuModal" className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 id="modalTitle">Edit Menu for [Day]</h3>
                        <button className="close-btn">&times;</button>
                    </div>

                    <form id="menuForm" className="modal-form">
                        <div className="form-group">
                            <label htmlFor="modalDay">Day</label>
                            <input type="text" id="modalDay" disabled />
                            <input type="hidden" id="originalDay" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="modalBreakfast">Breakfast</label>
                            <input type="text" id="modalBreakfast" placeholder="Enter new breakfast menu" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="modalLunch">Lunch</label>
                            <input type="text" id="modalLunch" placeholder="Enter new lunch menu" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="modalDinner">Dinner</label>
                            <input type="text" id="modalDinner" placeholder="Enter new dinner menu" />
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="cancel-modal-btn">Cancel</button>
                            <button type="button" className="submit-modal-btn">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Mess

const TableRow = (request) => {
    return (
        <>
            <td>{request.day}</td>
            <td>{request.breakfast}</td>
            <td>{request.lunch}</td>
            <td>{request.dinner}</td>
            <td className='action-btns'>
                <button className="action-btn edit-btn">Edit</button>
            </td>
        </>
    )
}