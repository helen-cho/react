import React from 'react'
import {Row, Col, Card, Form, InputGroup, Button} from 'react-bootstrap'
const LoginPage = () => {
  return (
    <div className='my-5 userLogin'>
      <Row className='justify-content-center' >
        <Col xs={8} md={6} lg={4}>
          <Card>
            <Card.Header><h3 className='text-center'>로그인</h3></Card.Header>
            <Card.Body>
              <form>
                <InputGroup className='mb-2' >
                  <InputGroup.Text className='title justify-content-center'>아이디</InputGroup.Text>
                  <Form.Control placeholder='아이디'/>
                </InputGroup>
                <InputGroup className='mb-2'>
                  <InputGroup.Text className='title justify-content-center'>비밀번호</InputGroup.Text>
                  <Form.Control type="password" placeholder='비밀번호'/>
                </InputGroup>
                <Button className='w-100'>로그인</Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage