import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table,Button } from 'react-bootstrap';
import ModalOrder from './ModalOrder';

const OrderList = () => {
  const uid=sessionStorage.getItem('uid');
  const [orders, setOrders] = useState([]);
  const status=['결제대기','결제확인','배송준비','배송완료','주문완료'];

  const callAPI = async() => {
    const res= await axios.get(`/orders/list?uid=${uid}`);
    //console.log(res.data);
    setOrders(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>주문목록</h1>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center'>
            <td>주문번호</td>
            <td>주문일</td>
            <td>주문금액</td>
            <td>전화</td>
            <td>주소</td>
            <td>상태</td>
            <td>주문상품</td>
          </tr>
        </thead>
        <tbody>
          {orders.map(order=>
            <tr key={order.pid} className='text-center'>
              <td>{order.pid}</td>
              <td>{order.fmtdate}</td>
              <td>{order.fmtsum}원</td>
              <td>{order.phone}</td>
              <td>{order.address1} {order.address2}</td>
              <td>{status[order.status]}</td>
              <td><ModalOrder pid={order.pid} order={order}/></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default OrderList