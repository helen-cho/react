import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BookSearch from './book/BookSearch'

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/book/search" element={<BookSearch/>}/>
        </Routes>
    )
}

export default RouterPage