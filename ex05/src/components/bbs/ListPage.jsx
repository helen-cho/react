import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import '../Paging.css';
import  Pagination from 'react-js-pagination'

const ListPage = () => {
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage]=useState(1);
  const [size, setSize]=useState(5);
  const [key, setKey] = useState('title');
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

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>게시판</h1>
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
              <td className='text-start'><div className='ellipsis'>{bbs.title}</div></td>
              <td>{bbs.uname}({bbs.uid})</td>
              <td>{bbs.fmtdate}</td>
              <td>{bbs.viewcnt}</td>
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