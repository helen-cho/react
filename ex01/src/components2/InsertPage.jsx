import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import './css/style1.css'

const InsertPage = () => {

  const callAPI = async() => {
    const url="/bbs/list.json?key=uid&word=&page=1&size=3";
    const res=await axios.get(url);
    console.log(res.data);
  }

  useEffect(()=>{
    callAPI();
  },[]);

  const [form, setForm] = useState({
    uid:'red',
    title:'',
    contents:''
  });
  const {uid, title, contents} = form;
  const onChange = (e) => {
    setForm({...form, [e.target.name]:e.target.value})
  }
  const onSubmit = async(e) => {
    e.preventDefault();
    await axios.post('/bbs/insert', form);
    alert("저장완료!");

  }
  return (
    <div className='my-5 back'>
      <form onSubmit={onSubmit}>
        <Form.Control value={title} name="title" onChange={onChange}/><br/>
        <Form.Control as="textarea" rows={10} value={contents} name="contents" onChange={onChange} rows={10}/>
        <div className='text-center mt-3'>
          <Button type="submit" className='px-5'>저장</Button>
        </div>  
      </form>
    </div>
  )
}

export default InsertPage