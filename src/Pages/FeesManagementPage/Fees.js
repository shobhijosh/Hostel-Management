import React from 'react'
import Sidebar from '../../Components/SideBar/Sidebar'
import Footer from '../../Components/Footer/Footer'
import './fees.css'
import TableComp from '../../Components/Table/TableComp'

const Fees = () => {
    const tableHeading = ['Student Name', 'Room Number', 'Payment Date', 'Amount Paid', 'Remaining Amount', 'Status']
    const tableData = [
        {
            student_name: 'Liam Harper',
            room_no: '101',
            payment_date: '2024-07-20',
            amt_paid: '$250',
            remaining_amt: '$0',
            status: 'Paid',
        },
        {
            student_name: 'Olivia Bennett',
            room_no: '203',
            payment_date: '2024-07-21',
            amt_paid: '$150',
            remaining_amt: '$100',
            status: 'Pending',
        },
        {
            student_name: 'Noah Carter',
            room_no: '305',
            payment_date: '2024-07-22',
            amt_paid: '$250',
            remaining_amt: '$0',
            status: 'Paid',
        },
        {
            student_name: 'Emma Hayes',
            room_no: '102',
            payment_date: '2024-07-23',
            amt_paid: '$0',
            remaining_amt: '$250',
            status: 'Pending',
        },
        {
            student_name: 'Ethan Foster',
            room_no: '204',
            payment_date: '2024-07-24',
            amt_paid: '$250',
            remaining_amt: '$0',
            status: 'Paid',
        },
    ]

    return (
        <>
            <div className='mainContainer'>
                <Sidebar />
                <main className="main-fees-content">
                    <header className="fees-header">
                        <h2>Fees Management</h2>
                        <p>Manage the hostel fees of the student efficiently.</p>
                    </header>

                    <section className="fee-overview-cards">
                        <div className="card overview-card">
                            <span className="label">Total Fees Collected</span>
                            <span className="value">$12,500</span>
                        </div>
                        <div className="card overview-card">
                            <span className="label">Outstanding Fees</span>
                            <span className="value">$2,300</span>
                        </div>
                    </section>

                    <section className="recent-payments">
                        <h3>Recent Fee Payments</h3>
                        <TableComp heading={tableHeading} data={tableData} row={Tablerow} />
                    </section>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Fees

const Tablerow = (request) => {
    return (
        <>
            <td>{request.student_name}</td>
            <td>{request.room_no}</td>
            <td>{request.payment_date}</td>
            <td>{request.amt_paid}</td>
            <td>{request.remaining_amt}</td>
            <td>
                <span className={request.status === 'Paid' ? 'status-badge paid' : 'status-badge pending'}>{request.status}</span>
            </td>
        </>
    )
}
