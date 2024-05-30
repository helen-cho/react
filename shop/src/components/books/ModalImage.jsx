import axios from 'axios';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';

const ModalImage = ({bigimage, callAPI}) => {
  const {bid} = useParams();
  const refImage = useRef(null);
  const style ={
    cursor:'pointer'
  }

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

  const handleClose = () =>{
    setShow(false);
  } 

  const handleShow = () => {
    setShow(true);
    setBigImage({
      file:null,
      fileName:bigimage
    })
  }

  const onClickSave = async() => {
    if(file==null) {
      alert("저장할 이미지를 선택하세요!");
      return;
    }
    if(!window.confirm('이미지를 저장하실래요?')) return;

    //사진저장(업로드);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bid", bid);
    const res = await axios.post('/books/upload', formData);
    if(res.data.result===1){
      alert("이미지변경완료!");
      callAPI();
      handleClose();
    }
  }

  return (
    <>
      <img onClick={handleShow} style={style}
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
          <img style={style} onClick={()=>refImage.current.click()}
            src={fileName || "http://via.placeholder.com/120x170"} width="80%"/>
          <input ref={refImage} type="file" onChange={onChangeFile} style={{display:'none'}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button onClick={onClickSave} variant="primary">저장</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalImage