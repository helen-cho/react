import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Box = ({box, setBox}) => {
  const onClose = () => {
    setBox({...box, show:false});
  }
  return (
    <>
      <Modal
        style={{top:'30%'}}
        show={box.show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>질의</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {box.message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>
            아니오
          </Button>
          <Button variant="outline-primary" className='px-4'>예</Button>
        </Modal.Footer>
      </Modal>
  </>
  )
}

export default Box