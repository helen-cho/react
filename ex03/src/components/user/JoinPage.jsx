import React from 'react'
import {Row, Col, InputGroup, Form, Button, Card} from 'react-bootstrap'

const JoinPage = () => {
  return (
    <Row className='justify-content-center my-5 userLogin'>
    <Col xs={8} md={6} lg={5}>
      <Card>
        <Card.Header>
          <h3 class="text-center">회원가입</h3>
        </Card.Header>
        <Card.Body>
          <form>
            <InputGroup className='mb-2'>
              <InputGroup.Text className="title justify-content-center">이메일</InputGroup.Text>
              <Form.Control name="email"/>
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Text className="title justify-content-center">비밀번호</InputGroup.Text>
              <Form.Control name="pass" type="password"/>
            </InputGroup>
            <Button className='w-100' type="submit">회원가입</Button>
          </form>
        </Card.Body>
      </Card>
    </Col>
  </Row>
  )
}

export default JoinPage