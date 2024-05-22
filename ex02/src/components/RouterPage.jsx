import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BookSearch from './book/BookSearch'
import LocalSeach from './local/LocalSeach'

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/book/search" element={<BookSearch/>}/>
            <Route path="/local/search" element={<LocalSeach/>}/>
        </Routes>
    )
}

export default RouterPage