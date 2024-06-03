import React, { useEffect, useState } from 'react'
import {Table, Alert} from 'react-bootstrap'

const OrderPage = ({books, setBooks}) => {
  const [total, setTotal] = useState(0);

  useEffect(()=>{
    const data=books.filter(book=>book.checked);
    let totalSum=0;
    data.forEach(book=>{
      if(book.checked) totalSum += book.price*book.qnt;
    });
    setTotal(totalSum);
    setBooks(data);
  }, []);

  return (
    <div>
      <h1 className='text-center mb-5'>주문하기</h1>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center'>
            <td>ID.</td>
            <td>제목</td>
            <td>가격</td>
            <td>수량</td>
            <td>금액</td>
          </tr>
        </thead>
        <tbody>
          {books.map(book=>
            <tr key={book.bid}>
              <td className='text-center'>{book.bid}</td> 
              <td>
                <img src={book.image} width="30px"/>
                <span className='mx-2'>{book.title}</span>
              </td>
              <td className='text-end'>{book.fmtprice}원</td>
              <td className='text-end'>{book.qnt}개</td>
              <td className='text-end'>{book.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Alert className='text-end'>주문합계: {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Alert>
    </div>
  )
}

export default OrderPage