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

  const onChangeStatus = (e, pid)=> {
    const data=orders.map(order=>order.pid===pid ? {...order, status:e.target.value}:order);
    setOrders(data);
  }

  const onUpdateStatus = async(pid, status)=> {
    if(!window.confirm(`${pid}번 주문의 상태를 ${status}로 변경하실래요?`)) return;
    const res=await axios.post('/orders/status', {pid, status});
    if(res.data.result===1){
      alert("상태변경완료!");
    }
  }

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
    </div>
  )
}

export default OrderList