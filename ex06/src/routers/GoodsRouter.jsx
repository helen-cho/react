import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SearchPage from '../comonents/goods/SearchPage'
import ListPage from '../comonents/goods/ListPage'
import UpdatePage from '../comonents/goods/UpdatePage'

const GoodsRouter = () => {
  return (
    <Routes>
      <Route path='search' element={<SearchPage/>}></Route>
      <Route path='list' element={<ListPage/>}></Route>
      <Route path='update/:gid' element={<UpdatePage/>}></Route>
    </Routes>
  )
}

export default GoodsRouter