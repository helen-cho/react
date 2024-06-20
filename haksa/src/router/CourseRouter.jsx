import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListPage from '../components/course/ListPage'

const CourseRouter = () => {
  return (
    <Routes>
      <Route path='' element={<ListPage/>}/>
    </Routes>
  )
}

export default CourseRouter