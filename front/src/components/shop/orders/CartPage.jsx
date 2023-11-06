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
    const [count, setCount] = useState(0); //체크된 체크박스 갯수

    const onClickOrder = () => {
        if(count==0){
            setBox({
                show:true,
                message:"주문할 상품을 선택하세요!"
            });
        }else{
            navi(`${pathname}?show=order`);
        }
    }

    const getCart = async() => {
        setLoading(true);
        const res=await axios.get(`/cart/list.json?uid=${sessionStorage.getItem("uid")}`);
        let list=res.data.list;
        list=list.map(book=>book && {...book, checked:false});
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

    useEffect(()=>{
        let count=0;
        books.forEach(book=>book.checked && count++);
        setCount(count);
    }, [books]);

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

    const onChange = (cid, e)=>{
        const list=books.map(book=>book.cid===cid ? {...book, qnt:e.target.value}: book);
        setBooks(list);
    }

    const onUpdate = (cid, qnt) => {
        setBox({
            show:true,
            message:`${cid} 수량을 ${qnt}로 변경하실래요?`,
            action:async()=>{
                await axios.post("/cart/update", {cid, qnt});
                getCart();
            }
        })
    }

    const onChangeAll = (e) => {
        const list=books.map(book=>book && {...book, checked:e.target.checked});
        setBooks(list);
    }

    const onChangeSingle = (e, cid) => {
        const list=books.map(book=>book.cid===cid ? {...book,checked:e.target.checked} : book);
        setBooks(list);
    }

    const onDeleteChecked = () => {
        if(count === 0){
            setBox({show:true, message:"삭제할 상품을 선택하세요!"});
        }else {
            setBox({
                show:true,
                message:`${count}개의 장바구니를 삭제하실래요?`,
                action:async()=>{
                    for(const book of books){
                        if(book.checked) {
                            await axios.post("/cart/delete", {cid: book.cid});
                        }
                    }
                    getCart();
                }
            })
        }
    }

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <>
            {show==="cart" &&
                <div className='my-5'>
                    <h1 className='text-center mb-5'>장바구니</h1>
                    <div className='mb-2'>
                        <Button size="sm" onClick={onDeleteChecked}>선택상품삭제</Button>
                    </div>
                    <Table bordered striped hover>
                        <thead>
                            <tr className='text-center'>
                                <td>
                                    <input checked={books.length===count}
                                        type="checkbox" onChange={onChangeAll}/>
                                </td>
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
                                    <td className='text-center'>
                                        <input onChange={(e)=>onChangeSingle(e, book.cid)}
                                            type="checkbox" checked={book.checked}/>
                                    </td>
                                    <td><div className='ellipsis'>[{book.bid}] {book.title}</div></td>
                                    <td className='text-end'>{book.fmtprice}원</td>
                                    <td className='text-end'>
                                        <input onChange={(e)=>onChange(book.cid, e)}
                                            value={book.qnt} size={2} className='text-end me-1'/>
                                        <button onClick={()=>onUpdate(book.cid, book.qnt)}>변경</button>
                                    </td>
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
                    <div className='text-center'>
                    {books.length > 0 && 
                        <Button variant="success" className="px-5" onClick={onClickOrder}>주문하기</Button>
                    }
                        <Button variant="warning" className='px-5 ms-2'>쇼핑계속하기</Button>
                    </div>
                </div>
            }

            {show==="order" &&
                <OrderPage books={books}/>    
            }
        </>
    )
}

export default CartPage