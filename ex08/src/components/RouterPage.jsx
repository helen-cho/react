import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import ListPage from './bbs/ListPage'
import LoginPage from './users/LoginPage'
import InsertPage from './bbs/InsertPage'
import ReadPage from './bbs/ReadPage'
import UpdatePage from './bbs/UpdatePage'

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/bbs" element={<ListPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path='/bbs/insert' element={<InsertPage/>}/>
      <Route path='/bbs/:bid' element={<ReadPage/>}/>
      <Route path='/bbs/update/:bid' element={<UpdatePage/>}/>
    </Routes>
  )
}

export default RouterPage