import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Form, Button} from 'react-bootstrap'

const InsertPage = () => {
  const [message, setMessage]=useState('');
  const [receiver, setReceiver] = useState('');

  const [users, setUsers] = useState([]);

  const callAPI = async() => {
    const res=await axios.get('/users');
    setUsers(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onSend = async() => {
    if(message===""){
      alert("메시지 내용을 입력하세요!");
      return;
    }
    //메시지보내기
    await axios.post('/message/insert', {
      sender:sessionStorage.getItem('uid'),
      receiver,
      message
    });
    alert("메시지가 전송되었습니다.");
    window.location.href='/message';
  }

  return (
    <div>
      <h1 className='text-center mb-5'>메시지작성</h1>
      <div className='mb-3'>
        <Form.Select value={receiver} onChange={(e)=>setReceiver(e.target.value)}>
          {users.map(user=>
            <option key={user.uid} value={user.uid}>
              {user.uname}({user.uid})
            </option>
          )}
        </Form.Select>
      </div>
      <div>
        <Form.Control onChange={(e)=>setMessage(e.target.value)}
          value={message} as="textarea" rows={10}/>
      </div>
      <div className='mt-2 text-end'>
        <Button onClick={onSend}
          className='px-5'>보내기</Button>
      </div>
    </div>
  )
}

export default InsertPage