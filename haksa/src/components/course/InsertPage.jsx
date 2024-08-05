import React, {useContext, useState } from 'react'
import {Row, Col, Button, Form, InputGroup} from 'react-bootstrap'
import { BoxContext } from '../../contexts/BoxContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InsertPage = () => {
  const navi = useNavigate();
  const {setBox} = useContext(BoxContext);
  const [dept, setDept] = useState('전산');
  const [lname, setLname] = useState('');

  const onSubmit = async() => {
    if(lname=='') {
      setBox({show:true, message:'강좌이름을 입력하세요.'});
      return;
    }
    await axios.post('/cou/insert', {dept, lname});
    setBox({
      show:true,
      message:'강좌가 등록되었습니다. 목록페이지로 이동하실래요?',
      action:()=>navi('/cou')
    });
    setLname('');
  }

  return (
    <Row className='justify-content-center'>
      <h1 className='text-center mb-5'>강좌등록</h1>
      <Col xs={12} md={10} lg={8}>
        <InputGroup className='mb-2'>
          <InputGroup.Text>개설학과</InputGroup.Text>
          <Form.Select value={dept} onChange={(e)=>setDept(e.target.value)}>
            <option value='전자'>전자공학과</option>
            <option value='전산'>컴퓨터공학과</option>
            <option value='건축'>건축공학과</option>
            <option value='교양'>교양학부</option>
          </Form.Select>
        </InputGroup>
        <InputGroup className='mb-2'>
          <InputGroup.Text>강좌이름</InputGroup.Text>
          <Form.Control value={lname} onChange={(e)=>setLname(e.target.value)}/>
        </InputGroup>
        <div className='text-center mt-3'>
          <Button onClick={onSubmit}
            variant='outline-primary' className='me-2'>강좌등록</Button>
          <Button variant='outline-secondary'>등록취소</Button>
        </div>
      </Col>
    </Row>
  )
}

export default InsertPage