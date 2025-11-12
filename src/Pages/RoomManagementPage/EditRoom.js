import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import './room.css'
import Sidebar from '../../Components/SideBar/Sidebar'
import Footer from '../../Components/Footer/Footer'
import { Mosaic } from 'react-loading-indicators'

const EditRoom = () => {
    // Get the object id from the url
    const { id } = useParams()

    // Manages the visibility of loader
    const [loading, setLoading] = useState(true);

    // Store the input values of the room details
    const [room,setRoom] = useState({roomNum:'',roomType:'',description:'',price:null,capacity:null,img:''})

    // Store the student object id
    const [studentObjectId,setStudentObjectId] = useState('')

    // useNavigate hook navigate to other urls
    const navigate = useNavigate()

    // Fetch the room data
    const fetchData = ()=>{
        const json = sessionStorage.getItem('rooms');
        const allRooms = [JSON.parse(json)]
        const roomDetails = allRooms[0].find(room => room._id === id )
        setRoom(roomDetails)

        if(roomDetails.status === 'Alloted'){
            const allStudents = [JSON.parse(sessionStorage.getItem('students'))]
            const objectId = allStudents[0].find(student => student.roomNo === roomDetails.roomNum)._id
            setStudentObjectId(objectId)
        }
        setLoading(false)
    }

    // Handles the input on changing the values
    const handleChange = (e)=>{
        let value = e.target.value
        if(!isNaN(value)){
            value = Number(value)
        }
        setRoom(prev => ({...prev,[e.target.name]:value}))
    }

    // Handles the edit button function
    const handleEdit = async(e)=>{
        e.preventDefault()
        const body = JSON.stringify(room)
        const response = await fetch(`http://localhost:5000/api/rooms/editRoom/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Accept':'*/*',
            },
            body:body
        })
        const json = await response .json()
        if(json.success){
            sessionStorage.setItem('rooms',JSON.stringify(json.data))
            if(studentObjectId){
                const resp = await fetch(`http://localhost:5000/api/students/editStudent/${studentObjectId}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept':'*/*',
                    },
                    body:JSON.stringify({roomNo:room.roomNum,roomType:room.roomType})
                })
                const result = await resp.json()
                if(result.success) sessionStorage.setItem('students',JSON.stringify(result.data))
            }
        }
        navigate('/rooms',{state:{message:json.message,success:json.success}})
    }

    // Scrolls the page to top when the component mounts
    useEffect(() => {
        fetchData()
        window.scrollTo(0, 0)
    }, [loading])
    return (
        <>
            <div className="mainContainer" style={loading ? { opacity: 0.3, pointerEvents: "none", userSelect: "none" }: {}}>
                <Sidebar />
                <main className="room-content">
                    <header className="add-room-header">
                        <h2>Edit Room Details</h2>
                        <p>Edit the details of room which are wrong or incorrect.</p>
                    </header>

                    <section className="add-room-form-container">
                        <form className="add-room-form">
                            <div className="form-section-title">Room Details</div>

                            <div className="form-group grid-2-col">
                                <label htmlFor="roomNo">Room No.</label>
                                <div className="input-prefix-wrapper">
                                    <input type="text" id="roomNo" placeholder="Ex. NSB123" name='roomNum' value={room.roomNum || ''} onChange={handleChange} />
                                    <span className="prefix">#</span>
                                </div>
                            </div>

                            <div className="form-group grid-2-col">
                                <label htmlFor="roomType">Room Type</label>
                                <div className="select-wrapper">
                                    <select id="roomType" name='roomType' style={{cursor:'pointer',border:'1px solid #c6c4c4',backgroundColor:'#fff'}} onChange={handleChange} value={room.roomType || ''}>
                                        <option value="">Select room type</option>
                                        <option value="Single">Single</option>
                                        <option value="Double">Double</option>
                                        <option value="Triple">Triple</option>
                                        <option value="Delux">delux</option>
                                    </select>
                                    <svg className="dropdown-arrow" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="description">Description</label>
                                <textarea id="description" rows="4" placeholder="Provide a detailed description of the room amenities and features." name='description' value={room.description || ''} onChange={handleChange} ></textarea>
                            </div>

                            <div className="form-group grid-2-col">
                                <label htmlFor="price">Price (per month)</label>
                                <div className="input-prefix-wrapper">
                                    <span className="prefix">₹</span>
                                    <input type="text" id="price" placeholder="Ex: 100000" name='price' value={room.price || ''} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-group grid-2-col">
                                <label htmlFor="capacity">Capacity</label>
                                <div className="input-suffix-wrapper">
                                    <input type="text" id="capacity" placeholder="Ex: 2" name='capacity' value={room.capacity || ''} onChange={handleChange} />
                                    <svg className="suffix-icon" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8 0c-.29 0-.62.02-.97.05C14.15 14.17 12 15.34 12 18v2h12v-2c0-2.66-5.33-4-8-4z" /></svg>
                                </div>
                            </div>

                            <div className="form-section-title full-width media-upload-heading">Media Upload</div>

                            <div className="form-group full-width dropzone-container">
                                <div className="dropzone">
                                    <svg className="upload-icon" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg>
                                    <button type="button" className="btn-primary" style={{ marginBottom: '15px', cursor: "pointer" }}>Upload Image</button>
                                    <p>Or drag and drop image here</p>
                                    {/* <p className="upload-info">Maximum 5 pictures (5MB max)</p> */}
                                </div>
                            </div>

                            <div className="form-actions full-width">
                                <button type="button" className="cancel-btn" onClick={() => navigate('/rooms')}>Cancel</button>
                                <button type="submit" className="submit-btn" onClick={handleEdit}>Edit Room</button>
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

export default EditRoom
