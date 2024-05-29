import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table, Button, Row, Col} from 'react-bootstrap'
import '../Paging.css'
import  Pagination from 'react-js-pagination'

const ListPage = () => {
  const [chk, setChk] = useState(0);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [count, setCount]= useState(0);

  useEffect(()=>{
    let count=0;
    books.map(book=>book.checked && count++);
    setChk(count);
  },[books]);

  const callAPI = async() => {
    const url=`/books/list?page=${page}&size=${size}`;
    const res=await axios.get(url);
    const documents=res.data.documents;
    console.log(res.data);
    setBooks(documents.map(book=>book && {...book, checked:false}));
    setCount(res.data.count);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  const onDelete = async(book) => {
    if(!window.confirm(`"${book.title}" 도서를 삭제하실래요?`)) return;
    //삭제하기
    const res=await axios.post('/books/delete', {bid:book.bid});
    if(res.data.result===1){
      alert("도서삭제성공!");
      callAPI();
    }else{
      alert("도서삭제실패!");
    }
  }

  const onChangeAll = (e) => {
    setBooks(books.map(book=>book && {...book, checked:e.target.checked}));
  }

  const onChangeSingle = (e, bid) => {
    setBooks(books.map(book=>
      book.bid===bid ? {...book, checked:e.target.checked} : book));
  }

  const onDeleteChecked = () => {
    if(chk===0){
      alert("삭제할 도서를 선택하세요!");
      return;
    }
    if(!window.confirm(`${chk}개 도서를 삭제하실래요?`)) return;
    
    let deleted=0;
    let cnt=0;
    books.forEach(async book=>{
      if(book.checked){
        const res=await axios.post('/books/delete', {bid:book.bid});
        cnt++;
        if(res.data.result===1) deleted++;
        if(cnt==chk) {
          alert(`${deleted}개 도서가 삭제되었습니다.`);
          callAPI();
        }
      }
    });
  }

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>도서목록</h1>
      <Row className='mb-2'>
        <Col className='text-end'>
          <Button onClick={onDeleteChecked} variant='danger'>선택도서삭제</Button>
        </Col>
      </Row>
      <Table striped bordered hover className='align-middle'>
        <thead>
          <tr className='text-center table-primary'>
            <td>
              <input onChange={onChangeAll} 
                checked={books.length===chk} type="checkbox"/></td>
            <td>ID.</td>
            <td>이미지</td>
            <td>제목</td>
            <td>가격</td>
            <td>저자</td>
            <td>등록일</td>
            <td>삭제</td>
          </tr>
        </thead>
        <tbody>
          {books.map(book=>
            <tr key={book.bid}>
              <td className='text-center'>
                <input onChange={(e)=>onChangeSingle(e, book.bid)} checked={book.checked} type="checkbox"/>
              </td>
              <td>{book.bid}</td>
              <td><img src={book.image} width="40px"/></td>
              <td>{book.title}</td>
              <td>{book.fmtprice}원</td>
              <td>{book.author}</td>
              <td>{book.fmtdate}</td>
              <td className='text-center'><Button onClick={()=>onDelete(book)}
                    variant="danger" size='sm'>삭제</Button></td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination
        activePage={page}
        itemsCountPerPage={size}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={ (e)=>setPage(e) }/>
    </div>
  )
}

export default ListPage