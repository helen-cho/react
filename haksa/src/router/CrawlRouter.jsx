import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CGVPage from '../components/crawl/CGVPage'
import FinancePage from '../components/crawl/FinancePage'
import GmarketPage from '../components/crawl/GmarketPage'

const CrawlRouter = () => {
  return (
    <Routes>
      <Route path="cgv" element={<CGVPage/>}/>
      <Route path="finance" element={<FinancePage/>}/>
      <Route path="gmarket" element={<GmarketPage/>}/>
    </Routes>
  )
}

export default CrawlRouter