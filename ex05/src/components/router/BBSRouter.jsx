import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../bbs/ListPage'
import ReadPage from '../bbs/ReadPage'
import InsertPage from '../bbs/InsertPage'
import UpdatePage from '../bbs/UpdatePage'

const BBSRouter = () => {
  return (
    <Routes>
      <Route path="list" element={<ListPage/>}/>
      <Route path="read/:bid" element={<ReadPage/>}/>
      <Route path="insert" element={<InsertPage/>}/>
      <Route path="update/:bid" element={<UpdatePage/>}/>
    </Routes>
  )
}

export default BBSRouter