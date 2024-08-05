import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, InputGroup, Form, Button, Card} from 'react-bootstrap'
import Detail from './Detail';

const UpdatePage = () => {
  const [loading, setLoading] = useState(false);
  const refFile=useRef(null);
  const [file, setFile] = useState({
    name:'',
    byte:null
  });

  const {gid} = useParams();
  const [good, setGood] = useState('');
  const [form, setForm] = useState({
    title:'',
    price:0,
    image:'',
    maker:'',
    brand:'',
  });
  const {title, price, image, maker, brand} = form;

  const callAPI = async() => {
    setLoading(true);
    const res=await axios.get(`/goods/read/${gid}`);
    //console.log(res.data);
    const data={...res.data,
        price:res.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        contents:res.data.contents || ''
    }
    setForm(data);
    setGood(data);
    setFile({name:res.data.image, byte:null});
    setLoading(false);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onChangeForm = (e) => {
    if(e.target.name==='price'){
      let price=e.target.value.replace(/[^0-9]/g,''); //숫자만입력
      price=price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //세자리 컴마
      setForm({...form, price});
    }else{
      setForm({...form, [e.target.name]:e.target.value});
    }
  }

  const onClickReset = () =>{
    if(JSON.stringify(good) === JSON.stringify(form)) return;
    if(!window.confirm('변경된 정보를 취소하실래요?')) return;
    callAPI();
  }

  const onClickUpdate = async() => {
    if(JSON.stringify(good) === JSON.stringify(form)) return;
    if(!window.confirm('변경된 정보를 저장하실래요?')) return;
    await axios.post('/goods/update', {...form, price:price.replace(',','')});
    callAPI();
    alert('저장완료');
  }

  const onChangeFile = (e) => {
    setFile({
      name:URL.createObjectURL(e.target.files[0]),
      byte:e.target.files[0]
    });
  }

  const onClickImageSave = async() => {
    if(file.byte==null) return;
    if(!window.confirm('변경된 이미지를 저장하실래요?')) return;
    //이미지업로드
    const formData=new FormData();
    formData.append("byte", file.byte);
    await axios.post(`/goods/update/image/${gid}`, formData);
    alert("이미지변경완료!");
    //callAPI();
  }

  if(loading) return <h1 className='text-center'>로딩중...</h1>
  return (
    <div style={{marginBottom:'500px'}}>
      <h1 className='text-center my-5'>상품정보수정</h1>
        <Card className='my-5'>
          <Card.Body>
            <Row className='justify-content-center'>
              <Col md={4} lg={3} className='mb-3'>
                <img onClick={()=>refFile.current.click()}
                  src={file.name || 'http://via.placeholder.com/150x170'} width='100%' style={{cursor:'pointer'}}/>
                <input ref={refFile}
                  type="file" onChange={onChangeFile} style={{display:'none'}}/>
                <div className='text-center'>
                  <Button onClick={onClickImageSave}
                    className='px-5 my-5'>이지지저장</Button>
                </div>
              </Col>
              <Col className='mt-3'>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>상품코드</InputGroup.Text>
                  <Form.Control value={gid} name='gid' readOnly={true}/>
                </InputGroup>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>상품이름</InputGroup.Text>
                  <Form.Control onChange={onChangeForm}
                    value={title} name='title'/>
                </InputGroup>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>상품가격</InputGroup.Text>
                  <Form.Control onChange={onChangeForm}
                    value={price} name='price'/>
                </InputGroup>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>제조사명</InputGroup.Text>
                  <Form.Control onChange={onChangeForm}
                    value={maker} name='maker'/>
                </InputGroup>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>브랜드명</InputGroup.Text>
                  <Form.Control onChange={onChangeForm}
                    value={brand} name='brand'/>
                </InputGroup>
                <div className='text-center my-3'>
                  <Button onClick={onClickUpdate}
                    className='me-2'>정보수정</Button>
                  <Button onClick={onClickReset}
                    variant='secondary'>수정취소</Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Detail form={form} setForm={setForm} callAPI={callAPI} good={good}/>
    </div>
  )
}

export default UpdatePage