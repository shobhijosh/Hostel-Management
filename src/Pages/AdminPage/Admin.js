import React, { useEffect, useRef, useState } from 'react'
import './admin.css'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/SideBar/Sidebar'
import TableComp from '../../Components/Table/TableComp'
import { Mosaic } from 'react-loading-indicators'
import Chart from 'chart.js/auto'

const Admin = ({ fetchRooms, fetchStudents }) => {
    // Manages the visibility of loader
    const [loading, setLoading] = useState(true)

    // Reference to the chart canvas
    const chartref = useRef(null)
    const chart1ref = useRef(null)

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

    // Store the room details of the student
    const [studentDetails, setStudentDetails] = useState([])

    // Store the student details of the student
    const [roomDetails, setRoomDetails] = useState([])

    // Store the fee details of the student
    const [feeDetails, setFeeDetails] = useState([])

    // Fetch the data from the db/sessionStorage
    useEffect(() => {
        setLoading(true)
        const fetchStudentData = async () => {
            const storedData = sessionStorage.getItem('students')
            if (storedData) {
                setStudentDetails(JSON.parse(storedData))
            }
            else {
                const response = await fetchStudents()
                setStudentDetails(response.data)
                // Store in sessionStorage
                sessionStorage.setItem('students', JSON.stringify(response.data))
            }
        }
        const fetchRoomData = async () => {
            const storedData = sessionStorage.getItem('rooms')
            if (storedData) {
                setRoomDetails(JSON.parse(storedData))
            }
            else {
                const response = await fetchRooms()
                setRoomDetails(response.data)
                // Store in sessionStorage
                sessionStorage.setItem('rooms', JSON.stringify(response.data))
            }
        }
        const fetchFeeData = async () => {
            const storedData = sessionStorage.getItem('fees')
            if (storedData) {
                setFeeDetails(JSON.parse(storedData))
            }
            else {
                const response = await fetch('http://localhost:5000/api/getAllFees', {
                    method: 'GET',
                })
                const json = await response.json()
                setFeeDetails(json.data)
                // Store in sessionStorage
                sessionStorage.setItem('fees', JSON.stringify(json.data))
            }
        }

        // fetchStudentData()
        // fetchRoomData()
        // fetchFeeData()
        Promise.all([fetchStudentData(),fetchRoomData(),fetchFeeData()]).then(()=>{
            setLoading(false)
        }).catch((error)=>{
            console.log(error);
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (roomDetails.length > 0) {
            // Bar chart : Revenue from alloted rooms
            const ctx = chartref.current.getContext('2d')
            new Chart(
                ctx,
                {
                    type: 'bar',
                    data: {
                        labels: roomDetails.filter((room) => room.status === 'Alloted').map((room) => room.roomNum),
                        datasets: [{
                            label: 'Revenue from alloted rooms',
                            data: roomDetails.filter((room) => room.status === 'Alloted').map((room) => room.price),
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                    }
                },
            )

            // Pie chart : Room Types popularity
            const roomTypeCounts = roomDetails
                .filter((room) => room.status === 'Alloted')
                .reduce((acc, room) => {
                    acc[room.roomType] = (acc[room.roomType] || 0) + 1;
                    return acc;
                }, {});
            const roomTypes = Object.keys(roomTypeCounts)
            const roomTypeValues = roomTypes.map((roomType) => roomTypeCounts[roomType])
            const ctx1 = chart1ref.current.getContext('2d')
            new Chart(
                ctx1, {
                type: 'pie',
                data: {
                    labels: roomTypes,
                    datasets: [{
                        label: 'Room Types Popularity',
                        data: roomTypeValues
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins:{
                        title:{
                            display:true,
                            text:'Room Types Popularity'
                        },
                        legend:{
                            position:'bottom'
                        }
                    }
                }
            }
            )
        }
    }, [roomDetails])

    // Scrolls the page to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [loading])

    return (
        <>

            <div className='mainContainer' style={loading ? { opacity: 0.3, pointerEvents: 'none', userSelect: 'none' } : {}}>
                <Sidebar />
                <main className="main-dashboard">
                    <div className="dashboard-header">
                        <h1>Dashboard Overview</h1>
                    </div>

                    <div className="dashboard-cards">
                        <div className="card student-card">
                            <div className="card-info">
                                <h3>Total Students</h3>
                                <p>{studentDetails.length}</p>
                            </div>
                            <div className="card-icon icon-students">
                                <i className="fa-solid fa-users"></i>
                            </div>
                        </div>

                        <div className="card occupancy-card">
                            <div className="card-info">
                                <h3>Room Occupancy</h3>
                                <p>{Math.round((roomDetails.filter((room) => room.status === 'Alloted').length) / (roomDetails.length) * 100)}%</p>
                            </div>
                            <div className="card-icon icon-occupancy">
                                <i className="fa-solid fa-chart-bar"></i>
                            </div>
                        </div>

                        <div className="card fees-card">
                            <div className="card-info">
                                <h3>Pending Fees</h3>
                                <p>₹{feeDetails.reduce((acc, data) => acc + (data.totalAmount - data.amountPaid), 0)}</p>
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
                            <div className="chart-placeholder">
                                <canvas id='chart1' ref={chartref}></canvas>
                            </div>
                            <div className="chart-placeholder">
                                <canvas ref={chart1ref} id='chart2'></canvas>
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

            {/* Returns the loading component if the loading is true else returns an empty component */}
            {loading ? <Mosaic color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} size="large" text="Loading" textColor="#32cd32" /> : <React.Fragment />}
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
