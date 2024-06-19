import React, { useContext } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import BBSRouter from './router/BBSRouter'
import UserRouter from './router/UserRouter'
import MessagePage from './message/MessagePage'
import { UserContext } from '../contexts/UserContext'

const MenuPage = () => {
  const {user, setUser} = useContext(UserContext);
  console.log('menu......', user.uname, user.photo, user.point);
  const photo=sessionStorage.getItem('photo') &&
     `/display?file=${sessionStorage.getItem('photo')}`;
     
  const uid=sessionStorage.getItem('uid');
  const uname=sessionStorage.getItem('uname');
  const onLogout = (e) => {
    e.preventDefault();
    if(!window.confirm("로그아웃하실래요?")) return;
    sessionStorage.clear();
    window.location.href='/';
  }

  return (
    <div>
      <Link to="/" className='me-3'>Home</Link>
      <Link to="/bbs/list" className='me-3'>게시판</Link>
      
      {uid ?
        <>
          <Link to="/message" className='me-5'>메시지</Link>
          <Link to="/users/read" className='me-3'>
            <img src={photo || 'http://via.placeholder.com'} width="30px" style={{border:'1px solid gray', borderRadius:'50%'}}/>
            {uname}({uid})님
          </Link>
          <Link to="#" onClick={onLogout}>로그아웃</Link>
        </>
        :
        <>
          <Link to="/users/login">로그인</Link>
        </>
      }
      <hr/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/bbs/*" element={<BBSRouter/>}/>
        <Route path="/users/*" element={<UserRouter/>}/>
        <Route path="/message/*" element={<MessagePage/>}/>
      </Routes>
    </div>
  )
}

export default MenuPage