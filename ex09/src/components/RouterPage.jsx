import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import BBSListPage from './bbs/ListPage'
import LoginPage from './users/LoginPage'
import SearchPage from './shop/SearchPage'
import ListPage from './shop/ListPage'

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/bbs" element={<ListPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/shop/search" element={<SearchPage/>}/>
      <Route path="/shop" element={<ListPage/>}/>
    </Routes>
  )
}

export default RouterPage