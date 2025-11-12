import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/SideBar/Sidebar'
import Footer from '../../Components/Footer/Footer'
import './fees.css'
import TableComp from '../../Components/Table/TableComp'
import { Mosaic } from 'react-loading-indicators'

const Fees = ({fetchRooms,fetchStudents}) => {
    // Manages the visibility of loader
    const [loading, setLoading] = useState(true)

    // Store all the student records
    const [studentData, setStudentData] = useState([])

    // Store all the room details
    const [roomDetails, setRoomDetails] = useState([])

    // Store all the fee records of student
    const [feeDetails, setFeeDetails] = useState([])

    // Store the room Num of all the students
    const [roomNum, setRoomNum] = useState([])

    // Store the room Num of all the students
    const [studentName, setStudentName] = useState([])

    // Heading of the fees table
    const tableHeading = ['Student Name', 'Room Number', 'Last Payment Date', 'Amount Paid', 'Remaining Amount', 'Status']

    // Get the roomNumber and student Name
    const getNameAndRoomNum = () => {
        const studentRecords = JSON.parse(sessionStorage.getItem('students'))
        const feeRecords = JSON.parse(sessionStorage.getItem('fees'))
        const getStudent = studentRecords.filter((student)=> feeRecords.find((fee)=> fee.studentDetails === student._id))
        setStudentName(getStudent.map((student)=>student.fullName))
        setRoomNum(getStudent.map((student)=> student.roomNo));
    }

    // Fetch the data from the db/sessionStorage
    useEffect(() => {
        const fetchStudentData = async () => {
            setLoading(true)
            const storedData = sessionStorage.getItem('students')
            if (storedData) {
                setStudentData(JSON.parse(storedData))
            }
            else {
                const response = await fetchStudents()
                setStudentData(response.data)
                // Store in sessionStorage
                sessionStorage.setItem('students', JSON.stringify(response.data))
            }
        }
        const fetchRoomData = async () => {
            setLoading(true)
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
            setLoading(true)
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

        // fetchFeeData()
        // fetchStudentData()
        // fetchRoomData()
        Promise.all([fetchFeeData(),fetchStudentData(),fetchRoomData()]).then(()=>{
            getNameAndRoomNum()
            setLoading(false)
        }).catch((error)=>{
            console.log(error)
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
                <main className="main-fees-content">
                    <header className="fees-header">
                        <h2>Fees Management</h2>
                        <p>Manage the hostel fees of the student efficiently.</p>
                    </header>

                    <section className="fee-overview-cards">
                        <div className="card overview-card">
                            <span className="label">Total Fees Collected</span>
                            <span className="value">₹{feeDetails.reduce((acc,data)=> acc + data.amountPaid,0)}</span>
                        </div>
                        <div className="card overview-card">
                            <span className="label">Outstanding Fees</span>
                            <span className="value">₹{feeDetails.reduce((acc,data)=> acc + (data.totalAmount - data.amountPaid),0)}</span>
                        </div>
                    </section>

                    <section className="recent-payments">
                        <h3>Fee Payments</h3>
                        <TableComp heading={tableHeading} data={feeDetails} row={Tablerow} studentName={studentName} roomNum={roomNum} />
                    </section>
                </main>
            </div>
            <Footer />

            {/* Returns the loading component if the loading is true else returns an empty component */}
            {loading ? <Mosaic color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} size="large" text="Loading" textColor="#32cd32" /> : <React.Fragment />}
        </>
    )
}

export default Fees

const Tablerow = (request,studentName,roomNumber) => {
    return (
        <>
            <td>{studentName || '----'}</td>
            <td>{roomNumber || '----'}</td>
            <td>{request.lastPaymentDate ? new Date(request.lastPaymentDate).toISOString().split('T')[0] : '----'}</td>
            <td>{request.amountPaid}</td>
            <td>{request.totalAmount - request.amountPaid}</td>
            <td>
                <span className={request.paymentStatus === 'Paid' ? 'status-badge paid' : 'status-badge pending'}>{request.paymentStatus}</span>
            </td>
        </>
    )
}
