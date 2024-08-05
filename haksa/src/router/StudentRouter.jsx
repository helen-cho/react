import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/student/ListPage'
import InsertPage from '../components/student/InsertPage'
import ReadPage from '../components/student/ReadPage'
import UpdatePage from '../components/student/UpdatePage'

const StudentRouter = () => {
  return (
    <Routes>
      <Route path="" element={<ListPage/>}/>
      <Route path="insert" element={<InsertPage/>}/>
      <Route path="read/:scode" element={<ReadPage/>}/>
      <Route path="update/:scode" element={<UpdatePage/>}/>
    </Routes>
  )
}

export default StudentRouter