import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table} from 'react-bootstrap'

const ListPage = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [count, setCount]= useState(0);

  const callAPI = async() => {
    const url=`/books/list?page=${page}&size=${size}`;
    const res=await axios.get(url);
    const documents=res.data.documents;
    console.log(res.data);
    setBooks(documents);
    setCount(res.data.count);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>도서목록</h1>
      <Table striped bordered hover className='align-middle'>
        <thead>
          <tr className='text-center table-primary'>
            <td>ID.</td>
            <td>이미지</td>
            <td>제목</td>
            <td>가격</td>
            <td>저자</td>
            <td>등록일</td>
          </tr>
        </thead>
        <tbody>
          {books.map(book=>
            <tr key={book.bid}>
              <td>{book.bid}</td>
              <td><img src={book.image} width="40px"/></td>
              <td>{book.title}</td>
              <td>{book.fmtprice}원</td>
              <td>{book.author}</td>
              <td>{book.fmtdate}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default ListPage