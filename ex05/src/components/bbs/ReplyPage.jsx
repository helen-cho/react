import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../Paging.css'

const ReplyPage = ({bid}) => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);

  const callAPI = async()=>{
    const url=`/reply/list.json/${bid}?page=${page}&size=${size}`;
    const res=await axios.get(url);
    console.log(res.data);
    setList(res.data.documents);
    setCount(res.data.total);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  return (
    <div className='my-5'>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          {list.map(reply=>
            <div key={reply.rid}>
              <Row>
                <Col className='text-muted' style={{fontSize:'15px'}}>
                  <span className='me-3'>{reply.uname}({reply.uid})</span>
                  <span>{reply.fmtdate}</span>
                </Col>
              </Row>
              <div className='ellipsis'>{reply.contents}</div>
              <hr/>
            </div>
          )}
        </Col>
      </Row>
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

export default ReplyPage