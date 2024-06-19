import React, { useContext, useState } from 'react'
import {Row, Col, Form, Button, InputGroup} from 'react-bootstrap'
import { BoxContext } from '../../contexts/BoxContext';

const InsertPage = () => {
  const {setBox} = useContext(BoxContext);
  const [sname, setSname] = useState('');

  const onSubmit = () => {
    if(sname=='') {
      setBox({
        show:true,
        message:'학생이름을 입력하세요!',
      });
    }
  }

  return (
    <Row className='justify-content-center'>
      <h1 className='text-center mb-5'>학생등록</h1>
      <Col sm={6}>
        <InputGroup className='mb-2'>
          <InputGroup.Text>학생학과</InputGroup.Text>
          <Form.Select>
            <option>전산</option>
            <option>전기</option>
            <option>건축</option>
          </Form.Select>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>학생이름</InputGroup.Text>
          <Form.Control value={sname} onChange={(e)=>setSname(e.target.value)}/>
        </InputGroup>
        <div className='text-center my-3'>
          <Button onClick={onSubmit}
            variant='outline-primary' className='me-2'>학생등록</Button>
          <Button variant='outline-secondary'>등록취소</Button>
        </div>
      </Col>
    </Row>
  )
}

export default InsertPage