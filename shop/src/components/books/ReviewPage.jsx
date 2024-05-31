import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewPage = ({bid}) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [count, setCount] = useState(0);
  const [reviews, setReviews] = useState([]);

  const [contents, setContents] = useState('');
  const navi = useNavigate();
  const uid=sessionStorage.getItem('uid');
  const {pathname} = useLocation();

  const callAPI = async() => {
    const res=await axios.get(`/review/list/${bid}?page=${page}&size=${size}`);
    console.log(res.data);
    setCount(res.data.count);
    const data=res.data.documents.map(doc=>doc && {...doc, ellip:true});
    setReviews(data);
  }

  const onClickContents = (rid) => {
    const data=reviews.map(doc=>doc.rid===rid ? {...doc, ellip:!doc.ellip}: doc);
    setReviews(data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

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
        callAPI();
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
      <div className='my-5'>
        {reviews.map(r=>
          <div key={r.rid}>
            <Row>
              <Col className='text-muted' style={{fontSize:'12px'}}>
                <img src={r.photo || 'http://via.placeholder.com/30x30'} 
                    width="30px" style={{borderRadius:'50%'}}/>
                <span className='mx-3'>{r.uname}({r.uid})</span>
                <span>{r.fmtdate}</span>
              </Col>
            </Row>
            <div onClick={()=>onClickContents(r.rid)}
              className={r.ellip && "ellipsis2"} style={{whiteSpace:'pre-wrap',cursor:'pointer'}}>
              {r.contents}
            </div>
            <hr/>  
          </div>  
        )}
      </div>
    </div>
  )
}

export default ReviewPage