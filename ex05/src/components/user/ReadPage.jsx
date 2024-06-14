import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Col, Row, Card, InputGroup, Form, Button} from 'react-bootstrap'
import AddressModal from '../common/AddressModal';

const ReadPage = () => {
  const [user, setUser] = useState('');
  const uid=sessionStorage.getItem('uid');
  const {uname, address1, address2, phone, photo}= user;

  const callAPI = async() => {
    const res=await axios.get(`/users/${uid}`);
    console.log(res.data);
    setUser(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onChangeForm = (e) => {
    setUser({...user, [e.target.name]:e.target.value});
  }

  const onInsert = async() => {
    if(!window.confirm('변경된 정보를 수정하실래요?')) return;
    await axios.post('/users/update', user);
    alert("정보수정완료!");
  }

  return (
    <Row className='my-5 justify-content-center'>
      <Col xs={12} md={10} lg={8}>
        <Card>
          <Card.Header>
            <h3 className='text-center'>사용자정보</h3>
          </Card.Header>
          <Card.Body>
              <Row className='mb-3'>
                <Col md={3} className='align-items-center mb-3'>
                    <div style={{fontSize:'13px'}}>{user.regDate}</div>
                    <img src={photo || 'http://via.placeholder.com/50x50'} width='100%'/>
                </Col>
                <Col>
                  <InputGroup className='mb-2'>
                    <InputGroup.Text>이름</InputGroup.Text>
                    <Form.Control name="uname" onChange={onChangeForm} value={uname}/>
                  </InputGroup>
                  <InputGroup className='mb-2'>
                    <InputGroup.Text>전화</InputGroup.Text>
                    <Form.Control name="phone" onChange={onChangeForm} value={phone}/>
                  </InputGroup>
                  <InputGroup className='mb-2'>
                    <InputGroup.Text>주소</InputGroup.Text>
                    <Form.Control name="address1" onChange={onChangeForm} value={address1}/>
                    <AddressModal setForm={setUser} form={user}/>
                  </InputGroup>
                  <Form.Control name="address2" onChange={onChangeForm} value={address2} placeholder='상세주소'/>
                  <div className='text-center mt-3'>
                    <Button onClick={onInsert}
                      className='me-2'>정보수정</Button>
                    <Button variant='secondary'>수정취소</Button>
                  </div>
                </Col>
              </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ReadPage