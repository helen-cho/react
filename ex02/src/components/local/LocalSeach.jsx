import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Button, InputGroup, Form, Col, Row } from 'react-bootstrap';
const LocalSeach = () => {
  const [locals, setLocals] = useState([]);
  const [query, setQuery] = useState("가산디지털");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const callAPI = async() => {
    const url=`https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&page=${page}&size=${size}`;
    const config={
      headers: {"Authorization":"KakaoAK 54b6688221dead45827042df7e297c2d"}
    };
    const res=await axios.get(url, config);
    console.log(res.data);
    setLocals(res.data.documents);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div className='my-5'>
      <h1 className='text-center my-5'>지역검색</h1>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center table-primary'>
            <td>ID</td>
            <td>지역명</td>
            <td>전화번호</td>
            <td>주소</td>
          </tr>
        </thead>
        <tbody>
          {locals.map(local=>
            <tr key={local.id}>
              <td>{local.id}</td>
              <td><div className='ellipsis'>{local.place_name}</div></td>
              <td><div className='ellipsis'>{local.phone}</div></td>
              <td><div className='ellipsis'>{local.address_name}</div></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default LocalSeach


