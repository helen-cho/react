import React, { useContext, useEffect, useState } from 'react'
import OrderPage from './OrderPage'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Spinner, Table, Alert, Col, Row } from 'react-bootstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import axios from 'axios'
import { BoxContext } from '../BoxContext'

const CartPage = () => {
    const { setBox } = useContext(BoxContext);
    const location=useLocation();
    const pathname=location.pathname;
    const search = new URLSearchParams(location.search);
    const show = search.get("show") ? search.get("show") : "cart";
    const navi=useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sum, setSum] = useState(0);
    const [total, setTotal] = useState(0);

    const onClickOrder = () => {
        navi(`${pathname}?show=order`);
    }

    const getCart = async() => {
        setLoading(true);
        const res=await axios.get(`/cart/list.json?uid=${sessionStorage.getItem("uid")}`);
        let list=res.data.list;
        //console.log(list);
        setBooks(list);
        let sum=0;
        let total=0;
        list.forEach(book=>{
            sum += book.sum;
            total += book.qnt;
        });
        setSum(sum);
        setTotal(total);
        setLoading(false);
    }

    useEffect(()=>{
        getCart();
    }, []);

    const onDelete = (cid) =>{
        setBox({
            show:true,
            message:`${cid}번 장바구니를 삭제하실래요?`,
            action: async()=>{
                await axios.post("/cart/delete", {cid});
                getCart();
            }
        })
    }

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <>
            {show==="cart" &&
                <div className='my-5'>
                    <h1 className='text-center mb-5'>장바구니</h1>
                    <Table bordered striped hover>
                        <thead>
                            <tr className='text-center'>
                                <td>제목</td>
                                <td>가격</td>
                                <td>수량</td>
                                <td>합계</td>
                                <td>삭제</td>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book=>
                                <tr key={book.cid}>
                                    <td><div className='ellipsis'>[{book.bid}] {book.title}</div></td>
                                    <td className='text-end'>{book.fmtprice}원</td>
                                    <td className='text-end'>{book.qnt}권</td>
                                    <td className='text-end'>{book.fmtsum}원</td>
                                    <td className='text-center'>
                                        <RiDeleteBin6Line onClick={()=>onDelete(book.cid)}
                                            className='delete'/>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Alert>
                        <Row>
                            <Col>전체: {total}권</Col>
                            <Col className='text-end'>
                                합계: {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                            </Col>
                        </Row>
                    </Alert>
                    <div>
                        <Button onClick={onClickOrder}>주문하기</Button>
                    </div>
                </div>
            }

            {show==="order" &&
                <OrderPage/>    
            }
        </>
    )
}

export default CartPage