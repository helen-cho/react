import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalPhoto = () => {
  const [fileName, setFileName] = useState('');
  const refPhoto = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const style={
    width: '150px',
    borderRadius:'50%',
    cursor:'pointer',
    border: '1px solid gray'
  }
  const onChageFile = (e) => {
    setFileName(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <img src="http://via.placeholder.com/50x50" onClick={handleShow} width="50px"/>
      <Modal style={{top:'30%'}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>사진변경</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <img onClick={()=>refPhoto.current.click()}
            src={fileName || "http://via.placeholder.com/150x150"} style={style}/>
          <input onChange={onChageFile}
            ref={refPhoto} type="file" style={{display:'none'}}/>
        </Modal.Body>
        <Modal.Footer className='text-center'>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPhoto