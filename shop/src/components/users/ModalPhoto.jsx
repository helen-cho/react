import axios from 'axios';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalPhoto = ({uid, photo, callAPI}) => {
  const [fileName, setFileName] = useState(photo);
  const [file, setFile] = useState(null);
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
    setFile(e.target.files[0]);
  }

  const onClickSave = async() => {
    if(!file){
      alert("변경할 이미지를 선택하세요!");
      return;
    }
    if(!window.confirm("변경한 이미지를 저장하실래요?")) return;
    //이미지업로드
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uid', uid);
    const res=await axios.post('/users/photo', formData);

    if(res.data.result==1){
      callAPI();
      handleClose();
    }
  }

  return (
    <>
      <img src={photo || "http://via.placeholder.com/50x50"} onClick={handleShow} width="50px"/>
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
          <Button onClick={onClickSave} variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPhoto