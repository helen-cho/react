import React from 'react'
import {Row, Col, Form, InputGroup, Card, Button} from 'react-bootstrap'
const UpdatePage = () => {
  return (
    <Row className='my-5 justify-content-center'>
      <Col xs={12} md={10} lg={8}>
        <Card>
          <Card.Header>
            <h3 className='text-center'>도서정보수정</h3>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={2} className='mb-2 text-center pt-2'>
                <img src="http://via.placeholder.com/120x170" width="100%"/>
              </Col>
              <Col className='my-2'>
                  <InputGroup className='mb-2'>
                    <InputGroup.Text>도서제목</InputGroup.Text>
                    <Form.Control/>
                  </InputGroup>
                  <InputGroup className='mb-2'>
                    <InputGroup.Text>도서가격</InputGroup.Text>
                    <Form.Control/>
                  </InputGroup>
                  <InputGroup className='mb-2'>
                    <InputGroup.Text>도서저자</InputGroup.Text>
                    <Form.Control/>
                  </InputGroup>
              </Col>
              <div className='p-3'>
                <Form.Control as="textarea" rows={10}/>
              </div>  
              <div className='text-center'>
                <Button className='me-2'>정보수정</Button>
                <Button variant='secondary'>수정취소</Button>
              </div>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default UpdatePage