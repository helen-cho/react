import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InsertPage from '../message/InsertPage'
import SendPage from '../message/SendPage'
import ReceivePage from '../message/ReceivePage'

const MessageRouter = () => {
  return (
    <Routes>
      <Route path="insert" element={<InsertPage/>}/>
      <Route path="send" element={<SendPage/>}/>
      <Route path="receive" element={<ReceivePage/>}/>
    </Routes>
  )
}

export default MessageRouter