import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'

const ReadPage = () => {
  const navi = useNavigate();
  const [bbs, setBbs] = useState('');
  const {bid} = useParams()
  const callAPI = async() => {
    const res = await axios.get(`/bbs/${bid}`);
    //console.log(res.data);
    setBbs(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onDelete = async() => {
    if(!window.confirm(`${bid}번 게시글을 삭제하실래요?`)) return;
    const res=await axios.delete(`/bbs/${bid}`)
    if(res.data === 'success'){
      alert("삭제성공!");
      navi('/bbs')
    }else{
      alert("삭제실패!");
    }
  }

  const onUpdate = () => {
    navi(`/bbs/update/${bid}`);
  }

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>게시글정보</h1>
      <div className='text-end'>
        <Button onClick={onUpdate} className='btn-sm'>수정</Button>
        <Button onClick={onDelete} className='btn-sm ms-2' variant='danger'>삭제</Button>
      </div>
      <div>
        <h5>[{bid}] {bbs.title}</h5>
        <hr/>
        <div style={{whiteSpace:'pre-wrap'}}>{bbs.contents}</div>
      </div>
    </div>
  )
}

export default ReadPage