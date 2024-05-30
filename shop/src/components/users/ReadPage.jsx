import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Card, Form, InputGroup, Button} from 'react-bootstrap'
import ModalAddress from './ModalAddress';
import ModalPhoto from './ModalPhoto';

const ReadPage = () => {
  const uid=sessionStorage.getItem('uid');
  const [form, setForm] = useState({
    uid: uid,
    uname:'',
    phone:'',
    address1:'',
    address2:'',
    photo:''
  });
  const {uname, phone, address1, address2, photo} = form;

  const callAPI = async() => {
    const url=`/users/read/${uid}`;
    const res=await axios.get(url);
    setForm(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);
  
  const onChangeForm = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(uname==="") {
      alert("이름을 입력하세요!");
      return;
    }
    if(!window.confirm("수정하신 정보를 저장하실래요?")) return;
    //수정처리
    const url='/users/update';
    const res=await axios.post(url, form);
    if(res.data.result==1){
      alert("정보수정완료!");
      callAPI();
    }
  }

  return (
    <Row className='justify-content-center my-5 readPage'>
      <Col xs={12} md={10} lg={8}>
        <Card>
          <Card.Header>
            <h3 className='text-center'>마이페이지</h3>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={3} className='mt-5'>
                <ModalPhoto uid={uid} photo={photo} callAPI={callAPI}/>
              </Col>
              <Col className='my-5'>
                <form onSubmit={onSubmit}>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text className='title justify-content-center'>이름</InputGroup.Text>
                      <Form.Control onChange={onChangeForm}
                        name="uname" value={uname}/>
                    </InputGroup>              
                    <InputGroup className='mb-2 justify-content-center'>
                      <InputGroup.Text className='title justify-content-center'>전화</InputGroup.Text>
                      <Form.Control onChange={onChangeForm}
                        name="phone" value={phone}/>
                    </InputGroup>
                    <InputGroup className='mb-1'>
                      <InputGroup.Text className='title justify-content-center'>주소</InputGroup.Text>
                      <Form.Control onChange={onChangeForm}
                        name="address1" value={address1}/>
                      <ModalAddress form={form} setForm={setForm}/>
                    </InputGroup>
                    <Form.Control onChange={onChangeForm}
                      name="address2" value={address2} placeholder='상세주소'/>
                    <div className='text-center mt-3'>
                      <Button className='me-2' type="submit">정보수정</Button>
                      <Button onClick={callAPI}
                        variant='secondary'>수정취소</Button>
                    </div>
                  </form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ReadPage