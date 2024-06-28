import axios from 'axios';
import React, { useContext, useState } from 'react'
import {Row, Col, Card, Form, Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { BoxContext } from '../../common/BoxContext';

const LoginPage = () => {
  const navi = useNavigate();
  const {getUser} = useContext(BoxContext);
  const [form, setForm] = useState({
    uid:'red',
    upass:'pass'
  });
  const {uid, upass} = form;
  const onChangeForm = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }

  const onSumbit = async(e) => {
    e.preventDefault();
    const res=await axios.post('/users/login', form);
    if(res.data===1){
      alert('로그인성공!');
      sessionStorage.setItem('uid', uid);
      window.location.href='/';
    }else if(res.data===2){
      alert('비밀번호 불일치!');
    }else if(res.data===0) {
      alert('아이디가 존재하지않습니다!');
    }
  }

  return (
    <Row className='justify-content-center my-5'>
      <Col xs={8} md={6} lg={4}>
        <Card>
          <Card.Header><h3 className='text-center'>로그인</h3></Card.Header>
          <Card.Body>
            <form onSubmit={onSumbit}>
              <Form.Control value={uid} name='uid' onChange={onChangeForm}
                placeholder='아이디' className='mb-2'/>
              <Form.Control value={upass} name='upass'onChange={onChangeForm}
                type='password' placeholder='비밀번호' className='mb-2'/>
              <Button className='w-100' type='submit'>로그인</Button>
            </form>
            <div className='mt-2 text-end'>
              <Link to='/users/join'>회원가입</Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default LoginPage