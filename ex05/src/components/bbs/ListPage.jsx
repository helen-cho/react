import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import '../Paging.css';
import  Pagination from 'react-js-pagination'
import { Link } from 'react-router-dom';

const ListPage = () => {
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage]=useState(1);
  const [size, setSize]=useState(5);
  const [key, setKey] = useState('uname');
  const [word, setWord] = useState('');

  const callAPI = async() => {
    const res=await axios.get(`/bbs/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    console.log(res.data);
    setList(res.data.documents);
    setCount(res.data.total);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    callAPI();
  }

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>게시판</h1>
      <Row className='mb-2'>
        <Col xs={8} md={5} lg={4}>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Select className='me-2' value={key} onChange={(e)=>setKey(e.target.value)}>
                <option value="title">제목</option>
                <option value="contents">내용</option>
                <option value="uid">작성자아이디</option>
                <option value="uname">작성자이름</option>
              </Form.Select>
              <Form.Control placeholder='검색어' value={word} onChange={(e)=>setWord(e.target.value)}/>
              <Button type='submit'>검색</Button>
            </InputGroup>
          </form>
        </Col>
        <Col className='mt-2'>
          검색수: {count}
        </Col>
        {sessionStorage.getItem('uid') &&
          <Col className='text-end'>
            <Link to="/bbs/insert">
              <Button className='px-5'>글쓰기</Button>
            </Link>
          </Col>
        }
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center'>
            <td>ID.</td>
            <td>제목</td>
            <td>작성자</td>
            <td>작성일</td>
            <td>조회수</td>
          </tr>
        </thead>
        <tbody>
          {list.map(bbs=>
            <tr key={bbs.bid} className='text-center'>
              <td>{bbs.bid}</td>
              <td className='text-start'>
                <div className='ellipsis'>
                  ({bbs.replycnt})
                  <a href={`/bbs/read/${bbs.bid}?isCnt=true`}>
                    {bbs.title}
                  </a>
                </div>
              </td>
              <td>{bbs.uname}({bbs.uid})</td>
              <td>{bbs.fmtdate}</td>
              <td>{bbs.viewcnt}</td>
            </tr>
          )}
        </tbody>
      </Table>
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