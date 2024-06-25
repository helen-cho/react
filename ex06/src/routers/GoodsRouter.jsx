import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SearchPage from '../comonents/goods/SearchPage'
import ListPage from '../comonents/goods/ListPage'

const GoodsRouter = () => {
  return (
    <Routes>
      <Route path='search' element={<SearchPage/>}></Route>
      <Route path='list' element={<ListPage/>}></Route>
    </Routes>
  )
}

export default GoodsRouter