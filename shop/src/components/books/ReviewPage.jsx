import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import '../Paging.css';
import Pagination from 'react-js-pagination';

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
    
    //리뷰가 하나도 없는경우
    if(!res.data.documents){
      setReviews([]);
    }else{  
      setCount(res.data.count);
      //현재페이지가 마지막 페이지보다 크면 페이지를 1감소시킨다.
      if(page> Math.ceil(res.data.count/size)) setPage(page-1);
      const data=res.data.documents.map(doc=>doc && 
            {...doc, ellip:true, isEdit:false, text:doc.contents});
      setReviews(data);
    }
  }

  const onClickContents = (rid) => {
    const data=reviews.map(doc=>doc.rid===rid ? {...doc, ellip:!doc.ellip}: doc);
    setReviews(data);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

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
        setPage(1);
        callAPI();
      }
    }
  }
  
  const onClickDelete = async(rid) => {
    if(!window.confirm(`${rid}번 댓글을 삭제하실래요?`)) return;
    const res=await axios.post(`/review/delete/${rid}`);
    if(res.data.result===1){
      callAPI();
    }
  }

  const onClickUpdate = (rid) => {
    const data=reviews.map(doc=>doc.rid===rid ? {...doc, isEdit:true} : doc);
    setReviews(data);
  }

  const onClickCancel = (rid, contents, text) => {
    if(contents !== text) {
      if(!window.confirm("정말로 취소하실래요")) return;
    }
    const data=reviews.map(doc=>doc.rid===rid ? 
      {...doc, isEdit:false, contents:doc.text, ellip:true} : doc);
    setReviews(data);
    
  }

  const onChagenForm = (e, rid) => {
    const data=reviews.map(doc=>doc.rid===rid ?{...doc, contents:e.target.value}: doc);
    setReviews(data);
  }

  const onClickSave = async(rid, contents, text)=>{
    if(contents===""){
      alert("리뷰내용을 입력하세요!");
      return;
    }

    if(contents === text){
      const data=reviews.map(doc=>doc.rid===rid?
              {...doc, isEdit:false, ellip:true} : doc);
      setReviews(data);
      return;
    }

    if(!window.confirm(`${rid}번 리뷰를 수정하실래요?`)) return;
    //리뷰수정
    const res=await axios.post('/review/update', {rid, contents});
    if(res.data.result===1){
      callAPI();
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
              {(uid===r.uid && !r.isEdit) &&
                <Col className='text-end'>
                  <Button onClick={()=>onClickUpdate(r.rid)}
                    variant='outline-secondary' size="sm" className='me-2'>수정</Button>
                  <Button onClick={()=>onClickDelete(r.rid)}
                    variant='outline-secondary' size="sm">삭제</Button>
                </Col>
              }
              {(uid===r.uid && r.isEdit) && 
                <Col className='text-end'>
                  <Button onClick={()=>onClickSave(r.rid, r.contents, r.text)}
                    variant='outline-secondary' size="sm" className='me-2'>저장</Button>
                  <Button onClick={()=>onClickCancel(r.rid, r.contents, r.text)}
                    variant='outline-secondary' size="sm">취소</Button>
                </Col>
              }
            </Row>
            {r.isEdit ? 
              <div className='mt-2'>
                <Form.Control onChange={(e)=>onChagenForm(e, r.rid)}
                  as="textarea" rows={10} value={r.contents}/>
              </div>
            :
              <div onClick={()=>onClickContents(r.rid)} 
                className={r.ellip && "ellipsis2"} style={{whiteSpace:'pre-wrap',cursor:'pointer'}}>
                {r.rid}:{r.contents}
              </div>
            }
            <hr/>  
          </div>  
        )}
      </div>
      {count > size && 
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={ (e)=>setPage(e) }/>
      }
    </div>
  )
}

export default ReviewPage