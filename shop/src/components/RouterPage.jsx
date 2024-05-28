import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './users/LoginPage'
import HomePage from './HomePage'

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/users/login" element={<LoginPage/>}/>
    </Routes>
  )
}

export default RouterPage