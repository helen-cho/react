import React, { useState } from 'react'
import {Row, Col, InputGroup, Form, Button, Card} from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navi=useNavigate();
  const auth= getAuth(app);

  const [form, setForm] = useState({
    email:'blue@test.com',
    pass:"12341234"
  });
  const {email, pass} = form; //비구조할당

  const onChangeForm = (e) => {
    setForm({...form,[e.target.name]:e.target.value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(email==="" || pass===""){
      alert("이메일과 비밀번호 입력하세요!");
    }else{
      //로그인체크
      //alert(`${email}\n${pass}`);
      setLoading(true);
      signInWithEmailAndPassword(auth, email, pass)
      .then(success=>{
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('uid', success.user.uid);
        //alert('로그인성공' + success.user.uid);
        setLoading(false);
        if(sessionStorage.getItem("target")){
          navi(sessionStorage.getItem("target"));
        }else{
          navi("/");
        }
      })
      .catch(error=>{
        setLoading(false);
        alert('이메일 또는 비밀번호가 일치하지 않습니다.')
      });
    }
  }

  if(loading) return <div className='my-5 text-center'><h1>로딩중......</h1></div>
  return (
    <Row className='justify-content-center my-5 userLogin'>
      <Col xs={8} md={6} lg={5}>
        <Card>
          <Card.Header>
            <h3 class="text-center">로그인</h3>
          </Card.Header>
          <Card.Body>
            <form onSubmit={onSubmit}>
              <InputGroup className='mb-2'>
                <InputGroup.Text className="title justify-content-center">이메일</InputGroup.Text>
                <Form.Control name="email" value={email} 
                  onChange={(e)=>onChangeForm(e)}/>
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text className="title justify-content-center">비밀번호</InputGroup.Text>
                <Form.Control name="pass" value={pass} type="password"
                  onChange={onChangeForm}/>
              </InputGroup>
              <Button className='w-100' type="submit">로그인</Button>
              <div className='text-end my-2'>
                <a href="/user/join">회원가입</a>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default LoginPage