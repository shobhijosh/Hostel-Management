import React from 'react'
import './admin.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/SideBar/Sidebar'
import TableComp from '../../Components/Table/TableComp'

const Admin = () => {
    const tableHeading = ["NAME OF STUDENT", "STUDENT ID", "COURSE", "ROOM NO.", "ROOM TYPE", "ACTION"];
    const tableData = [
        {
            name: "John Doe",
            id: "24012345",
            course: "B.Tech(CS)",
            room_no: "405",
            room_type: "Single",
        },
        {
            name: "Rohan Verma",
            id: "24056789",
            course: "B.Com(Hons)",
            room_no: "210",
            room_type: "Double",
        },
        {
            name: "Priya",
            id: "24011223",
            course: "M.S.C(Physics)",
            room_no: "301",
            room_type: "Single",
        }
    ];
    return (
        <>
            {/* <Navbar /> */}
            <div className='mainContainer'>
                <Sidebar />
                <main className="main-dashboard">
                    <div className="dashboard-header">
                        <h1>Dashboard Overview</h1>
                    </div>

                    <div className="dashboard-cards">
                        <div className="card student-card">
                            <div className="card-info">
                                <h3>Total Students</h3>
                                <p>250</p>
                            </div>
                            <div className="card-icon icon-students">
                                <i className="fa-solid fa-users"></i>
                            </div>
                        </div>

                        <div className="card occupancy-card">
                            <div className="card-info">
                                <h3>Room Occupancy</h3>
                                <p>95%</p>
                            </div>
                            <div className="card-icon icon-occupancy">
                                <i className="fa-solid fa-chart-bar"></i>
                            </div>
                        </div>

                        <div className="card fees-card">
                            <div className="card-info">
                                <h3>Pending Fees</h3>
                                <p>$5,000</p>
                            </div>
                            <div className="card-icon icon-fees">
                                <i className="fa-solid fa-sack-dollar"></i>
                            </div>
                        </div>

                        <div className="card request-card">
                            <div className="card-info">
                                <h3>New Requests</h3>
                                <p>8</p>
                            </div>
                            <div className="card-icon icon-requests">
                                <i className="fa-solid fa-circle-exclamation"></i>
                            </div>
                        </div>

                    </div>

                    <div className="analytics-section">
                        <div className="analytics-header">
                            <h2>Hostel Analytics</h2>
                        </div>
                        <div className="analytics-grid">
                            <div className="chart-placeholder color-1">
                                Room Type Distribution Chart
                            </div>
                            <div className="chart-placeholder color-2">
                                Monthly Fee Collection Trend
                            </div>
                        </div>
                    </div>

                    <div className="table-section">
                        <div className="table-header">
                            <h2>Pending Room Requests</h2>
                        </div>
                        <TableComp heading={tableHeading} data={tableData} row={TableRow} />
                    </div>

                </main>
            </div>
            <Footer />
        </>
    )
}

export default Admin

const TableRow = (request) => {
    return (
        <>
            <td>{request.name}</td>
            <td>{request.id}</td>
            <td>{request.course}</td>
            <td>{request.room_no}</td>
            <td>{request.room_type}</td>
            <td className="action-btns">
                <button className="action-btn btn-review">Review</button>
                <button className="action-btn btn-approve">Approve</button>
                <button className="action-btn btn-decline">Decline</button>
            </td>
        </>
    )
}
