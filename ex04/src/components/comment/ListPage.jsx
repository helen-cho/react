import React, { useState } from 'react'
import {Row, Col, Button, Form} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

const ListPage = () => {
  const navi = useNavigate();
  const {pathname} = useLocation();
  const [content, setContent] = useState('');

  const onClickInsert = () => {
    if(sessionStorage.getItem('email')){
      if(content === "") {
        alert("댓글내용을 입력하세요!");
        return;
      }
      //댓글저장
      alert(content);
    }else{
      //console.log(pathname);
      sessionStorage.setItem('target', pathname);
      navi('/user/login');
    }
  }
  return (
    <Row className='justify-content-center my-5'>
      <Col xs={12} md={10} lg={8}>
        {sessionStorage.getItem('email') && 
          <div>
            <Form.Control value={content} onChange={(e)=>setContent(e.target.value)}
              as="textarea" rows={5} placeholder='댓글내용을 입력하세요.'/>
          </div>
        }
        <div className='text-end my-2'>
          <Button onClick={onClickInsert}
            className='px-5' variant='outline-secondary'>댓글등록</Button>
        </div>
      </Col>
    </Row>
  )
}

export default ListPage