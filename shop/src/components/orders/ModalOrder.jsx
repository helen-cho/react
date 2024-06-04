import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalOrder = ({pid}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <>
        <Button variant="primary" onClick={handleShow} size="sm">
          주문상품
        </Button>
        <Modal style={{top:'20%'}}
          show={show} size="lg"
          onHide={handleClose}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>주문상품</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>주문번호:{pid}</div>
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

export default ModalOrder