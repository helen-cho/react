import React from 'react'
import { Link, Route, Routes, NavLink } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Posts from '../ex01/Posts'
import Profiles from './Profiles'
import NavigatePage from './NavigatePage'

const RouterPage = () => {
    return (
        <div>
            <ul>
                <li><NavLink to="/">홈</NavLink></li>
                <li><NavLink to="/about?detail=false&query=노트북&page=1">소개</NavLink></li>
                <li><NavLink to="/info">Information</NavLink></li>
                <li><NavLink to="/posts">게시글</NavLink></li>
                <li><NavLink to="/profiles">프로파일목록</NavLink></li>
                <li><NavLink to="/navigate">네비게이트</NavLink></li>
            </ul>
            <hr/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/info" element={<About/>}/>
                <Route path="/posts" element={<Posts/>}/>
                <Route path="/profiles/*" element={<Profiles/>}/>
                <Route path="/navigate" element={<NavigatePage/>}/>
            </Routes>
        </div>
    )
}

export default RouterPage