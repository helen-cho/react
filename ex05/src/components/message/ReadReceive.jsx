import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ReadReceive = () => {
  const [msg, setMsg] = useState('');
  const {mid} = useParams();

  const callAPI = async() => {
    const url=`/message/receive/${mid}`;
    const res=await axios.get(url);
    setMsg(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>
      <div>보낸이: {msg.uname} ({msg.sender})</div>
      <div>발신일: {msg.sendDate}</div>
      <hr/>
      <div style={{whiteSpace:'pre-wrap'}}>{msg.message}</div>
    </div>
  )
}

export default ReadReceive