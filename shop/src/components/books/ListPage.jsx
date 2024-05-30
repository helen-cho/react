import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table, Button, Row, Col, Form, InputGroup, Alert} from 'react-bootstrap'
import '../Paging.css'
import  Pagination from 'react-js-pagination'

const ListPage = () => {
  const [key, setKey] = useState('title');
  const [word, setWord]=useState('');
  const [loading, setLoading] = useState(false);
  const [chk, setChk] = useState(0);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [count, setCount]= useState(0);

  useEffect(()=>{
    let cnt=0;
    books.map(book=>book.checked && cnt++);
    setChk(cnt);
  },[books]);

  const callAPI = async() => {
    setLoading(true);
    const url=`/books/list?page=${page}&size=${size}&key=${key}&word=${word}`;
    const res=await axios.get(url);
    const documents=res.data.documents;

    if(documents) {
      setBooks(documents.map(book=>book && {...book, checked:false}));
    }else{
      setBooks([]);
    }
    setCount(res.data.count);
    if(page > Math.ceil(res.data.count/size)) setPage(page-1);
    setLoading(false);
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

  const onSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  }

  if(loading) return <h1 className='text-center my-5'>로딩중......</h1>
  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>도서목록</h1>
      <Row className='mb-2'>
        <Col xs={8} md={5} lg={4}>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Select onChange={(e)=>setKey(e.target.value)}
                  className='me-2' value={key}>
                <option value="title">제목</option>
                <option value="author">저자</option>
                <option value="publisher">출판사</option>
              </Form.Select>
              <Form.Control value={word} onChange={(e)=>setWord(e.target.value)}
                 placeholder='검색어'/>
              <Button type="submit">검색</Button>
            </InputGroup>
          </form>
        </Col>
        <Col className='mt-2'>검색수:{count}건</Col>
        {count > 0 &&
          <Col className='text-end'>
            <Button onClick={onDeleteChecked} variant='danger'>선택도서삭제</Button>
          </Col>
        }
      </Row>
      {count > 0 ?
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
              <td><a href={`/books/update/${book.bid}`}>{book.title}</a></td>
              <td>{book.fmtprice}원</td>
              <td>{book.author}</td>
              <td>{book.fmtdate}</td>
              <td className='text-center'><Button onClick={()=>onDelete(book)}
                    variant="danger" size='sm'>삭제</Button></td>
            </tr>
          )}
        </tbody>
      </Table>
      :
      <div>
        <Alert className='text-center' variant='secondary'>
          <h5>검색결과가 없습니다.</h5>
        </Alert>
      </div>
      }
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

export default ListPage