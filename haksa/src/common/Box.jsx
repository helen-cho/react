import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiHelpCircle } from "react-icons/fi";
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

  //확인버튼
  const onClose = () => {
    if(box.action2) {
      box.action2();
    }
    setBox({...box, show:false});
  }

  //예버튼
  const onAction = () => {
    box.action();
    onClose();
  }

  //아니오버튼
  const onCancel = () => {
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
          <Modal.Title>
            {box.action ? '질의' : '알림'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {box.action ? 
            <FiHelpCircle style={style} className='me-2'/> 
              : 
            <FiAlertCircle style={style1} className='me-2'/>
          }
          {box.message}
        </Modal.Body>
        <Modal.Footer>
          {box.action ?
            <>
              <Button variant="outline-secondary" onClick={onCancel}>
                아니오
              </Button>
              <Button variant="outline-primary" onClick={onAction} className='px-4'>
                예
              </Button>
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