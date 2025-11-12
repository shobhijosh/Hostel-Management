import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/SideBar/Sidebar'
import Footer from '../../Components/Footer/Footer'
import { useNavigate } from 'react-router'
import { Mosaic } from 'react-loading-indicators'

const AddStudent = ({ fetchRooms }) => {
    // Manages the visibility of loader
    const [loading, setLoading] = useState(true)

    // Store the room number of the student
    const [roomNum, setRoomNum] = useState('')

    // Store the room type of roomNum
    const [roomType, setRoomType] = useState('')

    // Store all the values of the new student
    const [student, setStudent] = useState({ fullName: '', studentID: '', contactNum: null, course: '', roomNo: roomNum, roomType: '' })

    // Store all the room details
    const [roomDetails, setRoomDetails] = useState([])

    // Store the room number object ID
    const [roomId, setRoomId] = useState('')

    // useNavigate hook navigate to other urls
    const navigate = useNavigate()

    // Function to add the student into the database
    const addStudentToDb = async () => {
        setLoading(true)
        const studentDetails = JSON.stringify(student) //Converts Javascript object to JSON
        const response = await fetch('http://localhost:5000/api/students/addStudent', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'accept': '*/*'
            },
            body: studentDetails
        })
        const json = await response.json()
        if (json.success) {
            sessionStorage.setItem('students', JSON.stringify(json.data))
            if(roomId!='') await addFeeDetails()
        }
        return json
    }

    // Add fee details to the fee records
    const addFeeDetails = async () => {
        const feeBody = {
            totalAmount: roomDetails.find(room => room._id === roomId).price,
            amountPaid: 0,
            studentDetails:[JSON.parse(sessionStorage.getItem('students'))][0].find((std) => std.studentID === String(student.studentID))._id,
        }
        console.log(feeBody);
        
        const response = await fetch(`http://localhost:5000/api/fees/addFeeDetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
            body: JSON.stringify(feeBody),
        })
        const result = await response.json()
        if(result.success) sessionStorage.setItem('fees',JSON.stringify(result.data))
        console.log(result);
    }

    // Function to get the object id of room
    const getRoomId = async () => {
        setLoading(true)
        const body = JSON.stringify({ 'roomNum': roomNum })
        const response = await fetch('http://localhost:5000/api/findRoomAvailability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            body: body
        })
        const json = await response.json()
        if (json.success) {
            setRoomId(json.id)
        }
    }

    // Function to change the available room to allocated once the student is assigned a room
    const allocateRoom = async () => {
        const body = JSON.stringify({ 'status': 'Alloted' })
        const response = await fetch(`http://localhost:5000/api/rooms/editRoom/${roomId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            body: body
        })
        const json = await response.json()
        if (json.success) {
            sessionStorage.setItem('rooms', JSON.stringify(json.data))
        }
    }

    // Function to set the new values of the input
    const onChangeFunc = (e) => {
        let value = e.target.value;
        if (!isNaN(value)) {
            value = Number(value)
        }
        setStudent({ ...student, [e.target.name]: value })
    }

    // Function to set the new values
    const onRoomNumChange = (e) => {
        setRoomNum(e.target.value)
        setStudent({ ...student, roomNo: e.target.value })
        const selected = roomDetails.find(r => r.roomNum === e.target.value)
        if (selected) {
            setRoomType(selected.roomType)
            setStudent(prev => ({ ...prev, roomNo: e.target.value, roomType: selected.roomType }))
        }
    }

    // Submit button function
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        if (roomId != '') {
            await allocateRoom()
        }
        const json = await addStudentToDb()
        setLoading(false)
        navigate('/students',{state:{message:json.message,success:json.success}})
    }

    // Call the function to get room id
    useEffect(() => {
        const fetchData = async () => {
            await getRoomId()
            setLoading(false)
        }
        if (roomNum) fetchData()
    }, [roomNum])

    // Fetch the data from the db/session storage
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const storedData = sessionStorage.getItem('rooms')
            if (storedData) {
                setRoomDetails(JSON.parse(storedData))
            }
            else {
                const json = await fetchRooms()
                console.log(json);
                if (json.success) {
                    setRoomDetails(json.data)
                    // Store in session storage
                    sessionStorage.setItem('rooms', JSON.stringify(json.data))
                }
            }
        }
        // fetchData()
        Promise.all([fetchData()]).then(()=> setLoading(false)).catch((error)=>{
            console.log(error);
            setLoading(false)
        })
    }, [])

    // Scrolls the page to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [loading])

    return (
        <>
            <div className='mainContainer' style={loading ? { opacity: 0.3, pointerEvents: 'none', userSelect: 'none' } : {}}>
                <Sidebar />
                <main className="main-student-content">
                    <header className="add-student-header">
                        <h2>Add New Student</h2>
                        <p>Enter the details of the new student to add them to the hostel.</p>
                    </header>

                    <section className="add-student-form-container">
                        <form className="add-student-form">
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name of student</label>
                                <div className="input-with-icon">
                                    <input type="text" id="fullName" placeholder="Enter full name" name='fullName' value={student.fullName || ''} onChange={onChangeFunc} />
                                    <svg className="input-icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="studentID">Student ID</label>
                                <div className="input-with-icon">
                                    <input type="text" id="studentID" placeholder="Enter student ID" name='studentID' value={student.studentID || ''} onChange={onChangeFunc} />
                                    <svg className="input-icon" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14zm-5-8h-1V9h-1v2h-1v-2H8v2h-.5c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5H11v-3.5c0-.28-.22-.5-.5-.5z" /></svg>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="contactNo">Contact No.</label>
                                <div className="input-with-icon">
                                    <input type="text" id="contactNo" placeholder="Enter contact number" name='contactNum' value={student.contactNum || ''} onChange={onChangeFunc} />
                                    <svg className='input-icon' viewBox="0 0 24 24">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C10.74 21 3 13.26 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.75-.24 1.02l-2.2 2.2z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="course">Course</label>
                                <div className="input-with-icon">
                                    <input type="text" id="course" placeholder="Enter course name" name='course' value={student.course || ''} onChange={onChangeFunc} />
                                    <svg className="input-icon" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28l6.82 3.72zM17 15.99l-5 2.88-5-2.88V13.1l5 2.88 5-2.88v2.89z" /></svg>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="roomNo">Room No.</label>
                                <div className="select-wrapper">
                                    <select id="roomNo" onChange={onRoomNumChange} name='roomNum' value={roomNum}>
                                        <option value="">Select a room</option>
                                        {roomDetails.map((prop) => {
                                            return <option key={prop._id} value={prop.roomNum}>{prop.roomNum}</option>
                                        })}
                                    </select>
                                    <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="roomType">Room Type</label>
                                <input type='text' name='roomType' value={roomType || ''} onChange={onRoomNumChange} disabled />
                                {/* {roomDetails.map((prop) => {
                                    if (prop.roomNum === roomNum) {
                                        return <input key={prop._id} type="text" id="roomType" onChange={onChangeFunc} name="roomType" value={prop.roomType} placeholder={prop.roomType} disabled />
                                    }
                                    else {
                                        return <input key={prop._id} type="text" id="roomType" name="roomType" onChange={onChangeFunc} value='' placeholder='Room Type' disabled />
                                    }
                                })} */}
                            </div>

                            <div className="form-actions full-width">
                                <button type="button" className="cancel-btn" onClick={() => navigate('/students')}>Cancel</button>
                                <button type="submit" className="submit-btn" onClick={handleSubmit}>Add Student</button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
            <Footer />

            {/* Returns the loading component if the loading is true else returns an empty component */}
            {loading ? <Mosaic color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} size="large" text="Loading" textColor="#32cd32" /> : <React.Fragment />}
        </>
    )
}

export default AddStudent
