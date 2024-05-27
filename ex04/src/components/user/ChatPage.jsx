import React, { useState } from 'react'
import '../ChatPage.css'
import {Row, Col, Card, Form} from'react-bootstrap'
import {app} from '../../firebaseInit'
import { getDatabase, set, ref, push } from 'firebase/database'
import moment from 'moment'

const ChatPage = () => {
  const [content, setContent] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if(content==="") {
      alert("보내실 내용을 입력하세요!");
      return;
    }
    
    //메시지 보내기
    const date=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const data={
      email:sessionStorage.getItem('email'),
      date,
      content
    }
    console.log(data);
  }

  return (
    <Row className='justify-content-center my-5'>
      <Col xs={12} md={10} lg={8}>
        <Card>
          <Card.Header>
            <h3 className='text-center'>채팅방</h3>
          </Card.Header>
          <Card.Body className='wrap'>
          </Card.Body>
          <form onSubmit={onSubmit}>
            <Form.Control value={content} 
              onChange={(e)=>setContent(e.target.value)}
              placeholder='내용을 입력하세요.'/>
          </form>
        </Card>
      </Col>
    </Row>
  )
}

export default ChatPage