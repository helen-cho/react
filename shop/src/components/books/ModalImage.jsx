import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalImage = ({bigimage}) => {
  const [bigImage, setBigImage] = useState({
    fileName:'',
    file:null
  });
  const {fileName, file} = bigImage;
  const onChangeFile = (e) => {
    setBigImage({
      fileName:URL.createObjectURL(e.target.files[0]),
      file:e.target.files[0]
    });
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <img onClick={handleShow}
        src={bigimage || "http://via.placeholder.com/120x170"} width="100%"/>

      <Modal style={{top:'10%'}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>이미지변경</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <img src={fileName || "http://via.placeholder.com/120x170"} width="80%"/>
          <input type="file" onChange={onChangeFile}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary">저장</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalImage