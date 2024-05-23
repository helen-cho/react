import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalBook = ({book, type}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {title, thumbnail, publisher, contents, price, authors} = book; //비구조할당
    return (
        <>
          {type==='cart' ?
            <Button onClick={handleShow}>상세보기</Button>
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
              <div>가격:{price}원</div>
              <div>저자:{authors}</div>
              <div>출판사:{publisher}</div>
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