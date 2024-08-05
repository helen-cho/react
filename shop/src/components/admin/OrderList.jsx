import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table,Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import '../Paging.css'
import  Pagination from 'react-js-pagination'
import ModalOrder from '../orders/ModalOrder';

const OrderList = () => {
  const [count, setCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [key, setKey] = useState('uid');
  const [word, setWord] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const callAPI = async() => {
    const res=await axios.get(`/orders/admin/list?key=${key}&word=${word}&page=${page}&size=${size}`);
    console.log(res.data);
    setOrders(res.data.documents);
    setCount(res.data.count);
  }

  useEffect(()=>{
    callAPI();
  }, [page, key, word]);

  const onChangeStatus = (e, pid)=> {
    const data=orders.map(order=>order.pid===pid ? {...order, status:e.target.value}:order);
    setOrders(data);
  }

  const onUpdateStatus = async(pid, status)=> {
    if(!window.confirm(`${pid}번 주문의 상태를 ${status}로 변경하실래요?`)) return;
    const res=await axios.post('/orders/status', {pid, status});
    if(res.data.result===1){
      alert("상태변경완료!");
      callAPI();
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  }

  const onChangeKey = (e) => {
    setKey(e.target.value);
    if(e.target.value==='status'){
      setWord(0)
    }else{
      setWord('');
    }
  }

  const onChangeWord = (e) => {
    setWord(e.target.value);
    setPage(1);
  }

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>주문관리</h1>
      <Row className='mb-2'>
        <Col xs={8} md={6} lg={5}>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Select className='me-2' value={key} onChange={onChangeKey}>
                <option value="status">주문상태</option>
                <option value="uid">아이디</option>
                <option value="uname">주문자명</option>
                <option value="phone">전화</option>
                <option value="address1">배송지</option>
              </Form.Select>
              {key==='status' ? 
                <Form.Select value={word} onChange={onChangeWord}>
                  <option value="0" selected>결제대기</option>
                  <option value="1">결제확인</option>
                  <option value="2">배송준비</option>
                  <option value="3">배송완료</option>
                  <option value="4">주문완료</option>
                </Form.Select>
                :
                <Form.Control value={word} onChange={(e)=>setWord(e.target.value)} placeholder='검색어'/>
              }
              <Button type="submit">검색</Button>
            </InputGroup>
          </form>
        </Col>
        <Col className='pt-2'>
          <span>검색수: {count}건</span>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center'>
            <td>주문번호</td>
            <td>주문일</td>
            <td>주문자</td>
            <td>전화</td>
            <td>주문금액</td>
            <td>주문상품</td>
            <td>주문상태</td>
          </tr>
        </thead>
        <tbody>
          {orders.map(order=>
            <tr key={order.pid} className='text-center'>
              <td>{order.pid}</td>
              <td>{order.fmtdate}</td>
              <td>{order.uname}({order.uid})</td>
              <td>{order.phone}</td>
              <td>{order.fmtsum}원</td>
              <td><ModalOrder pid={order.pid} order={order}/></td>
              <td>
                <InputGroup>
                  <Form.Select onChange={(e)=>onChangeStatus(e, order.pid)} value={order.status}>
                    <option value="0">결제대기</option>
                    <option value="1">결제확인</option>
                    <option value="2">배송준비</option>
                    <option value="3">배송완료</option>
                    <option value="4">주문완료</option>
                  </Form.Select>
                  <Button onClick={()=>onUpdateStatus(order.pid, order.status)}>변경</Button>
                </InputGroup>
              </td>
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

export default OrderList