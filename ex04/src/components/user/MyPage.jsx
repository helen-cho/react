import React, { useState } from 'react'
import {Row, Col, Card, Form, InputGroup, Button} from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

const MyPage = () => {
  const db=getFirestore(app);
  const email=sessionStorage.getItem('email');
  const uid=sessionStorage.getItem('uid');
  const [form, setForm] = useState({
    email:email,
    name:'무기명',
    phone:'010-1010-1010',
    address1:'인천 서구 서곶로 120 루원시티 포레나',
    address2:'213동 1104호'
  });

  const {name, phone, address1, address2} = form; //비구조할당
  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(name===""){
      alert("이름입력하세요!");
      return;
    }
    if(!window.confirm("변경내용을 저장하실래요?")) return;
    //console.log(form);
    //사용자정보저장
    setDoc(doc(db, 'users', uid), form)
  }

  return (
    <Row className='justify-content-center my-5'>
      <Col xs={10} md={8} lg={7}>
        <Card>
          <Card.Header>
            <h3 className='text-center'>마이페이지</h3>
          </Card.Header>
          <Card.Body>
            <form onSubmit={onSubmit}>
              <InputGroup className='mb-2'>
                <InputGroup.Text className='px-5'>이름</InputGroup.Text>
                <Form.Control name="name" value={name} onChange={onChangeForm}/>
              </InputGroup>
              <InputGroup className='mb-2'>
                <InputGroup.Text className='px-5'>전화</InputGroup.Text>
                <Form.Control name="phone" value={phone} onChange={onChangeForm}/>
              </InputGroup>
              <InputGroup className='mb-2'>
                <InputGroup.Text className='px-5'>주소</InputGroup.Text>
                <Form.Control name="address1" value={address1} onChange={onChangeForm}/>
                <Button>검색</Button>
              </InputGroup>
              <Form.Control name="address2" value={address2} onChange={onChangeForm} placeholder='상세주소'/>
              <div className='text-center mt-3'>
                <Button type="submit" className='px-5'>등록</Button>
                <Button type="reset" className='px-5 ms-3' variant='secondary'>취소</Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default MyPage