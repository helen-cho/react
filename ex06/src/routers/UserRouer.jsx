import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../comonents/users/LoginPage'
import JoinPage from '../comonents/users/JoinPage'

const UserRouer = () => {
  return (
    <Routes>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='join' element={<JoinPage/>}/>
    </Routes>
  )
}

export default UserRouer