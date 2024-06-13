import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ReplyPage = ({bid}) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);

  const callAPI = async()=>{
    const url=`/reply/list.json/${bid}?page=${page}&size=${size}`;
    const res=await axios.get(url);
    console.log(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>{bid} ReplyPage</div>
  )
}

export default ReplyPage