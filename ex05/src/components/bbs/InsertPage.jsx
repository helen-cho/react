import axios from 'axios';
import React, { useState } from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'

const InsertPage = () => {
  const [form, setForm] = useState({
    uid:sessionStorage.getItem('uid'),
    title:'',
    contents:''
  });
  const {uid, title, contents} = form;
  const onChangeForm = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }

  const onReset = () => {
    setForm({...form, title:'', contents:''});
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    await axios.post('/bbs/insert', form);
    alert("게시글등록완료!");
    window.location.href='/bbs/list';
  }

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>글쓰기</h1>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          <form onReset={onReset} onSubmit={onSubmit}>
            <Form.Control name="title" value={title} onChange={onChangeForm}
              placeholder='제목을 입력하세요.' className='mb-2'/>
            <Form.Control name="contents" value={contents} onChange={onChangeForm}
              as="textarea" rows={10} placeholder='내용을 입력하세요.'/>
            <div className='mt-3 text-center'>
              <Button type="submit" className='px-5 me-2'>등록</Button>
              <Button type="reset" className='px-5' variant='secondary'>취소</Button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  )
}

export default InsertPage