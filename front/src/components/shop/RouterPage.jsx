import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './HomePage'
import BookSearch from './books/BookSearch'

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/books/search" element={<BookSearch/>}/>
        </Routes>
    )
}

export default RouterPage