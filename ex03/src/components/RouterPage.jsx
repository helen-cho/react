import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BookSearch from './book/BookSearch'
import LocalSearch from './local/LocalSearch'

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/book/search" element={<BookSearch/>}/>
      <Route path="/local/search" element={<LocalSearch/>}/>
    </Routes>
  )
}

export default RouterPage