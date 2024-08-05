import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import RouterPage from '../routers/RouterPage'
import HeaderPage from './HeaderPage'
import { BoxContext } from './BoxContext'

const CustomerMenu = () => {
  const {user, setUser} = useContext(BoxContext);
  const onClickLogout = (e) => {
    e.preventDefault();
    if(!window.confirm('정말로 로그아웃하실래요?')) return;
    setUser('');
    sessionStorage.clear();
    window.location.href='/';
  }

  return (
    <>
      <HeaderPage/>
      <div className='mt-5'>
        <Link to='/' className='me-3'>Home</Link>
        {sessionStorage.getItem('uid') ? 
          <>
            <Link to='/goods/cart' className='me-3'>장바구니</Link>
            <Link to='/orders/list' className='me-3'>주문목록</Link>
            <Link onClick={onClickLogout}
              to='#' className='me-3' style={{float:'right'}}>로그아웃</Link>
            <Link to='/users/mypage' className='me-3' style={{float:'right'}}>
              {sessionStorage.getItem('uid')}님
            </Link>
          </>  
          :
          <Link to='/users/login' className='me-3' style={{float:'right'}}>로그인</Link>
        }
        <hr/> 
      </div>
      <RouterPage/>
    </>
  )
}

export default CustomerMenu