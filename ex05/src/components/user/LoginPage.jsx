import axios from 'axios';
import React, { useContext, useState } from 'react'
import {Row, Col, Card, InputGroup, Form, Button} from 'react-bootstrap'
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navi = useNavigate();
  const {user, setUser} = useContext(UserContext);

  const [form, setForm] = useState({
    uid:'red',
    upass:'pass'
  });
  const {uid, upass} = form;
  const onChangeForm = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    const res=await axios.get(`/users/${uid}`);
    if(!res.data){
      alert("아이디가 존재하지 않습니다!");
    }else if(upass === res.data.upass){
      alert("성공!");
      sessionStorage.setItem('uid', res.data.uid);
      sessionStorage.setItem('uname', res.data.uname);
      sessionStorage.setItem('photo', res.data.photo);
      
      setUser(res.data);
      if(sessionStorage.getItem('target')){
        //window.location.href=sessionStorage.getItem('target');
        navi(sessionStorage.getItem('target'));
      }else{
        //window.location.href="/";
        navi('/');
      }
    }else{
      alert("비밀번호가 일치하지 않습니다!");
    }
  }

  return (
    <Row className='justify-content-center my-5'>
      <Col xs={10} md={6} lg={4}>
        <Card>
          <Card.Header>
            <h3 className='text-center'>로그인</h3>
          </Card.Header>
          <Card.Body>
            <form onSubmit={onSubmit}>
              <InputGroup className='mb-2'>
                <InputGroup.Text className='title'>아이디</InputGroup.Text>
                <Form.Control name="uid" value={uid} onChange={onChangeForm}/>
              </InputGroup>
              <InputGroup className='mb-4'>
                <InputGroup.Text className='title'>비밀번호</InputGroup.Text>
                <Form.Control name="upass" value={upass} type="password" onChange={onChangeForm}/>
              </InputGroup>
              <Button type="submit" className='w-100'>로그인</Button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default LoginPage