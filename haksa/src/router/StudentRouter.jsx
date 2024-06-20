import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/student/ListPage'
import InsertPage from '../components/student/InsertPage'
import ReadPage from '../components/student/ReadPage'

const StudentRouter = () => {
  return (
    <Routes>
      <Route path="" element={<ListPage/>}/>
      <Route path="insert" element={<InsertPage/>}/>
      <Route path="read/:scode" element={<ReadPage/>}/>
    </Routes>
  )
}

export default StudentRouter