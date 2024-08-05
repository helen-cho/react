import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentRouter from './StudentRouter'
import HomePage from '../common/HomePage'
import CourseRouter from './CourseRouter'
import CrawlRouter from './CrawlRouter'

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/stu/*" element={<StudentRouter/>}/>
      <Route path='/cou/*' element={<CourseRouter/>}/>
      <Route path='/crawl/*' element={<CrawlRouter/>}/>
    </Routes>
  )
}

export default RouterPage