import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const UpdatePage = () => {
  const {bid} = useParams();
  const [form, setForm] = useState({
    bid: bid,
    title:'',
    contents:''
  });
  const {title, contents} = form;

  const callAPI = async() => {
    const res=await axios.get(`/bbs/${bid}`);
    setForm(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>게시글수정</h1>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          <form>
            <Form.Control value={title} name="title"
              className='mb-2'/>
            <Form.Control value={contents} name="contents"
              as="textarea" rows={10}/>
            <div className='text-center mt-3'>
              <Button className='px-5 me-2'>수정</Button>
              <Button className='px-5' variant='secondary'>취소</Button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  )
}

export default UpdatePage