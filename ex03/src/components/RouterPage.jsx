import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BookSearch from './book/BookSearch'
import LocalSearch from './local/LocalSearch'
import LoginPage from './user/LoginPage'
import JoinPage from './user/JoinPage'
import CartPage from './book/CartPage'
import FavoritePage from './local/FavoritePage'

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/book/search" element={<BookSearch/>}/>
      <Route path="/local/search" element={<LocalSearch/>}/>
      <Route path="/user/login" element={<LoginPage/>}/>
      <Route path="/user/join" element={<JoinPage/>}/>
      <Route path="/book/cart" element={<CartPage/>}/>
      <Route path="/local/favorite" element={<FavoritePage/>}/>
    </Routes>
  )
}

export default RouterPage