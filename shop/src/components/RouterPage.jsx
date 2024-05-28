import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './users/LoginPage'
import HomePage from './HomePage'
import ReadPage from './users/ReadPage'

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/users/login" element={<LoginPage/>}/>
      <Route path="/users/mypage" element={<ReadPage/>}/>
    </Routes>
  )
}

export default RouterPage