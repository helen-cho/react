import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentRouter from './StudentRouter'
import HomePage from '../common/HomePage'

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/stu/*" element={<StudentRouter/>}/>
    </Routes>
  )
}

export default RouterPage