import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import {Col, Row, Card, InputGroup, Form, Button} from 'react-bootstrap'
import AddressModal from '../common/AddressModal';
import PassModal from './PassModal';
import { UserContext } from '../../contexts/UserContext';

const ReadPage = () => {
  const {user, setUser} = useContext(UserContext);
  const refFile = useRef();
  const photoStyle={
    borderRadius:'10px',
    cursor:'pointer',
    border:'1px solid gray'
  }

  const [old, setOld] = useState('');
  //const [user, setUser] = useState('');
  const uid=sessionStorage.getItem('uid');
  const {uname, address1, address2, phone, photo}= user;

  const [image, setImage] = useState({
    fileName: '',
    file:null
  });

  const onChangeFile = (e) => {
    setImage({
      fileName:URL.createObjectURL(e.target.files[0]),
      file:e.target.files[0]
    });
  }
  const {file, fileName} = image;

  const callAPI = async() => {
    const res=await axios.get(`/users/${uid}`);
    console.log(res.data);
    setUser(res.data);
    setOld(res.data);
    setImage({file:null, fileName:res.data.photo && `/display?file=${res.data.photo}`});
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onChangeForm = (e) => {
    setUser({...user, [e.target.name]:e.target.value});
  }

  const onInsert = async() => {
    if(JSON.stringify(old)===JSON.stringify(user)) return;
    if(!window.confirm('변경된 정보를 수정하실래요?')) return;
    await axios.post('/users/update', user);
    alert("정보수정완료!");
    callAPI();
  }

  const onUploadImage = async() => {
    if(file) {
      if(!window.confirm("변경된 이미지를 저장하실래요?")) return;
      //이미지업로드
      const formData = new FormData();
      formData.append("file", file);
      const config = {
        Headers:{'content-type':'multipart/form-data'}
      };
      await axios.post(`/users/photo/${uid}`, formData, config);
      alert("이미지가 변경되었습니다!");
      callAPI();
    }
  }

  return (
    <Row className='my-5 justify-content-center'>
      <Col xs={12} md={10} lg={8}>
        <Card>
          <Card.Header>
            <h3 className='text-center'>사용자정보</h3>
          </Card.Header>
          <Card.Body>
              <Row className='mb-3'>
                <Col md={3} className='align-items-center my-3 text-center'>
                    <img style={photoStyle} onClick={()=>refFile.current.click()} 
                      src={fileName || 'http://via.placeholder.com/50x50'} width='100%'/>
                    <input ref={refFile}
                      type="file" onChange={onChangeFile} style={{display:'none'}}/>
                    <Button onClick={onUploadImage}
                      className='w-100 mt-1' size='sm'>이미지저장</Button>    
                </Col> 
                <Col>
                  <div className="text-end mb-2" style={{fontSize:'12px'}}>가입일: {user.regDate}</div>
                  <InputGroup className='mb-2'>
                    <InputGroup.Text>이름</InputGroup.Text>
                    <Form.Control name="uname" onChange={onChangeForm} value={uname}/>
                    <PassModal/>
                  </InputGroup>
                  <InputGroup className='mb-2'>
                    <InputGroup.Text>전화</InputGroup.Text>
                    <Form.Control name="phone" onChange={onChangeForm} value={phone}/>
                  </InputGroup>
                  <InputGroup className='mb-2'>
                    <InputGroup.Text>주소</InputGroup.Text>
                    <Form.Control name="address1" onChange={onChangeForm} value={address1}/>
                    <AddressModal setForm={setUser} form={user}/>
                  </InputGroup>
                  <Form.Control name="address2" onChange={onChangeForm} value={address2} placeholder='상세주소'/>
                  <div className='text-center mt-3'>
                    <Button onClick={onInsert}
                      className='me-2'>정보수정</Button>
                    <Button variant='secondary'>수정취소</Button>
                  </div>
                </Col>
              </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ReadPage