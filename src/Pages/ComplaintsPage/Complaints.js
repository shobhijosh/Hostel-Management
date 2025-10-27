import React, { useEffect } from 'react'
import './complaint.css'
import Sidebar from '../../Components/SideBar/Sidebar'
import Footer from '../../Components/Footer/Footer'
import TableComp from '../../Components/Table/TableComp'
import { useNavigate } from 'react-router'

const Complaints = () => {
    // Scrolls the page to top when the component mounts
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    const tableHeading = ['Complaint ID','Student','Room','Issue','Status','Assigned To','Actions']
    const tableData = [
        {
            complaint_id:'#12345',
            student: 'Ethan Carter',
            room:'Room 201',
            issue:'Leaky faucet',
            assigned_to: 'Unassigned',
            complaint_type: 'New',
        },
        {
            complaint_id:'#12346',
            student: 'Olivia Bennett',
            room:'Room 305',
            issue:'Broken window',
            assigned_to: 'Liam Harper',
            complaint_type: 'In Progress',
        },
        {
            complaint_id:'#12347',
            student: 'Noah Thompson',
            room:'Room 102',
            issue:'Heating issue',
            assigned_to: 'Sophia Clark',
            complaint_type: 'Resolved',
        },
        {
            complaint_id:'#12348',
            student: 'Ava Rodriguez',
            room:'Room 410',
            issue:'Noise complaint',
            assigned_to: 'Unassigned',
            complaint_type: 'New',
        },
        {
            complaint_id:'#12349',
            student: 'Lucas Foster',
            room:'Room 215',
            issue:'Internet outage',
            assigned_to: 'Liam Harper',
            complaint_type: 'In Progress',
        },
    ]
    return (
        <>
            <div className='mainContainer'>
                <Sidebar />
                <main className="main-complaint-content">
                    <header className="room-header">
                        <h2>Track Complaints</h2>
                        <p>Track and resolve student complaints.</p>
                    </header>
                    <div>
                        <TableComp heading={tableHeading} data={tableData} row={TableRow} />
                    </div>

                    {/* <section className="complaints-table-container">
                        <table className="complaints-table">
                            <tbody>
                                <tr>
                                    <td>#12345</td>
                                    <td>Ethan Carter</td>
                                    <td>Room 201</td>
                                    <td>Leaky faucet</td>
                                    <td><span className="status-badge status-new">New</span></td>
                                    <td>Unassigned</td>
                                    <td><button className="view-btn" onclick="alert('View Complaint #12345')">View</button></td>
                                </tr>
                                <tr>
                                    <td>#12346</td>
                                    <td>Olivia Bennett</td>
                                    <td>Room 305</td>
                                    <td>Broken window</td>
                                    <td><span className="status-badge status-inprogress">In Progress</span></td>
                                    <td>Liam Harper</td>
                                    <td><button className="view-btn" onclick="alert('View Complaint #12346')">View</button></td>
                                </tr>
                                <tr>
                                    <td>#12347</td>
                                    <td>Noah Thompson</td>
                                    <td>Room 102</td>
                                    <td>Heating issue</td>
                                    <td><span className="status-badge status-resolved">Resolved</span></td>
                                    <td>Sophia Clark</td>
                                    <td><button className="view-btn" onclick="alert('View Complaint #12347')">View</button></td>
                                </tr>
                                <tr>
                                    <td>#12348</td>
                                    <td>Ava Rodriguez</td>
                                    <td>Room 410</td>
                                    <td>Noise complaint</td>
                                    <td><span className="status-badge status-new">New</span></td>
                                    <td>Unassigned</td>
                                    <td><button className="view-btn" onclick="alert('View Complaint #12348')">View</button></td>
                                </tr>
                                <tr>
                                    <td>#12349</td>
                                    <td>Lucas Foster</td>
                                    <td>Room 215</td>
                                    <td>Internet outage</td>
                                    <td><span className="status-badge status-inprogress">In Progress</span></td>
                                    <td>Liam Harper</td>
                                    <td><button className="view-btn" onclick="alert('View Complaint #12349')">View</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </section> */}
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Complaints

const TableRow = (request) =>{
    // useNavigate hook navigate to other urls
    const navigate = useNavigate();

    return(
        <>
             <td>{request.complaint_id}</td>
            <td>{request.student}</td>
            <td>{request.room}</td>
            <td>{request.issue}</td>
            <td>
                {request.complaint_type ==='New'? <span className="status-badge status-new">{request.complaint_type}</span> : request.complaint_type === 'In Progress' ? <span className="status-badge status-inprogress">{request.complaint_type}</span>:<span className="status-badge status-resolved">{request.complaint_type}</span>}
            </td>
            <td>{request.assigned_to}</td>
            <td>
                <button className="view-btn" onClick={()=> navigate('/complaints/viewComplaint')}>View</button>
                </td>
        </>
    )
}
