import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/student/ListPage'

const StudentRouter = () => {
  return (
    <Routes>
      <Route path="" element={<ListPage/>}/>
    </Routes>
  )
}

export default StudentRouter