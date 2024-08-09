import React, { useState } from 'react'
import {Row, Col, Card, Form, Button} from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const auth = getAuth(app);
  const navi = useNavigate();
  const [form, setForm] = useState({
    email:'blue@test.com',
    pass:'12341234'
  });
  const {email, pass} = form;
  const onChangeForm = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass).then(success=>{
      alert("로그인성공!");
      sessionStorage.setItem('email', email);
      navi('/');
    }).catch(err=>{
      alert("로그인에러:" + err.message);
    });
  }

  return (
    <div className='my-5'>
      <h1 className='mb-3 text-center'>로그인</h1>
      <Row className='justify-content-center'>
        <Col xs={10} md={6} lg={5}>
          <Card>
            <Card.Body>
              <form onSubmit={onLogin}>
                <Form.Control name="email" value={email} onChange={onChangeForm}
                  placeholder='Email' className='mb-2'/>
                <Form.Control name="pass" value={pass} onChange={onChangeForm}
                  placeholder='Password' type="password" className='mb-3'/>
                <Button type="submit" className='w-100'>로그인</Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage