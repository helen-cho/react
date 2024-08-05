import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BookSearch from './book/BookSearch'
import LocalSeach from './local/LocalSeach'
import LoginPage from './user/LoginPage'

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/book/search" element={<BookSearch/>}/>
            <Route path="/local/search" element={<LocalSeach/>}/>
            <Route path="/user/login" element={<LoginPage/>}/>
        </Routes>
    )
}

export default RouterPage