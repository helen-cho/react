import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../bbs/ListPage'
import ReadPage from '../bbs/ReadPage'
import InsertPage from '../bbs/InsertPage'

const BBSRouter = () => {
  return (
    <Routes>
      <Route path="list" element={<ListPage/>}/>
      <Route path="read/:bid" element={<ReadPage/>}/>
      <Route path="insert" element={<InsertPage/>}/>
    </Routes>
  )
}

export default BBSRouter