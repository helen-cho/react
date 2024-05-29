import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Row, Col, InputGroup, Form, Button } from 'react-bootstrap'

const SearchPage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [query, setQuery]= useState('리액트');
  const [total, setTotal] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const callAPI = async() => {
    const url=`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=${size}&page=${page}`;
    const config = {
      "headers": {"Authorization": "KakaoAK 54b6688221dead45827042df7e297c2d"}
    }
    setLoading(true);
    const res =await axios.get(url, config);
    console.log(res.data);
    setBooks(res.data.documents);
    setIsEnd(res.data.meta.is_end);
    setTotal(res.data.meta.pageable_count);
    setLoading(false);
  }

  useEffect(()=>{
    callAPI()
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    if(query==="") {
      alert ("검색어를 입력하세요!");
      return;
    }
    setPage(1);
    callAPI();
  }

  const onInsert = (book) => {
    if(!window.confirm(`"${book.title}" 도서를 등록하실래요?`)) return;
    //도서등록
    console.log(book);
  }

  if(loading) return <h1 className='text-center my-5'>로딩중......</h1>
  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>도서검색</h1>
      <Row className='mb-2'>
        <Col xs={6} md={5} lg={4}>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)}/>
              <Button>검색</Button>
            </InputGroup>
          </form>
        </Col>
        <Col className='mt-2'>
          검색수: {total}건
        </Col>
      </Row>
      <Table striped bordered hover className='align-middle'>
        <thead>
          <tr>
            <td>isbn</td>
            <td colSpan={2}>Title</td>
            <td>Price</td>
            <td>Authors</td>
            <td>등록</td>
          </tr>
        </thead>
        <tbody>
          {books.map(book=>
            <tr key={book.isbn}>
               <td>{book.isbn}</td> 
               <td><img src={book.thumbnail || 'http://via.placeholder.com/120x170'} width="40px"/></td>
               <td>{book.title}</td>
               <td>{book.price}원</td>
               <td>{book.authors}</td>
               <td><Button onClick={()=>onInsert(book)} size='sm'>등록</Button></td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className='text-center'>
        <Button onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
        <span className='mx-3'>{page}</span>
        <Button onClick={()=>setPage(page+1)} disabled={isEnd}>다음</Button>
      </div>
    </div>
  )
}

export default SearchPage