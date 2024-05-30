import axios from 'axios';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalPhoto = ({uid, photo, callAPI}) => {
  const ref_photo = useRef();
  const style={
    borderRadius:'50%',
    border:'1px solid gray',
    cursor:'pointer'
  }

  const [image, setImage] = useState({
    name:'',
    file:null
  });
  const {name, file}= image;

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    setShow(true);
    setImage({
      name:photo,
      file:null
    });
  }

  const onChangeFile = (e) => {
    setImage({
      name:URL.createObjectURL(e.target.files[0]),
      file:e.target.files[0]
    })
  }

  const onClickSave = async() => {
    if(!file) {
      alert("변경할 사진을 선택하세요!");
      return;
    }
    if(!window.confirm(uid + "사진을 선택한 사진으로 변경하실래요?")) return;

    //사진저장(업로드)
    const data = new FormData();
    data.append("file", file);
    data.append("uid", uid);
    const res=await axios.post('/users/photo', data);
    if(res.data.result===1){
      handleClose();
      callAPI();
    }

  }

  return (
    <>
      <img onClick={handleShow}
        src={photo || "http://via.placeholder.com/200x200"} width="90%"/>
      <Modal style={{top:'30%'}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>사진변경</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
         <img onClick={()=>ref_photo.current.click()} 
            src={name || "http://via.placeholder.com/200x200"} width="70%" style={style}/>
         <input onChange={onChangeFile} type="file" ref={ref_photo} style={{display:'none'}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button onClick={onClickSave}
            variant="primary">저장</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPhoto