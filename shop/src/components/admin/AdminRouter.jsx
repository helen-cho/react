import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OrderList from './OrderList'

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/admin/orders" element={<OrderList/>}/>
    </Routes>
  )
}

export default AdminRouter