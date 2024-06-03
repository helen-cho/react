import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {Row, Col, Card, Button, Tab, Tabs } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ReviewPage from './ReviewPage';
import { CountContext } from '../CountContext';

const ReadPage = () => {
  const {bid} = useParams();
  const {pathname} = useLocation();
  //console.log(pathname);
  const {setCount, count, getUserCount} = useContext(CountContext);

  const uid=sessionStorage.getItem('uid');
  const [book, setBook] = useState({
    bid:'',
    author:'',
    title:'',
    bigimage:'',
    contents:'',
    isbn:'',
    fmtdate:'',
    fmtprice:'',
    publisher:'',
    lcnt:'',
    ucnt:''
  });
  const {author, title, bigimage, contents, isbn, fmtdate, 
    lcnt, ucnt, fmtprice, publisher} = book;
  
  const callAPI = async() => {
    const res=await axios.get(`/books/read/${bid}?uid=${uid}`);
    console.log(res.data);
    setBook(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onLikeInsert = async(bid)=> {
    if(uid){
      //좋아요저장
      const res=await axios.post('/books/likes/insert', {bid, uid});
      if(res.data.result===1){
        callAPI();
      }
    }else{
      sessionStorage.setItem('target', pathname);
      window.location.href='/users/login'
    }
  }

  const onLikeCancel = async(bid)=> {
    const res=await axios.post('/books/likes/delete', {bid, uid});
    if(res.data.result===1){
      callAPI();
    }
  }

  const onClickCart = ()=>{
    
  };

  return (
    <Row className='my-5 justify-content-center'>
      <Col xs={12} md={10} lg={8}>
        <Card>
          <Card.Body>
            <Row>
              <Col md={6} className='text-center mt-3'>
                <img src={bigimage || "http://via.placeholder.com/120x170"} width="100%"/>
              </Col>
              <Col className='my-3 align-self-center'>
                <div>
                  <span className='me-2'>[{bid}] {title}</span>
                  {ucnt === 0 ?
                    <FaRegHeart onClick={()=>onLikeInsert(bid)} className='heart'/>
                    :
                    <FaHeart onClick={()=>onLikeCancel(bid)} className='heart'/>
                  }
                  <span style={{fontSize:'10px'}}>{lcnt}</span>
                </div>
                <hr/>
                <div className='mb-3'>저자: {author}</div>
                <div className='mb-3'>출판사: {publisher}</div>
                <div className='mb-3'>ISBN: {isbn}</div>
                <div className='mb-3'>가격: {fmtprice}원</div>
                <div className='mb-3'>수정일: {fmtdate}</div>
                <hr/>
                <div className='mt-3'>
                  <Button onClick={()=>getUserCount()} className='px-3 me-2' variant='warning'>바로구매</Button>
                  <Button onClick={()=>setCount(count+1)}
                    className='px-3' variant='success'>장바구니</Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Row className='my-5 justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          <Tabs
            defaultActiveKey="home"
            id="fill-tab-example"
            className="mb-3">
            <Tab eventKey="home" title="리뷰">
                <ReviewPage bid={bid}/>
            </Tab>
            <Tab eventKey="profile" title="상세설명">
                <div style={{whiteSpace:'pre-wrap'}}>{contents}</div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Row>
  )
}

export default ReadPage