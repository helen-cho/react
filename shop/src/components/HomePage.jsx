import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {Row, Col, Card} from 'react-bootstrap'
import  Pagination from 'react-js-pagination'
import './Paging.css'

const HomePage = () => {
  const [count, setCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [key, setKey] = useState('title');
  const [word, setWord] = useState('');

  const callAPI = async() => {
    const res=await axios.get(
      `/books/list?page=${page}&size=${size}&key=${key}&word=${word}`);
    console.log(res.data);
    setBooks(res.data.documents);
    setCount(res.data.count);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  return (
    <div>
      <Row className='mt-5'>
        {books.map(book=>
          <Col key={book.bid} xs={6} md={4} lg={2} className='mb-3'>
            <Card>
              <Card.Body>
                <img src={book.image} width="100%"/>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col className='ellipsis' style={{fontSize:'12px'}}>{book.title}</Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        )}
      </Row>
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

export default HomePage;