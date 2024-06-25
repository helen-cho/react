import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SearchPage from '../comonents/goods/SearchPage'

const GoodsRouter = () => {
  return (
    <Routes>
      <Route path='search' element={<SearchPage/>}></Route>
    </Routes>
  )
}

export default GoodsRouter