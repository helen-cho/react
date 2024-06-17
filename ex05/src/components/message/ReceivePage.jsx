import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Table} from 'react-bootstrap'

const ReceivePage = () => {
  const [list, setList] = useState([]);
  const uid=sessionStorage.getItem('uid');
  
  const callAPI = async() => {
    const res=await axios.get(`/message/receive.json/${uid}`);
    console.log(res.data);
    setList(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>
      <h1 className='text-center'>받은메시지</h1>
      <Table hover>
        <thead>
          <tr>
            <td>보낸이</td>
            <td>내용</td>
            <td>발신일</td>
            <td>수신일</td>
          </tr>
        </thead>
        <tbody>
          {list.map(msg=>
            <tr key={msg.mid}>
              <td>{msg.uname}({msg.sender})</td>
              <td>
                <span className={msg.readDate || 'bold'}>
                  <a href={`/message/receive/${msg.mid}`}>{msg.message.substring(0,30)}</a>
                </span>
              </td>
              <td>{msg.sendDate}</td>
              <td>{msg.readDate || '안읽음'}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default ReceivePage