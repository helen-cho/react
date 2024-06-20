import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap';
import '../../common/Paging.css'
import Pagination from 'react-js-pagination';

const ListPage = () => {
  const [page, setPage]=useState(1);
  const [size, setSize]=useState(5);
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);

  const callAPI = async()=>{
    const res=await axios.get(`/cou?page=${page}&size=${size}`);
    console.log(res.data);
    setList(res.data.list);
    setCount(res.data.total);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  return (
    <div>
      <h1 className='text-center mb-5'>강좌목록</h1>
      <Row>
        <Col>검색수: {count}명</Col>
      </Row>
      <hr/>
      <Table>
        <tbody>
        {list.map(cou=>
          <tr key={cou.lcode}>
            <td>{cou.lcode}</td>
            <td>{cou.lname}</td>
            <td>{cou.pname} {cou.instructor}</td>
            <td>{cou.hours}시간</td>    
            <td>{cou.room}호</td>
            <td>{cou.persons}명/{cou.capacity}명</td>
            <td><Button variant='outline-danger' size='sm'>삭제</Button></td>
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