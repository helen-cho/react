import React from 'react'
import {Row, Col, Card, InputGroup, Form, Button} from 'react-bootstrap'
const LoginPage = () => {
  return (
    <Row className='justify-content-center my-5'>
      <Col xs={10} md={6} lg={4}>
        <Card>
          <Card.Header>
            <h3 className='text-center'>로그인</h3>
          </Card.Header>
          <Card.Body>
            <form>
              <InputGroup className='mb-2'>
                <InputGroup.Text className='title'>아이디</InputGroup.Text>
                <Form.Control/>
              </InputGroup>
              <InputGroup className='mb-4'>
                <InputGroup.Text className='title'>비밀번호</InputGroup.Text>
                <Form.Control/>
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