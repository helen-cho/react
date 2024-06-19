import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GiConfirmed } from "react-icons/gi";
import { FiAlertCircle } from "react-icons/fi";

const Box = ({box, setBox}) => {
  const style={
    color:'orange',
    fontSize:'3rem'
  }

  const style1={
    color:'red',
    fontSize:'3rem'
  }

  const onClose = () => {
    setBox({...box, show:false});
  }

  const onAction = () => {
    box.action();
    onClose();
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
          <Modal.Title>
            {box.action ? '질의' : '경고'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {box.action ? 
            <GiConfirmed style={style} className='me-2'/> 
              : 
            <FiAlertCircle style={style1} className='me-2'/>
          }
          {box.message}
        </Modal.Body>
        <Modal.Footer>
          {box.action ?
            <>
              <Button variant="outline-secondary" onClick={onClose}>
                아니오
              </Button>
              <Button variant="outline-primary" onClick={onAction} className='px-4'>예</Button>
            </>
            :
            <Button variant='outline-primary' onClick={onClose}>확인</Button>
          }
     </Modal.Footer>
      </Modal>
  </>
  )
}

export default Box