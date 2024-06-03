import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Button, Alert } from 'react-bootstrap';
const CartPage = () => {
  const [total, setTotal] = useState(0);
  const [books, setBooks] = useState([]);
  const uid=sessionStorage.getItem('uid');

  const callAPI = async() => {
    const res=await axios.get(`/cart/list?uid=${uid}`);
    const data=res.data.map(book=>book && {...book, sum:book.qnt*book.price});
    setBooks(data);

    let totalSum=0;
    data.forEach(book=>{
      totalSum+=book.sum;
    });
    setTotal(totalSum);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <Row className='justify-content-center my-5'>
      <Col xs={12} md={10} lg={8}>
        <h1 className='text-center mb-3'>장바구니</h1>
        <Table striped bordered hover>
          <thead>
            <tr className='text-center'>
              <td>ID.</td>
              <td>도서명</td>
              <td>가격</td>
              <td>수량</td>
              <td>금액</td>
            </tr>  
          </thead>
          <tbody>
            {books.map(book=>
              <tr key={book.bid}>
                <td>{book.bid}</td>
                <td>
                  <img src={book.image} width="30px"/>
                  <span className='mx-2'>{book.title}</span>
                </td>
                <td>{book.fmtprice}원</td>
                <td>{book.qnt}</td>
                <td>{book.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Alert className='text-end'>총합계: {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Alert>
      </Col>
    </Row>
  )
}

export default CartPage