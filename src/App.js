import React,{useEffect, useState} from 'react'
import { Routes, Route } from 'react-router'
import Login from './Pages/Login/Login'
import Admin from './Pages/AdminPage/Admin'
import Student from './Pages/StudentManagementPage/Student'
import AddStudent from './Pages/StudentManagementPage/AddStudent'
import EditStudent from './Pages/StudentManagementPage/EditStudent'
import Room from './Pages/RoomManagementPage/Room'
import AddRoom from './Pages/RoomManagementPage/AddRoom'
import EditRoom from './Pages/RoomManagementPage/EditRoom'
import Mess from './Pages/MessManagement/Mess'
import Home from './Pages/HomePage/Home'
import Complaints from './Pages/ComplaintsPage/Complaints'
import ViewComplaint from './Pages/ComplaintsPage/ViewComplaint'
import Fees from './Pages/FeesManagementPage/Fees'

const App = () => {
    // Fetch all the student details from the database
    const getAllStudents = async()=>{
        const response = await fetch('http://localhost:5000/api/getAllStudents',{
            method:'GET'
        })
        const json = await response.json() //converts json to javascript object
        return json
    } 

    // Fetch all the room details from the database
    const getAllRooms = async () => {
        const response = await fetch('http://localhost:5000/api/getAllRooms', {
            method: 'GET'
        })
        const json = await response.json() //converts json to javascript object
        return json
    }

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* Route to the mainpage of admin */}
        <Route path="admin" element={<Admin fetchRooms={getAllRooms} fetchStudents={getAllStudents}/>} />

        {/* Route to the students page */}
        <Route path="students" element={<Student fetchStudents={getAllStudents} />} />
        <Route path="students/addStudent" element={<AddStudent fetchRooms={getAllRooms}/>} />
        <Route path="students/editStudent/:id" element={<EditStudent fetchRooms={getAllRooms} />} />

        {/* ROute to the room page */}
        <Route path='rooms'  element= {<Room fetchRooms={getAllRooms} fetchStudents={getAllStudents}/>}/>
        <Route path='rooms/addRoom'  element= {<AddRoom/>} />
        <Route path='rooms/editRoom/:id'  element= {<EditRoom/>} />

        {/* Route path to the mess management page */}
        <Route path='mess' element={<Mess/>} /> 

        {/* Route path to the complaints tracking page */}
        <Route path='complaints' element={<Complaints/>} />
        <Route path='complaints/viewComplaint' element={<ViewComplaint/>} />

        {/* Route path to the fees management page */}
        <Route path='fees' element={<Fees fetchRooms={getAllRooms} fetchStudents={getAllStudents} />}/>

      </Routes>
    </>
  )
}

export default App