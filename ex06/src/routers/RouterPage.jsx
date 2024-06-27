import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GoodsRouter from './GoodsRouter'
import HomePage from '../common/HomePage'
import LoginPage from '../comonents/users/LoginPage'
import UserRouer from './UserRouer'

const RouterPage = () => {
  return (
    <Routes>
      <Route path='/user/login' element={<LoginPage/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/goods/*' element={<GoodsRouter/>}/>
      <Route path='/users/*' element={<UserRouer/>}/>
    </Routes>
  )
}

export default RouterPage