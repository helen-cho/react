import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const SendPage = () => {
  const [list, setList] = useState([]);
  const callAPI = async() => {
    const url=`/message/send.json/${sessionStorage.getItem('uid')}`;
    const res=await axios.get(url);
    console.log(res.data);
    setList(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>
      <h1 className='text-center'>보낸메시지</h1>
      <Table>
        <thead>
          <tr>
            <td>받은이</td>
            <td>내용</td>
            <td>발신일</td>
            <td>수신일</td>
          </tr>
        </thead>
        <tbody>
          {list.map(msg=>
            <tr key={msg.mid}>
              <td>{msg.uname}({msg.receiver})</td>
              <td>
                <div className='ellipsis'>
                  <Link to={`/message/send/${msg.mid}`}>{msg.message}</Link></div>
                </td>
              <td>{msg.sendDate}</td>
              <td>{msg.readDate || '안읽임'}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default SendPage