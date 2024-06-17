import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Form, Button} from 'react-bootstrap'

const InsertPage = () => {
  const [users, setUsers] = useState([]);

  const callAPI = async() => {
    const res=await axios.get('/users');
    setUsers(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>
      <h1 className='text-center mb-5'>메시지작성</h1>
      <div className='mb-3'>
        <Form.Select>
          {users.map(user=>
            <option key={user.uid} value={user.uid}>
              {user.uname}({user.uid})
            </option>
          )}
        </Form.Select>
      </div>
      <div>
        <Form.Control as="textarea" rows={10}/>
      </div>
      <div className='mt-2 text-end'>
        <Button className='px-5'>보내기</Button>
      </div>
    </div>
  )
}

export default InsertPage