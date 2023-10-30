import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './HomePage'
import BookSearch from './books/BookSearch'
import BookList from './books/BookList'
import LoginPage from './users/LoginPage'
import MyPage from './users/MyPage'
import UpdatePage from './users/UpdatePage'

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/books/search" element={<BookSearch/>}/>
            <Route path="/books/list" element={<BookList/>}/>
            <Route path="/users/login" element={<LoginPage/>}/>
            <Route path="/users/mypage" element={<MyPage/>}/>
            <Route path="/users/update" element={<UpdatePage/>}/>
        </Routes>
    )
}

export default RouterPage