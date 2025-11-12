import React, { useEffect, useState } from 'react'
import './room.css'
import Sidebar from '../../Components/SideBar/Sidebar'
import Footer from '../../Components/Footer/Footer'
import TableComp from '../../Components/Table/TableComp'
import { Link, useLocation, useNavigate } from 'react-router'
import { Mosaic } from 'react-loading-indicators'
import { Alert } from '@mui/material'

const Room = ({ fetchRooms, fetchStudents }) => {
    const navigate = useNavigate()

    // Making alert visible and hidden
    const [alert, setAlert] = useState(false);

    // Get the message from another component while navigating
    const location = useLocation()
    const { message, success } = location.state || {}

    // Manages the visibility of loader
    const [loading, setLoading] = useState(true)

    // Store the input value
    const [searchRoomNum, setSearchRoomNum] = useState('')

    // Store the status of the room
    const [roomStatus, setRoomStatus] = useState('Enter correct room number to check its status')

    // Store the data fetched from the database
    const [data, setData] = useState([])

    // Heading of the rooms table
    const tableHeading = ["Room no.", "Room type", "Status", "Actions"];

    // Store the details of student
    const [studentDetails, setStudentDetails] = useState([])

    // Store the input details of room to be assigned
    const [assignRoom, setAssignRoom] = useState('')

    // Store the input details of student whom the room is to be assigned
    const [assignStudent, setAssignStudent] = useState('')


    // Fetch the data from the db/session storage
    useEffect(() => {
        const fetchRoomData = async () => {
            setLoading(true)
            const storedData = sessionStorage.getItem('rooms')
            if (storedData) {
                setData(JSON.parse(storedData))
            }
            else {
                const response = await fetchRooms()
                setData(response.data)
                // Store in session storage
                sessionStorage.setItem('rooms', JSON.stringify(response.data))
            }
        }
        const fetchStudentData = async () => {
            setLoading(true)
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
        // fetchData()
        Promise.all([fetchRoomData(),fetchStudentData()]).then(()=>{
            if (message) setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 5000);
            setLoading(false)
        }).catch((error)=>{
            console.log(error);
            setLoading(false)
        })
    }, [])

    // Fetch the data from the db/sessionStorage
    // useEffect(() => {
        
    //     fetchData()
    //     setLoading(false)
    // }, [])

    // Check the status of room whther it is available or not
    const checkRoomStatus = (value) => {
        const response = data.find(r => r.roomNum === value)
        if (response) setRoomStatus(response.status)
        else setRoomStatus('Enter correct room number to check its status')
        // console.log(response);
    }

    // Handling the input value
    const handleChange = (e) => {
        const roomNum = e.target.value
        setSearchRoomNum(roomNum)
        checkRoomStatus(e.target.value)
    }

    // Assign room to student
    const assignRoomToStudent = async () => {
        setLoading(true)
        if (assignStudent != '' && assignRoom != '') {
            const roomType = data.find((room) => room.roomNum === assignRoom).roomType
            const roomObjectId = data.find((room) => room.roomNum === assignRoom)._id
            const studentObjectId = studentDetails.find((student) => student.fullName === assignStudent)._id

            // Edit the room details
            const roomEdit = await fetch(`http://localhost:5000/api/rooms/editRoom/${roomObjectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
                body: JSON.stringify({ status: 'Alloted' })
            })
            const response = await roomEdit.json()
            if (response.success) sessionStorage.setItem('rooms', JSON.stringify(response.data))

            // Edit the student details
            const studentEdit = await fetch(`http://localhost:5000/api/students/editStudent/${studentObjectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
                body: JSON.stringify({ roomNo: assignRoom, roomType: roomType })
            })
            const result = await studentEdit.json()
            if (result.success) sessionStorage.setItem('students', JSON.stringify(result.data))

            // Add the fee record
            const feeBody = {
                totalAmount: data.find((room) => room._id === roomObjectId).price,
                amountPaid: 0,
                studentDetails: studentObjectId
            }
            const feeResponse = await fetch(`http://localhost:5000/api/fees/addFeeDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify(feeBody),
            })
            const fee_result = await feeResponse.json()
            if(fee_result.success) sessionStorage.setItem('fees',JSON.stringify(fee_result.data))

            setLoading(false)
            navigate('/rooms', { state: { message: response.message, success: response.success } })
        }
        window.location.reload()
    }

    // Scrolls the page to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [loading])

    return (
        <>
            <div className="mainContainer" style={loading ? { opacity: 0.3, pointerEvents: 'none', userSelect: 'none' } : {}}>
                <Sidebar />
                <div className="main-room-content">
                    <header className="main-header">
                        <h2>Room Allocation</h2>
                        <div className='add-room-btn'>
                            <Link to='/rooms/addRoom' className='btn-primary'>Add Room</Link>
                        </div>
                    </header>

                    <div>
                        <h3 style={{ marginBottom: '10px' }}>Room Availability</h3>
                        <TableComp heading={tableHeading} data={data} row={TableRow} />
                    </div>
                </div>

                <div className="right-panel">
                    <div className="right-panel-card">
                        <h3>Room Status Check</h3>
                        <div className="search-room-box">
                            <input type="text" id="roomSearchInput" placeholder="Enter Room No." onChange={handleChange} value={searchRoomNum || ''} />
                        </div>
                        <div id="roomStatusDisplay" className="search-results room-status-not-found" style={roomStatus === 'Alloted' ? { backgroundColor: '#ffc4c4' } : roomStatus === 'Available' ? { backgroundColor: '#bcfdbc' } :
                            {}}>
                            <p style={roomStatus === 'Alloted' ? { color: '#dc3545' } : roomStatus === 'Available' ? { color: '#28a745' } : { color: '#000000' }}>{roomStatus}</p>
                        </div>
                    </div>

                    <div className="right-panel-card">
                        <h3>Assign Student</h3>
                        <div className="form-group select-wrapper">
                            <select value={assignRoom || ''} onChange={(e) => setAssignRoom(e.target.value)}>
                                <option value=''>Select Room</option>
                                {data.filter((room) => room.status === 'Available').map((prop) => {
                                    return <option value={prop.roomNum} key={prop._id}>{prop.roomNum}</option>
                                })}
                            </select>
                            <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                        </div>
                        <div className="form-group select-wrapper">
                            <select value={assignStudent || ''} onChange={(e) => setAssignStudent(e.target.value)}>
                                <option value=''>Select Student</option>
                                {studentDetails.filter((student) => student.roomNo === '').map((prop) => {
                                    return <option value={prop.fullName} key={prop._id}>{prop.fullName}</option>
                                })}
                            </select>
                            <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                        </div>
                        <button className="action-button" onClick={() => assignRoomToStudent()}>Assign Student</button>
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

            {/* Alert component */}
            {alert && <Alert variant="filled" style={{ position: 'fixed', top: '10px', left: '50%' }} severity={success === true ? 'success' : 'error'}>{message}</Alert>}

            {/* Returns the loading component if the loading is true else returns an empty component */}
            {loading ? <Mosaic color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} size="large" text="Loading" textColor="#32cd32" /> : <React.Fragment />}
        </>
    )
}

export default Room

const TableRow = (request) => {
    // useNavigate hook navigate to other urls
    const navigate = useNavigate()

    const getStudentIdAndUpdate = async () => {
        if (request.roomNum) {
            // Check If the any student is assigned this particular room
            const resp = await fetch(`http://localhost:5000/api/getStudent/${request.roomNum}`, {
                method: 'GET'
            })
            const result = await resp.json()
            // If student is assigned, make it unassigned
            if (result.success) {
                const assign = await fetch(`http://localhost:5000/api/students/editStudent/${result.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                    },
                    body: JSON.stringify({ roomNo: '', roomType: '' })
                })
                const result1 = await assign.json()
                if (result1) sessionStorage.setItem('students', JSON.stringify(result1.data))
                return result.id
            }
        }
    }

    // Clear the fee record
    const clearFeeRecord = async (objId) => {
        const students = JSON.parse(sessionStorage.getItem('students'))
        const fees = JSON.parse(sessionStorage.getItem('fees'))
        const getFeeID = fees.find((fee)=>fee.studentDetails === objId)._id
        console.log(getFeeID);

        const response = await fetch(`http://localhost:5000/api/fees/deleteFee/${getFeeID}`, { method: 'DELETE' })
        const json = await response.json()
        console.log(json);
        if (json.success) sessionStorage.setItem('fees', JSON.stringify(json.data))
    }

    // Handle the delete button function
    const handleDelete = async () => {
        try {
            const objId = await getStudentIdAndUpdate()
            // Deleting the room
            const response = await fetch(`http://localhost:5000/api/rooms/deleteRoom/${request.roomNum}`, {
                method: 'DELETE',
            })
            const json = await response.json()
            if (json.success) {
                sessionStorage.setItem('rooms', JSON.stringify(json.newData))
                await clearFeeRecord(objId)
            }
            console.log(json);
            navigate('/rooms', { state: { message: json.message, success: json.success } })
            window.location.reload()
        }
        catch (error) {
            console.log(error.message);
        }
    }

    // Handle the vacate button function
    const handleVacate = async () => {
        try {
            if (request.status === 'Alloted') {
                const response = await fetch(`http://localhost:5000/api/rooms/editRoom/${request._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                    },
                    body: JSON.stringify({ status: 'Available' })
                })
                const json = await response.json()
                if (json.success) {
                    sessionStorage.setItem('rooms', JSON.stringify(json.data))
                    const objId = await getStudentIdAndUpdate()
                    await clearFeeRecord(objId)
                }
                navigate('/rooms', { state: { message: json.message, success: json.success } })
            }
            window.location.reload()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <td>{request.roomNum}</td>
            <td>{request.roomType}</td>
            <td><span className={request.status === 'Alloted' ? 'status-badge status-alloted' : 'status-badge status-available'}>{request.status}</span></td>
            <td className="action-btns" style={{ padding: '17px' }}>
                <button className="edit-btn" onClick={() => navigate(`/rooms/editRoom/${request._id}`)}>Edit</button>
                <button className="vacate-btn" onClick={() => handleVacate()}>Vacate</button>
                <button className="delete-btn" onClick={() => handleDelete()}>Delete</button>
            </td>
        </>
    )
}


/*const tableData = [
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

    ]*/