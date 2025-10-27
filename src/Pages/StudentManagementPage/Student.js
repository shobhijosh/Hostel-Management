import React, { useEffect } from 'react'
import './student.css'
import Navbar from '../../Components/Navbar/Navbar'
import Sidebar from '../../Components/SideBar/Sidebar'
import Footer from '../../Components/Footer/Footer'
import TableComp from '../../Components/Table/TableComp'
import { Link, useNavigate } from 'react-router'

const Student = () => {
    // This is the sample data used, it will be replaced by original data later
    const tableHeading = ["Name", "Student Id", "Course", "Room no.", "Room type", "Action"];
    const tableData = [
        {
            name: 'Liam Harper',
            id: 'S001',
            course: 'Computer Science',
            room_no: '101',
            room_type: 'Single'
        },
        {
            name: 'Olivia Bennett',
            id: 'S002',
            course: 'Electrical Engineering',
            room_no: '102',
            room_type: 'Double'
        },
        {
            name: 'Noah Carter',
            id: 'S003',
            course: 'Mechanical Engineering',
            room_no: '103',
            room_type: 'Single'
        },
        {
            name: 'Emma Davis',
            id: 'S004',
            course: 'Business Administration',
            room_no: '104',
            room_type: 'Double'
        },
        {
            name: 'Jackson Evans',
            id: 'S005',
            course: 'Applied Physics',
            room_no: '105',
            room_type: 'Single'
        },
        {
            name: 'Ava Foster',
            id: 'S005',
            course: 'Civil Engineering',
            room_no: '106',
            room_type: 'Double'
        },

    ]

    // Scrolls the page to top when the component mounts
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            {/* <Navbar /> */}
            <div className='mainContainer'>
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
                            <input type="text" placeholder="Search students by name, ID, or room..." />
                        </div>
                    </section>

                    <div>
                        <TableComp heading={tableHeading} data={tableData} row={TableRow} />
                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Student

const TableRow = (request) => {
    // useNavigate hook navigate to other urls
    const navigate = useNavigate();

    return (
        <>
            <td>{request.name}</td>
            <td>{request.id}</td>
            <td>{request.course}</td>
            <td>{request.room_no}</td>
            <td>{request.room_type}</td>
            <td className="action-btns">
                <button className="action-btn btn-edit" onClick={()=> navigate('/students/editStudent')}>Edit</button>
                <button className="action-btn btn-delete">Delete</button>
            </td>
        </>
    )
}