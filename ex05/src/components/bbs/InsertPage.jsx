import React from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'

const InsertPage = () => {
  return (
    <div className='my-5'>
      <h1 className='text-center mb-2'>글쓰기</h1>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          <form>
            <Form.Control placeholder='제목을 입력하세요.' className='mb-2'/>
            <Form.Control as="textarea" rows={10} placeholder='내용을 입력하세요.'/>
            <div className='mt-3 text-center'>
              <Button className='px-5 me-2'>등록</Button>
              <Button className='px-5' variant='secondary'>취소</Button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  )
}

export default InsertPage