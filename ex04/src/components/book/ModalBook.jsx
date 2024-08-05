import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap'

const ModalBook = ({book, type}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {title, thumbnail, publisher, contents, price, authors, isbn} = book; //비구조할당
    return (
        <>
          {type==='cart' ?
            <Button onClick={handleShow} size="sm">상세보기</Button>
            :
            <img onClick={handleShow}
              src={thumbnail || 'http://via.placeholder.com/120x170'} width="100%"/> 
          }
 
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false} style={{top:'30%'}} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={3} className='text-center'>
                  <img src={thumbnail || 'http://placeholder.com/120x170'}/>
                </Col>
                <Col className='mt-3'>
                  <div className='mb-2'>ISBN:{isbn}</div>
                  <div className='mb-2'>가격:{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                  <div className='mb-2'>저자:{authors}</div>
                  <div>출판사:{publisher}</div>
                </Col>
              </Row>
              <hr/>
              <div>{contents || '내용없음'}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ModalBook