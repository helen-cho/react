import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

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
    publisher:''
  });
  const {author, title, bigimage, contents, isbn, fmtdate, fmtprice, publisher} = book;
  
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
              <Col md={6} className='text-center'>
                <img src={bigimage || "http://via.placeholder.com/120x170"} width="80%"/>
              </Col>
              <Col className='my-3'>
                <div><h5>[{bid}] {title}</h5></div>
                <hr/>
                <div>저자: {author}</div>
                <div>출판사: {publisher}</div>
                <div>ISBN: {isbn}</div>
                <div>가격: {fmtprice}원</div>
                <div>수정일: {fmtdate}</div>
                <div className='text-center mt-3'>
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