import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CGVPage from '../components/crawl/CGVPage'
import FinancePage from '../components/crawl/FinancePage'

const CrawlRouter = () => {
  return (
    <Routes>
      <Route path="cgv" element={<CGVPage/>}/>
      <Route path="finance" element={<FinancePage/>}/>
    </Routes>
  )
}

export default CrawlRouter