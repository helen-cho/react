import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/course/ListPage'
import InsertPage from '../components/course/InsertPage'
import ReadPage from '../components/course/ReadPage'

const CourseRouter = () => {
  return (
    <Routes>
      <Route path='' element={<ListPage/>}/>
      <Route path='/insert' element={<InsertPage/>}/>
      <Route path='/read/:lcode' element={<ReadPage/>}/>
    </Routes>
  )
}

export default CourseRouter