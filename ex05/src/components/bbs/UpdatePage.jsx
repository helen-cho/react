import React from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'

const UpdatePage = () => {
  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>게시글수정</h1>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          <form>
            <Form.Control className='mb-2'/>
            <Form.Control as="textarea" rows={10}/>
            <div className='text-center mt-3'>
              <Button className='px-5 me-2'>수정</Button>
              <Button className='px-5' variant='secondary'>취소</Button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  )
}

export default UpdatePage