import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Button, InputGroup, Form, Col, Row } from 'react-bootstrap';
import ModalMap from './ModalMap';
const LocalSeach = () => {
  const [count, setCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [locals, setLocals] = useState([]);
  const [query, setQuery] = useState("가산디지털");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const callAPI = async() => {
    const url=`https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&page=${page}&size=${size}`;
    const config={
      headers: {"Authorization":"KakaoAK 54b6688221dead45827042df7e297c2d"}
    };
    const res=await axios.get(url, config);
    console.log(res.data);
    setLocals(res.data.documents);
    setIsEnd(res.data.meta.is_end);
    setCount(res.data.meta.pageable_count);
  }

  useEffect(()=>{
    callAPI();
  }, [page, size]);

  const onSubmit = (e) => {
    e.preventDefault();
    if(query===""){
      alert("검색어를 입력하세요!");
    }else{
      setPage(1);
      callAPI();
    }
  }

  const onChangeSize = (e) => {
    setPage(1);
    setSize(e.target.value);
  }
  return (
    <div className='my-5'>
      <h1 className='text-center my-5'>지역검색</h1>
      <Row className='mb-2'>
        <Col xs={7} md={6} lg={4}>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)}/>
              <Button type="submit">검색</Button>
            </InputGroup>
          </form>
        </Col>
        <Col>
          <div className='mt-2'>검색수: {count}건</div>
        </Col>
        <Col className='text-end' xs={2}>
          <Form.Select onChange={onChangeSize} value={size}>
            <option value="5" >5행</option>
            <option value="10">10행</option>
            <option value="15">15행</option>
          </Form.Select>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center table-primary'>
            <td>ID</td>
            <td>지역명</td>
            <td>전화번호</td>
            <td>주소</td>
            <td>지도보기</td>
          </tr>
        </thead>
        <tbody>
          {locals.map(local=>
            <tr key={local.id}>
              <td>{local.id}</td>
              <td><div className='ellipsis'>{local.place_name}</div></td>
              <td><div className='ellipsis'>{local.phone}</div></td>
              <td><div className='ellipsis'>{local.address_name}</div></td>
              <td><ModalMap local={local}/></td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className='text-center my-3'>
        <Button onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
        <span className='mx-3'>{page}</span>
        <Button onClick={()=>setPage(page+1)} disabled={isEnd}>다음</Button>
      </div>
    </div>
  )
}

export default LocalSeach


