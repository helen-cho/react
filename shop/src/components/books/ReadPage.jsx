import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ReadPage = () => {
  const {bid} = useParams();
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

  return (
    <Row className='my-5 justify-content-center'>
      <Col xs={12} md={10} lg={8}>
        <Card>
          <Card.Body>
            <Row>
              <Col md={6} className='text-center mt-3'>
                <img src={bigimage || "http://via.placeholder.com/120x170"} width="80%"/>
              </Col>
              <Col className='my-3'>
                <div>
                  <span className='me-2'>[{bid}] {title}</span>
                  {ucnt === 0 ?
                    <FaRegHeart className='heart'/>
                    :
                    <FaHeart className='heart'/>
                  }
                  <span style={{fontSize:'12px'}}>{lcnt}</span>
                </div>
                <hr/>
                <div className='mb-2'>저자: {author}</div>
                <div className='mb-2'>출판사: {publisher}</div>
                <div className='mb-2'>ISBN: {isbn}</div>
                <div className='mb-2'>가격: {fmtprice}원</div>
                <div className='mb-2'>수정일: {fmtdate}</div>
                <hr/>
                <div className='mt-3'>
                  <Button className='px-3 me-2' variant='warning'>바로구매</Button>
                  <Button className='px-3' variant='success'>장바구니</Button>
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