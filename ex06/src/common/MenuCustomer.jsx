import React from 'react'
import { Link } from 'react-router-dom'
import RouterPage from '../routers/RouterPage'

const MenuCustomer = () => {
  return (
    <>
      <div className='mt-5'>
        <Link to='/' className='me-3'>Home</Link>
        <hr/>
      </div>
      <RouterPage/>
    </>
  )
}

export default MenuCustomer