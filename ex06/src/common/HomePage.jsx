import React from 'react'
import Recently from './Recently'

const HomePage = () => {
  return (
    <div>
      <h1 className='text-center'>홈페이지</h1>
      <h3 className='my-5'>최근상품</h3>
      <Recently/>
    </div>
  )
}

export default HomePage