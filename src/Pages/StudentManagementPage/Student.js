import React, { useEffect, useState } from 'react'
import './student.css'
import Sidebar from '../../Components/SideBar/Sidebar'
import Footer from '../../Components/Footer/Footer'
import TableComp from '../../Components/Table/TableComp'
import { Link, replace, useLocation, useNavigate } from 'react-router'
import { Mosaic } from 'react-loading-indicators'
import { Alert } from '@mui/material'

const Student = ({ fetchStudents }) => {
    // Making alert visible and hidden
    const [alert, setAlert] = useState(false);

    // Manages the visibility of loader
    const [loading, setLoading] = useState(true)

    // Get the message from another component while navigating
    const location = useLocation()
    const { message, success } = location.state || {}

    // Store the data fetched from the database
    const [data, setData] = useState([])

    // Store the fee data fetched from the database
    const [feeData, setFeeData] = useState([])

    // Store the filtered data
    const [filteredData,setFilteredData] = useState([])

    // Store the input value of the search input field
    const [searchInput,setSearchInput] = useState('')

    // Heading of the student table
    const tableHeading = ["Name", "Student Id", "Contact No.", "Course", "Room no.", "Room type", "Action"];

    // Handle the search input field
    const handleSearch = (e)=>{
        let value = e.target.value
        setSearchInput(value)
        if(value !== ''){
            const newData = data.find((student)=> student.studentID === value || student.fullName === value || student.roomNo === value)
            if(newData) setFilteredData([newData])
            else setFilteredData([])
        }
    }

    // Fetch the data from the db/sessionStorage
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const storedData = sessionStorage.getItem('students')
            if (storedData) {
                setData(JSON.parse(storedData))
            }
            else {
                const response = await fetchStudents()
                setData(response.data)
                // Store in sessionStorage
                sessionStorage.setItem('students', JSON.stringify(response.data))
            }
        }
        const fetchFeeData = async () => {
            const storedData = sessionStorage.getItem('fees')
            if (storedData) {
                setFeeData(JSON.parse(storedData))
            }
            else {
                const response = await fetch('http://localhost:5000/api/getAllFees', { method: 'get' })
                const json = await response.json()
                setFeeData(json.data)
                // Store in sessionStorage
                sessionStorage.setItem('fees', JSON.stringify(json.data))
            }
        }
        // fetchData()
        // fetchFeeData()
        Promise.all([fetchData(), fetchFeeData()]).then(() => {
            if (message) setAlert(true)
            setLoading(false)
            setTimeout(() => {
                setAlert(false)
            }, 5000);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
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
                    <header className="main-header">
                        <h2>Students</h2>
                        <div className='add-student-btn'>
                            <Link to='/students/addStudent' className='btn-primary'>Add Student</Link>
                        </div>
                    </header>

                    <section className="filter-bar">
                        <div className="search-box full-width">
                            <svg className="search-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                            <input type="text" placeholder="Search students by name, ID, or room..." onChange={handleSearch} value={searchInput || ''}/>
                        </div>
                    </section>

                    <div>
                        <TableComp heading={tableHeading} data={filteredData.length!==0 ? filteredData:data} row={TableRow} />
                    </div>
                </main>
            </div>
            <Footer loading={loading} />

            {/* Alert component */}
            {alert && <Alert variant="filled" style={{ position: 'fixed', top: '10px', left: '50%' }} severity={success === true ? 'success' : 'error'}>{message}</Alert>}

            {/* Returns the loading component if the loading is true else returns an empty component */}
            {loading ? <Mosaic color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} size="large" text="Loading" textColor="#32cd32" /> : <React.Fragment />}
        </>
    )
}

export default Student

const TableRow = (request) => {
    // useNavigate hook navigate to other urls
    const navigate = useNavigate();

    // CLearing the fee record from the db
    const clearFeeRecord = async (objId) => {
        const students = JSON.parse(sessionStorage.getItem('students'))
        const fees = JSON.parse(sessionStorage.getItem('fees'))
        const getFeeID = fees.find((fee) => fee.studentDetails === objId)._id
        console.log(getFeeID);

        const response = await fetch(`http://localhost:5000/api/fees/deleteFee/${getFeeID}`, { method: 'DELETE' })
        const json = await response.json()
        console.log(json);

        if (json.success) sessionStorage.setItem('fees', JSON.stringify(json.data))
    }

    // Deleting the student from the database
    const deleteStudent = async (id) => {
        // Updating student record
        const response = await fetch(`http://localhost:5000/api/students/deleteStudent/${id}`, {
            method: 'DELETE',
        })
        const json = await response.json()
        sessionStorage.setItem('students', JSON.stringify(json.data))
        if (request.roomNo !== '') {
            const getRoomDetails = await fetch(`http://localhost:5000/api/findRoomAvailability`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify({ 'roomNum': request.roomNo })
            })
            const resp = await getRoomDetails.json()
            console.log(resp);
            if (resp.success) {
                // Update room records
                const makeRoomAvailable = await fetch(`http://localhost:5000/api/rooms/editRoom/${resp.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                    },
                    body: JSON.stringify({ 'status': 'Available' })
                })
                const result = await makeRoomAvailable.json()
                if (result.success) sessionStorage.setItem('rooms', JSON.stringify(result.data))
            }
            await clearFeeRecord(id)
        }
        navigate('/students', { state: { message: json.message, success: json.success } })
        window.location.reload()
    }

    return (
        <>
            <td>{request.fullName}</td>
            <td>{request.studentID}</td>
            <td>{request.contactNum}</td>
            <td>{request.course}</td>
            <td>{request.roomNo || 'Unassigned'}</td>
            <td>{request.roomType || 'Unassigned'}</td>
            <td className="action-btns">
                <button className="action-btn btn-edit" onClick={() => navigate(`/students/editStudent/${request._id}`)}>Edit</button>
                <button className="action-btn btn-delete" onClick={() => deleteStudent(request._id)}>Delete</button>
            </td>
        </>
    )
}