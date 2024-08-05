import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Table, Button, Alert } from 'react-bootstrap';
import { CountContext } from '../CountContext';
import OrderPage from './OrderPage';

const CartPage = () => {
  const [isOrder, setIsOrder] = useState(false);
  const [chk, setChk] = useState(0);
  const {setCount} = useContext(CountContext);
  const [total, setTotal] = useState(0);
  const [books, setBooks] = useState([]);
  const uid=sessionStorage.getItem('uid');

  useEffect(()=>{
    let checkeCount =0;
    books.forEach(book=>book.checked && checkeCount++);
    //console.log('.........', checkeCount);
    setChk(checkeCount);
  }, [books])

  const callAPI = async() => {
    const res=await axios.get(`/cart/list?uid=${uid}`);
    const data=res.data.map(book=>book && {
      ...book, sum:book.qnt*book.price, checked:false});
    setBooks(data);
    setCount(data.length);

    let totalSum=0;
    data.forEach(book=>{
      totalSum+=book.sum;
    });
    setTotal(totalSum);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onChangeQnt=(bid, e)=>{
    const result=e.target.value.replace(/[^0-9]/g,''); //숫자만입력
    const data=books.map(book=>book.bid==bid ? {...book, qnt:result}:book);
    setBooks(data);
  }

  const onUpdateQnt = async(bid, qnt) => {
     //수량수정
    const res=await axios.post('/cart/update', 
        {uid:sessionStorage.getItem('uid'), bid, qnt});
    if(res.data.result===1){
      callAPI();
    }    
  }

  const onClickDelete = async(bid) => {
    const res=await axios.post('/cart/delete', {
      uid:sessionStorage.getItem('uid'), bid}
    );
    if(res.data.result===1) {
      callAPI();
    }
  }

  const onChangeAll = (e) => {
    const data=books.map(book=>book && {...book, checked:e.target.checked});
    setBooks(data);
  }

  const onChangeSingle=(e, bid)=>{
    const data=books.map(book=>book.bid===bid ? 
            {...book, checked:e.target.checked}:book);
    setBooks(data);        
  }

  const onCheckedDelete = () => {
    if(chk===0) {
      alert("삭제할 도서들을 선택하세요!");
      return;
    }
    if(!window.confirm(`${chk}개 도서들을 삭제하실래요?`)) return;
    //선택도서삭제
    let deleted=0;
    books.forEach(async book=>{
      if(book.checked){
        deleted++;
        const res=await axios.post('/cart/delete', {bid:book.bid, uid});
      }
    });
    if(chk===deleted) callAPI();
  }

  const onOrder = () => {
    if(chk===0) {
      alert("주문할 상품들을 선택하세요!");
    }else{
      //주문페이지로 이동
      setIsOrder(true);
    }
  }

  return (
    <Row className='justify-content-center my-5'>
      <Col>
        {!isOrder ?
        <>
          <h1 className='text-center mb-5'>장바구니</h1>
          <div className='mb-2'>
            <Button onClick={()=>onCheckedDelete()}>선택도서삭제</Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr className='text-center'>
                <td><input checked={chk===books.length}
                      onChange={onChangeAll} type="checkbox"/></td>
                <td>ID.</td>
                <td>도서명</td>
                <td>가격</td>
                <td>수량</td>
                <td>금액</td>
                <td>삭제</td>
              </tr>  
            </thead>
            <tbody>
              {books.map(book=>
                <tr key={book.bid}>
                  <td className='text-center'>
                    <input onChange={(e)=>onChangeSingle(e, book.bid)}
                      type="checkbox" checked={book.checked}/>
                  </td>
                  <td className='text-center'>{book.bid}</td>
                  <td>
                    <img src={book.image} width="30px"/>
                    <span className='mx-2'>{book.title}</span>
                  </td>
                  <td>{book.fmtprice}원</td>
                  <td>
                    <input onChange={(e)=>onChangeQnt(book.bid, e)}
                        value={book.qnt} size={3} className='text-end me-1'/>
                    <Button onClick={()=>onUpdateQnt(book.bid, book.qnt)}
                      variant='secondary' size="sm">수정</Button>    
                  </td>
                  <td>{book.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                  <td><Button onClick={()=>onClickDelete(book.bid)}
                    variant='secondary' size="sm">삭제</Button></td>
                </tr>
              )}
            </tbody>
          </Table>
          <Alert className='text-end'>총합계: {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Alert>
          <div className='text-center my-3'>
            <Button onClick={onOrder} className='me-2 px-5' >주문하기</Button>
            <a href="/"><Button className='px-5'>쇼핑계속하기</Button></a>
          </div> 
          </>
        :
          <OrderPage books={books} setBooks={setBooks}/> 
        }
      </Col>
    </Row>
  )
}

export default CartPage