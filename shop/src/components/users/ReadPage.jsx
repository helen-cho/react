import axios from 'axios';
import React, { useEffect } from 'react'

const ReadPage = () => {
  const callAPI = async() => {
    const uid='blue';
    const url=`/users/read/${uid}`;
    const res=await axios.get(url);
    console.log(res.data);
  }
  useEffect(()=>{
    callAPI();
  }, []);
  
  return (
    <div>ReadPage</div>
  )
}

export default ReadPage