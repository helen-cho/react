import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Posts from '../ex01/Posts'
import Profiles from './Profiles'
const RouterPage = () => {
    return (
        <div>
            <ul>
                <li><Link to="/">홈</Link></li>
                <li><Link to="/about">소개</Link></li>
                <li><Link to="/info">Information</Link></li>
                <li><Link to="/posts">게시글</Link></li>
                <li><Link to="/profiles">프로파일목록</Link></li>
            </ul>
            <hr/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/info" element={<About/>}/>
                <Route path="/posts" element={<Posts/>}/>
                <Route path="/profiles/*" element={<Profiles/>}/>
            </Routes>
        </div>
    )
}

export default RouterPage