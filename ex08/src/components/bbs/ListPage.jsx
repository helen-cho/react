import React, { useEffect, useState } from 'react'
import '../Paging.css'
import axios from 'axios'
import { Table, Row, Col } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import { Link} from 'react-router-dom'

const ListPage = () => {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [list, setList] = useState([]);

  const callAPI = async() => {
    const res=await axios.get(`/bbs/?page=${page}&size=${size}`)
    console.log(res.data);
    setList(res.data.list);
    setTotal(res.data.total);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  return (
    <div className='my-5'>
      <h1 className='text-center my-5'>게시판</h1>
      <Row>
        <Col>
          검색수: <span>{total}</span>
        </Col>
        <Col className='text-end'>
          <Link to='/bbs/insert'>글쓰기</Link>
        </Col>
      </Row>
      <Table className='table-striped table-hover'>
        <tbody>
          {list.map(bbs=>
            <tr key={bbs.bid}>
              <td>{bbs.bid}</td>
              <td><Link to={`/bbs/${bbs.bid}`}>{bbs.title}</Link></td>
              <td>{bbs.writer}</td>
              <td>{bbs.fmtDate}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination
        activePage={ page }
        itemsCountPerPage={size}
        totalItemsCount={ total }
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={ (e)=>setPage(e)}/>
    </div>
  )
}

export default ListPage