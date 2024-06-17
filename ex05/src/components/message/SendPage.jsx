import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const SendPage = () => {
  const [list, setList] = useState([]);
  const callAPI = async() => {
    const url=`/message/send.json/${sessionStorage.getItem('uid')}`;
    const res=await axios.get(url);
    const data=res.data.map(msg=>msg && {...msg, checked:false});
    console.log(data);
    setList(data);
  }

  const onChangeAll = (e) => {
    const data=list.map(msg=>msg && {...msg, checked:e.target.checked});
    setList(data);
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
            <td><input type="checkbox" onChange={onChangeAll}/></td>
            <td>받은이</td>
            <td>내용</td>
            <td>발신일</td>
            <td>수신일</td>
          </tr>
        </thead>
        <tbody>
          {list.map(msg=>
            <tr key={msg.mid}>
              <td><input type="checkbox" checked={msg.checked}/></td>
              <td>{msg.uname}({msg.receiver})</td>
              <td>
                <div>
                  <Link to={`/message/send/${msg.mid}`}>{msg.message.substring(0,30)}</Link></div>
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