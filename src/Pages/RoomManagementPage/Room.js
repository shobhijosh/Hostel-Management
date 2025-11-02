import React, { useEffect } from 'react'
import './room.css'
import Sidebar from '../../Components/SideBar/Sidebar'
import Footer from '../../Components/Footer/Footer'
import TableComp from '../../Components/Table/TableComp'
import { Link, useNavigate } from 'react-router'

const Room = () => {
    // This is the sample data used, it will be replaced by original data later
    const tableHeading = ["Room no.", "Room type", "Status", "Actions"];
    const tableData = [
        {
            room_no: '101',
            room_type: 'Single',
            status: 'Alloted',
        },
        {
            room_no: '102',
            room_type: 'Double',
            status: 'Available',
        },
        {
            room_no: '103',
            room_type: 'Single',
            status: 'Available',
        },
        {
            room_no: '104',
            room_type: 'Double',
            status: 'Alloted',
        },
        {
            room_no: '105',
            room_type: 'Single',
            status: 'Available',
        },
        {
            room_no: '106',
            room_type: 'Double',
            status: 'Alloted',
        },
        {
            room_no: '106',
            room_type: 'Double',
            status: 'Alloted',
        },
        {
            room_no: '106',
            room_type: 'Double',
            status: 'Alloted',
        },

    ]

    // Scrolls the page to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className="mainContainer">
                <Sidebar />
                <div className="main-room-content">
                    <header className="main-header">
                        <h2>Room Allocation</h2>
                        <div className='add-room-btn'>
                            <Link to='/rooms/addRoom' className='btn-primary'>Add Room</Link>
                        </div>
                    </header>

                    <div>
                        <h3 style={{marginBottom:'10px'}}>Room Availability</h3>
                        <TableComp heading={tableHeading} data={tableData} row={TableRow} />
                    </div>
                </div>

                <div className="right-panel">
                    <div className="right-panel-card">
                        <h3>Room Status Check</h3>
                        <div className="search-room-box">
                            <input type="text" id="roomSearchInput" placeholder="Enter Room No." />
                        </div>
                        <div id="roomStatusDisplay" className="search-results room-status-not-found">
                            Enter a room number to check its status.
                        </div>
                    </div>

                    <div className="right-panel-card">
                        <h3>Assign Student</h3>
                        <div className="form-group select-wrapper">
                            <select>
                                <option>Select Room</option>
                                <option>101</option>
                                <option>102</option>
                                <option>103</option>
                                <option>104</option>
                                <option>105</option>
                            </select>
                            <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                        </div>
                        <div className="form-group select-wrapper">
                            <select>
                                <option>Select Student</option>
                                <option>Liam Harper</option>
                                <option>Olivia Bennett</option>
                                <option>John</option>
                                <option>Rohan</option>
                                <option>Steve</option>
                            </select>
                            <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                        </div>
                        <button className="action-button">Assign Student</button>
                    </div>

                    <div className="right-panel-card">
                        <h3>Transfer Student</h3>
                        <div className="form-group select-wrapper">
                            <select>
                                <option>Select Student</option>
                                <option>Noah Carter</option>
                                <option>Emma Davis</option>
                                <option>John</option>
                                <option>Thomas</option>
                                <option>Albert</option>
                            </select>
                            <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                        </div>
                        <div className="form-group select-wrapper">
                            <select>
                                <option>From Room</option>
                                <option>101</option>
                                <option>102</option>
                                <option>103</option>
                                <option>104</option>
                                <option>105</option>
                            </select>
                            <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                        </div>
                        <div className="form-group select-wrapper">
                            <select>
                                <option>To Room</option>
                                <option>201</option>
                                <option>202</option>
                                <option>203</option>
                                <option>204</option>
                                <option>205</option>
                            </select>
                            <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                        </div>
                        <button className="action-button">Transfer Student</button>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Room

const TableRow = (request) => {
    // useNavigate hook navigate to other urls
    const navigate = useNavigate()

    return (
        <>
            <td>{request.room_no}</td>
            <td>{request.room_type}</td>
            <td><span className={request.status === 'Alloted' ? 'status-badge status-available' : 'status-badge status-alloted'}>{request.status}</span></td>
            <td className="action-btns" style={{padding:'17px'}}>
                <button className="edit-btn" onClick={()=> navigate('/rooms/editRoom')}>Edit</button>
                <button className="vacate-btn">Vacate</button>
                <button className="delete-btn">Delete</button>
            </td>
        </>
    )
}