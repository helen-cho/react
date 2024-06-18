import React from 'react'
import {Row, Col} from 'react-bootstrap'
import MessageRouter from '../router/MessageRouter'

const MessagePage = () => {
  return (
    <Row className='my-5'>
      <Col xs={3}>
        <div className='my-2'>
          <a href="/message/insert">메시지작성</a>
        </div>
        <div className='my-2'>
          <a href="/message/receive">받은메시지</a>
        </div>
        <div className='my-2'>
          <a href="/message/send">보낸메시지</a>
        </div>
        <div className='my-2'>
          <a href="/message/delete">휴지통</a>
        </div>
      </Col>
      <Col>
        <MessageRouter/>
      </Col>
    </Row>
  )
}

export default MessagePage