import axios from 'axios';
import React, { useEffect } from 'react'

const ListPage = () => {
  
  const callAPI = async() => {
    const url='/users/list';
    const res=await axios.get(url);
    console.log(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>ListPage</div>
  )
}

export default ListPage