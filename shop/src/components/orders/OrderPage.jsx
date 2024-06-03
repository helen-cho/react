import React, { useEffect } from 'react'
import {Table} from 'react-bootstrap'

const OrderPage = ({books, setBooks}) => {
  useEffect(()=>{
    const data=books.filter(book=>book.checked);
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
              <td>{book.fmtprice}원</td>
              <td>{book.qnt}개</td>
              <td>{book.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default OrderPage