import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap';
const CartPage = () => {
  const [books, setBooks] = useState([]);
  const uid=sessionStorage.getItem('uid');

  const callAPI = async() => {
    const res=await axios.get(`/cart/list?uid=${uid}`);
    setBooks(res.data);
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
            <tr>
              <td>ID.</td>
              <td>도서명</td>
              <td>가격</td>
              <td>수량</td>
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
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default CartPage