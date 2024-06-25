import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GoodsRouter from './GoodsRouter'
import HomePage from '../common/HomePage'

const RouterPage = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/goods/*' element={<GoodsRouter/>}/>
    </Routes>
  )
}

export default RouterPage