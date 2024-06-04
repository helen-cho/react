import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table,Form, Button, InputGroup } from 'react-bootstrap';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [key, setKey] = useState('uid');
  const [word, setWord] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const callAPI = async() => {
    const res=await axios.get(`/orders/admin/list?key=${key}&word=${word}&page=${page}&size=${size}`);
    console.log(res.data);
    setOrders(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>주문관리</h1>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center'>
            <td>주문번호</td>
            <td>주문일</td>
            <td>주문자</td>
            <td>전화</td>
            <td>배송지</td>
            <td>주문금액</td>
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
              <td>{order.address1} {order.address2}</td>
              <td>{order.fmtsum}원</td>
              <td>
                <InputGroup>
                  <Form.Select value={order.status}>
                    <option>결제대기</option>
                    <option>결제확인</option>
                    <option>배송준비</option>
                    <option>배송완료</option>
                  </Form.Select>
                  <Button>변경</Button>
                </InputGroup>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default OrderList