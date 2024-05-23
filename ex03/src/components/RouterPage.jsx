import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BookSearch from './book/BookSearch'
import LocalSearch from './local/LocalSearch'
import LoginPage from './user/LoginPage'

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/book/search" element={<BookSearch/>}/>
      <Route path="/local/search" element={<LocalSearch/>}/>
      <Route path="/user/login" element={<LoginPage/>}/>
    </Routes>
  )
}

export default RouterPage