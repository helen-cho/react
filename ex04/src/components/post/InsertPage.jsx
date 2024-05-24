import React, { useState } from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const InsertPage = () => {
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const db = getFirestore(app);
  const [form, setForm] = useState({
    title:'',
    body:''
  });
  const {title, body} = form;
  const onChangeForm = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }
  const onSubmit = async(e) => {
    e.preventDefault();
    if(title===""){
      alert("제목을 입력하세요!");
      return;
    }
    if(!window.confirm("게시글을 등록하실래요?")) return;
    //게시글등록
    const now=new Date();
    const date=moment(now).format('YYYY-MM-DD HH:mm:ss');
    const email=sessionStorage.getItem('email');
    setLoading(true);
    await addDoc(collection(db, 'posts'), {...form, date, email});
    setLoading(false);
    navi('/post/list');
  }

  if(loading) return <h1 className='my-5 text-center'>로딩중......</h1>
  return (
    <div className='my-5'>
      <h1 className='text-center mb-3'>글쓰기</h1>
      <Row className='justify-content-center'>
        <Col xs={10} md={8} lg={7}>
          <form onSubmit={onSubmit}>
            <Form.Control name="title" value={title} onChange={onChangeForm}
              placeholder='제목을 입력하세요.' className='mb-2'/>
            <Form.Control name="body" value={body} onChange={onChangeForm}
              placeholder='내용을 입력하세요.' as="textarea" rows={10}/>
            <div className='text-center my-3'>
              <Button type="submit" className='px-5'>등록</Button>
              <Button className='px-5 ms-2' variant='secondary'>취소</Button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  )
}

export default InsertPage