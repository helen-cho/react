import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './users/LoginPage'
import HomePage from './HomePage'
import ReadPage from './users/ReadPage'
import BookReadPage from './books/ReadPage'
import SearchPage from './books/SearchPage'
import ListPage from './books/ListPage'
import UpdatePage from './books/UpdatePage'
import CartPage from './orders/CartPage'
import OrderList from './orders/OrderList'

const RouterPage = ({setCount}) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/users/login" element={<LoginPage/>}/>
      <Route path="/users/mypage" element={<ReadPage/>}/>
      <Route path="/books/search" element={<SearchPage/>}/>
      <Route path="/books/list" element={<ListPage/>}/>
      <Route path="/books/update/:bid" element={<UpdatePage/>}/>
      <Route path="/books/read/:bid" element={<BookReadPage setCount={setCount}/>}/>
      <Route path="/orders/cart" element={<CartPage/>}/>
      <Route path="/orders/list" element={<OrderList/>}/>
    </Routes>
  )
}

export default RouterPage