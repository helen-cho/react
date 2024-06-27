import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GoodsRouter from './GoodsRouter'
import HomePage from '../common/HomePage'
import LoginPage from '../comonents/users/LoginPage'

const RouterPage = () => {
  return (
    <Routes>
      <Route path='/user/login' element={<LoginPage/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/goods/*' element={<GoodsRouter/>}/>
    </Routes>
  )
}

export default RouterPage