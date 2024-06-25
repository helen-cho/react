import React from 'react'
import { Link } from 'react-router-dom'
import RouterPage from '../routers/RouterPage'

const MenuPage = () => {
  return (
    <>
      <div className='mt-5'>
        <Link to='/' className='me-3'>Home</Link>
        <Link to='/goods/search' className='me-3'>상품검색</Link>
        <Link to='/goods/list' className='me-3'>상품목록</Link>
        <hr/>
      </div>
      <RouterPage/>
    </>
  )
}

export default MenuPage