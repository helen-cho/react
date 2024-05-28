import axios from 'axios';
import React, { useState } from 'react'
import { InputGroup, Form, Button, Card, Col, Row } from 'react-bootstrap'

const LoginPage = () => {
  const [form, setForm] = useState({
    uid:'',
    upass:''
  });
  const { uid, upass } = form;
  const onChangeForm = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }
  const onSubmit = async(e) => {
    e.preventDefault();
    if(uid==="" || upass==="") {
      alert("아이디또는 비밀번호를 입력하세요!");
      return;
    }
    //로그인체크
    //console.log(uid, upass);
    const res=await axios.post("/users/login", form);
    console.log(res.data.result);
  }

  return (
    <Row className='justify-content-center my-5 userLogin'>
      <Col xs={8} md={6} lg={4}>
        <Card>
          <Card.Header><h3 className='text-center'>로그인</h3></Card.Header>
          <Card.Body>
            <form onSubmit={onSubmit}>
              <InputGroup className='mb-2'>
                <InputGroup.Text className='title justify-content-center'>아이디</InputGroup.Text>
                <Form.Control name="uid" value={uid} onChange={onChangeForm}/>
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text className='title justify-content-center'>비밀번호</InputGroup.Text>
                <Form.Control type="password"
                  name="upass" value={upass} onChange={onChangeForm}/>
              </InputGroup>
              <Button className='w-100' type="submit">로그인</Button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default LoginPage