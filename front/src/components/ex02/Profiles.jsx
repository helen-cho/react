import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Profile from './Profile'

const Profiles = () => {
    return (
        <div>
            <h1>프로파일 목록</h1>
            <ul>
                <li><Link to="/profiles/hong">홍길동</Link></li>
                <li><Link to="/profiles/shim">심청이</Link></li>
                <li><Link to="/profiles/lee">이순신</Link></li>
            </ul>
            <Routes>
                <Route path="/" element={<div>사용자를 선택해주세요!</div>}/>
                <Route path="/:uid" element={<Profile/>}/>
            </Routes>
        </div>
    )
}

export default Profiles