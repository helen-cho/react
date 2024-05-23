import React, { useState } from 'react'
import {Row, Col, InputGroup, Form, Button, Card} from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const JoinPage = () => {
  const auth= getAuth(app);
  const navi = useNavigate();
  const [form, setForm] = useState({
    email:'black@test.com',
    pass:'12341234'
  });
  const { email, pass } = form; //비구조할당
  const onChangeForm = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(email==="" || pass===""){
      alert("이메일과 비밀번호를 입력하세요!");
    }else{
      createUserWithEmailAndPassword(auth, email, pass)
      .then(succss=>{
        navi("/user/login");
      })
      .catch(error=>{
        alert("회원가입오류:" + error);
      })
    }
  }
  return (
    <Row className='justify-content-center my-5 userLogin'>
    <Col xs={8} md={6} lg={5}>
      <Card>
        <Card.Header>
          <h3 class="text-center">회원가입</h3>
        </Card.Header>
        <Card.Body>
          <form onSubmit={onSubmit}>
            <InputGroup className='mb-2'>
              <InputGroup.Text className="title justify-content-center">이메일</InputGroup.Text>
              <Form.Control name="email" value={email} onChange={onChangeForm}/>
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Text className="title justify-content-center">비밀번호</InputGroup.Text>
              <Form.Control name="pass" type="password" value={pass} onChange={onChangeForm}/>
            </InputGroup>
            <Button className='w-100' type="submit">회원가입</Button>
          </form>
        </Card.Body>
      </Card>
    </Col>
  </Row>
  )
}

export default JoinPage