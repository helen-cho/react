import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/student/ListPage'
import InsertPage from '../components/student/InsertPage'

const StudentRouter = () => {
  return (
    <Routes>
      <Route path="" element={<ListPage/>}/>
      <Route path="insert" element={<InsertPage/>}/>
    </Routes>
  )
}

export default StudentRouter