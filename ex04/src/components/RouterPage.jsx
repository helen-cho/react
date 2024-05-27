import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BookSearch from './book/BookSearch'
import LocalSearch from './local/LocalSearch'
import LoginPage from './user/LoginPage'
import JoinPage from './user/JoinPage'
import CartPage from './book/CartPage'
import FavoritePage from './local/FavoritePage'
import MyPage from './user/MyPage'
import ListPage from './post/ListPage'
import InsertPage from './post/InsertPage'
import ReadPage from './post/ReadPage'
import UpdatePage from './post/UpdatePage'
import ChatPage from './user/ChatPage'

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/book/search" element={<BookSearch/>}/>
      <Route path="/local/search" element={<LocalSearch/>}/>
      <Route path="/user/login" element={<LoginPage/>}/>
      <Route path="/user/join" element={<JoinPage/>}/>
      <Route path="/book/cart" element={<CartPage/>}/>
      <Route path="/local/favorite" element={<FavoritePage/>}/>
      <Route path="/user/mypage" element={<MyPage/>}/>
      <Route path="/post/list" element={<ListPage/>}/>
      <Route path="/post/insert" element={<InsertPage/>}/>
      <Route path="/post/read/:id" element={<ReadPage/>}/>
      <Route path="/post/update/:id" element={<UpdatePage/>}/>
      <Route path="/chat" element={<ChatPage/>}/>
    </Routes>
  )
}

export default RouterPage