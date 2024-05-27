import React from 'react'
import '../ChatPage.css'
import {Row, Col, Card, Form} from 'react-bootstrap'
const ChatPage = () => {
  return (
    <Row className='justify-content-center my-5'>
      <Col xs={12} md={10} lg={8}>
        <Card>
          <Card.Header>
            <h3>채팅방</h3>
          </Card.Header>
          <Card.Body className='wrap'>
            <div >ChatPage</div>
          </Card.Body>
        <Form.Control style={{ border:'none',outline:'none', padding:'10px', fontSize:'0.8rem', width:'100%' }}
  placeholder='메시지'/>
        </Card>
      </Col>
    </Row>
  )
}

export default ChatPage