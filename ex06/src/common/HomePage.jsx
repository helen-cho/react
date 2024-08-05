import React, { useEffect, useState } from 'react'
import Recently from './Recently'
import axios from 'axios'

const HomePage = () => {
  const [goods, setGoods] = useState([]);

  const callAPI = async() => {
    const res = await axios.get(`/goods/list?page=1&size=10`);
    //console.log(res.data.list);
    setGoods(res.data.list);
  }

  useEffect(()=> {
    callAPI();
  }, []);

  return (
    <div>
      <h1 className='text-center'>홈페이지</h1>
      <h3 className='my-5'>최근상품</h3>
      <Recently goods={goods}/>
    </div>
  )
}

export default HomePage