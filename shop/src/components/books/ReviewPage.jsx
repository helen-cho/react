import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewPage = ({bid}) => {
  const [contents, setContents] = useState('');
  const navi = useNavigate();
  const uid=sessionStorage.getItem('uid');
  const {pathname} = useLocation();

  const onClickRegister = () => {
    sessionStorage.setItem('target', pathname);
    navi('/users/login');
  }

  const onClickInsert = async() => {
    if(contents==="") {
      alert("리뷰내용을 입력하세요!");
    }else{
      //리뷰저장
      const res=await axios.post('/review/insert', {bid, uid, contents});
      if(res.data.result===1){
        alert('리뷰등록성공!');
        setContents("");
      }
    }
  }
  
  return (
    <div className='my-5'>
      {!uid ?
        <div className='text-end'>
          <Button onClick={onClickRegister}
            variant='outline-secondary' className='px-5'>리뷰등록</Button>
        </div>
      :
        <div>
          <Form.Control value={contents} onChange={(e)=>setContents(e.target.value)}
            as="textarea" rows={5} placeholder='내용을 입력하세요!'/>
          <div className='text-end mt-2'>
            <Button onClick={onClickInsert}
              variant='outline-secondary' className='px-5'>등록</Button>
          </div>
        </div>
      }
    </div>
  )
}

export default ReviewPage