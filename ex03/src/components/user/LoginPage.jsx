import React from 'react'
import {Row, Col, InputGroup, Form, Button, Card} from 'react-bootstrap'

const LoginPage = () => {
  return (
    <Row className='justify-content-center my-5 userLogin'>
      <Col xs={8} md={6} lg={5}>
        <Card>
          <Card.Header>
            <h3 class="text-center">로그인</h3>
          </Card.Header>
          <Card.Body>
            <form>
              <InputGroup className='mb-2'>
                <InputGroup.Text className="title justify-content-center">아이디</InputGroup.Text>
                <Form.Control/>
              </InputGroup>
              <InputGroup className='mb-3'>
                <InputGroup.Text className="title justify-content-center">비밀번호</InputGroup.Text>
                <Form.Control/>
              </InputGroup>
              <Button className='w-100'>로그인</Button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default LoginPage