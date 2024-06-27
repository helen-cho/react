import React from 'react'
import { Link } from 'react-router-dom'
import RouterPage from '../routers/RouterPage'
import HeaderPage from './HeaderPage'

const MenuPage = () => {
  return (
    <>
      <HeaderPage/>
      <div className='mt-5'>
        <Link to='/' className='me-3'>Home</Link>
        <Link to='/goods/search' className='me-3'>상품검색</Link>
        <Link to='/goods/list' className='me-3'>상품목록</Link>
        <Link to='/users/login' className='me-3' style={{float:'right'}}>로그인</Link>
        <hr/> 
      </div>
      <RouterPage/>
    </>
  )
}

export default MenuPage