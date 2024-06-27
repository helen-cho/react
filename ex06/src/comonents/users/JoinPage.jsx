import React from 'react'
import {Row, Col, Card, Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const JoinPage = () => {
  return (
    <Row className='justify-content-center my-5'>
      <Col xs={8} md={6} lg={4}>
        <Card>
          <Card.Header><h3 className='text-center'>회원가입</h3></Card.Header>
          <Card.Body>
            <form>
              <Form.Control placeholder='아이디' className='mb-2'/>
              <Form.Control placeholder='비밀번호' className='mb-2'/>
              <Form.Control placeholder='성명' className='mb-2'/>
              <Button className='w-100'>회원가입</Button>
            </form>
            <div className='mt-2 text-end'>
              <Link to='/users/login'>로그인</Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default JoinPage