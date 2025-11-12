import React, { useEffect, useState } from 'react'
import './mess.css'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/SideBar/Sidebar'
import TableComp from '../../Components/Table/TableComp'
import { Mosaic } from 'react-loading-indicators'
import { Alert } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'

const Mess = () => {
    const navigate = useNavigate()
    const {message,success} = useLocation().state || {}

    // Manages the visibility of loader
    const [loading, setLoading] = useState(true)

    // Making alert visible and hidden
    const [alert,setAlert] = useState(false);

    // states whether the modal is open or close
    const [isOpen, setIsOpen] = useState(false)

    // Store the table data
    const [tableData,setTableData] = useState([])
    // const [tableData, setTableData] = useState([{ day: 'Monday', breakfast: 'Poha', lunch: 'Dal Fry, Rice, Roti', dinner: 'Paneer Butter Masala, Roti, Rice' }, { day: 'Tuesday', breakfast: 'Upma', lunch: 'Chole Bhature', dinner: 'Aloo Gobi, Roti, Rice' }, { day: 'Wednesday', breakfast: 'Idli Sambar', lunch: 'Rajma Chawal', dinner: 'Mix Veg, Roti, Rice' }, { day: 'Thursday', breakfast: 'Dosa', lunch: 'Kadhi Chawal', dinner: 'Bhindi Fry, Roti, Rice' }, { day: 'Friday', breakfast: 'Paratha', lunch: 'Dal Makhani, Rice, Roti', dinner: 'Chana Masala, Roti, Rice' }, { day: 'Saturday', breakfast: 'Sandwich', lunch: 'Veg Biryani, Raita', dinner: 'Dum Aloo, Roti, Rice' }, { day: 'Sunday', breakfast: 'Puri Sabji', lunch: 'Pav Bhaji', dinner: 'Special Thali' }])

    const tableHeading = ['Day', 'Breakfast', 'Lunch', 'Dinner', 'Actions']

    // Store the input field values of the menu modal
    const [day,setDay] = useState()
    const [breakfast,setBreakfast] = useState('')
    const [lunch,setLunch] = useState('')
    const [dinner,setDinner] = useState('')

    const handleOpen = (data) => {
        setDay(data.day)
        setBreakfast(data.breakfast)
        setLunch(data.lunch)
        setDinner(data.dinner)
        setIsOpen(true)
    }
    const handleSave = async()=>{
        const getId = tableData.find((data)=>data.day === day)._id
        const body = {
            'day':day,'breakfast':breakfast,'lunch':lunch,'dinner':dinner
        }
        const response = await fetch(`http://localhost:5000/api/menuItems/edit/${getId}`,{
            method:'PUT',
            headers:{
                'Content-type':'Application/json',
                'accept':'*/*',
            },
            body:JSON.stringify(body)
        })
        const json = await response.json()
        navigate('/mess',{state:{success:json.success,message:json.message}})
        window.location.reload()
        setIsOpen(false)
    }

    // Fetch data from the db
    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true)
            const response = await fetch('http://localhost:5000/api/menuItems',{method:'GET'})
            const json = await response.json()
            if(json.success){
                setTableData(json.data)
            }
        }

        fetchData()
        Promise.all([fetchData()]).then(()=>setLoading(false)).catch((error)=>{
            console.log(error);
            setLoading(false);
        })
    },[])


    useEffect(() => {
        if(message) setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 5000);

        // Scrolls the page to top when the component mounts
        window.scrollTo(0, 0)
    }, [loading])
    return (
        <>
            <div className='mainContainer' style={loading ? { opacity: 0.3, pointerEvents: 'none', userSelect: 'none' } : {}}>
                <Sidebar />
                <main className="main-mess-content">
                    <header className="mess-menu-header">
                        <h2>Mess Menu Management</h2>
                        <p>Manage the weekly hostel mess menu.</p>
                    </header>

                    <div>
                        <TableComp heading={tableHeading} data={tableData} row={TableRow} modal={handleOpen} />
                    </div>
                </main>

                {/* Menu modal */}
                {isOpen && <div id="editMenuModal" style={isOpen ? {display:'flex'}:{display:'none'}} className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 id="modalTitle">Edit Menu for {day}</h3>
                            <button className="close-btn" onClick={()=> setIsOpen(false)}>&times;</button>
                        </div>

                        <form id="menuForm" className="modal-form">
                            <div className="form-group">
                                <label htmlFor="modalDay">Day</label>
                                <input type="text" id="modalDay" name='day' value={day} disabled />
                                {/* <input type="text" id="originalDay" /> */}
                            </div>

                            <div className="form-group">
                                <label htmlFor="modalBreakfast">Breakfast</label>
                                <input type="text" id="modalBreakfast" name='breakfast' onChange={(e)=>setBreakfast(e.target.value)} value={breakfast || ''} placeholder="Enter new breakfast menu" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="modalLunch">Lunch</label>
                                <input type="text" id="modalLunch" name='lunch' onChange={(e)=>setLunch(e.target.value)} value={lunch || ''} placeholder="Enter new lunch menu" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="modalDinner">Dinner</label>
                                <input type="text" id="modalDinner" name='dinner' onChange={(e)=>setDinner(e.target.value)} value={dinner || ''} placeholder="Enter new dinner menu" />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="cancel-modal-btn" onClick={()=>setIsOpen(false)}>Cancel</button>
                                <button type="button" className="submit-modal-btn" onClick={()=>handleSave()}>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>}

            </div>
            <Footer />

            {/* Alert component */}
            {alert && <Alert variant="filled" style={{ position: 'fixed', top: '10px', left: '50%' }} severity={success === true ? 'success' : 'error'}>{message}</Alert>}

            {/* Returns the loading component if the loading is true else returns an empty component */}
            {loading ? <Mosaic color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} size="large" text="Loading" textColor="#32cd32" /> : <React.Fragment />}
        </>
    )
}

export default Mess

const TableRow = (request, studentNames, roomNumbers, modal) => {
    const data = { day: request.day, breakfast: request.breakfast, lunch: request.lunch, dinner: request.dinner }
    return (
        <>
            <td>{request.day}</td>
            <td>{request.breakfast}</td>
            <td>{request.lunch}</td>
            <td>{request.dinner}</td>
            <td className='action-btns'>
                <button className="action-btn edit-btn" onClick={() => modal(data)}>Edit</button>
            </td>
        </>
    )
}