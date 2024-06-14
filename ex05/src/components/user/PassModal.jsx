import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { InputGroup, Form } from 'react-bootstrap';

const PassModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        비밀번호변경
      </Button>

      <Modal
        show={show} style={{top:'30%'}}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className='mb-2'>
            <InputGroup.Text>현재비밀번호</InputGroup.Text>
            <Form.Control/>
          </InputGroup>
          <InputGroup className='mb-2'>
            <InputGroup.Text>새&nbsp;&nbsp;&nbsp;&nbsp;비밀번호</InputGroup.Text>
            <Form.Control/>
          </InputGroup>
          <InputGroup className='mb-2'>
            <InputGroup.Text>비밀번호확인</InputGroup.Text>
            <Form.Control/>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PassModal