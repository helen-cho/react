import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {Table, Button, Spinner, Row, Col, Alert, Form} from 'react-bootstrap'
import Pagination from "react-js-pagination";
import '../Pagination.css';
import {RiDeleteBinLine} from 'react-icons/ri'
import { BoxContext } from '../BoxContext';
import OrderPage from './OrderPage';

const CartPage = () => {
    const { setBox } = useContext(BoxContext);
    const size=3;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState(0);
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(true);

    const getCart = async() => {
        setLoading(true);
        const res = await axios.get(
            `/cart/list.json?uid=${sessionStorage.getItem("uid")}&size=${size}&page=${page}`); 
        //console.log(res.data);
        let list=res.data.list;
        list=list.map(book=>book && {...book, checked:false});    
        setBooks(list);    
        setTotal(res.data.total);

        const res1= await axios.get(`/cart/sum?uid=${sessionStorage.getItem("uid")}`);
        setSum(res1.data.fmtsum);
        setLoading(false);
    }

    useEffect(()=>{
        setShow(true);
        getCart();
    }, [page]);

    useEffect(()=>{
        let cnt=0;
        books.forEach(book=>book.checked && cnt++);
        //console.log(cnt);
        setCount(cnt);
    }, [books]);

    const onChangePage = (page)=>{
        setPage(page);
    }

    const onClickDelete = (cid) => {
        setBox({
            show:true,
            message:`${cid}번 장바구니 도서를 삭제하실래요?`,
            action:async ()=>{
                await axios.post('/cart/delete', {cid});
                if(page ===1 ){
                    getCart();
                }else{
                    setPage(1);
                }
            }
        });
    }

    const onClickDeleteChecked = () => {
        if(count===0) {
            setBox({show:true, message:"삭제할 도서들을 선택하세요!"});
        }else{
            setBox({
                show:true,
                message:`${count}권 도서를 삭제하실래요?`,
                action:async ()=>{
                    //삭제
                    for(const book of books){
                        if(book.checked){
                            const cid=book.cid;
                            await axios.post('/cart/delete', {cid});
                        }
                    }
                    setBox({show:true, message:`${count}권 도서가 삭제되었습니다.`});
                    getCart();
                }
            })
        }
    }

    const onClickUpdate = (cid, qnt) => {
        setBox({
            show:true,
            message:`${cid}번 수량을 ${qnt}로 변경하실래요?`,
            action:async ()=>{
                await axios.post("/cart/update", {cid, qnt});
                getCart();
            }
        });
    }

    const onChange = (e, cid) => {
        setBooks(books.map(book=>book.cid===cid ? {...book, qnt:e.target.value} : book));
    }

    const onChangeAll = (e) => {
        const list=books.map(book=>book && {...book, checked:e.target.checked});
        setBooks(list);
    }

    const onChangeSingle = (e, cid) => {
        const list=books.map(book=>book.cid===cid ? {...book, checked:e.target.checked} : book);
        setBooks(list);
    }

    const onClickOrder = () => {
        if(count===0) {
            setBox({show:true, message:"주문하실 상품을 선택하세요!"});
        }else{
            setShow(false);
        }    
    }

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div> 
    return (
    <>
        {show ? 
        <div className='my-5'>
            <h1 className='text-center mb-5'>장바구니목록</h1>
            <Row>
                <Col className='mx-2'>
                    <input type="checkbox" onChange={onChangeAll} checked={books.length===count}/>
                    <span className='ms-2'>전체선택</span>
                </Col>
                <Col className='text-end'><Button onClick={onClickDeleteChecked} size='sm mb-2'>선택상품삭제</Button></Col>
            </Row>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <td colSpan={2}>ID</td><td colSpan={2}>제목</td>
                        <td className='text-end'>가격</td><td>수량</td><td className='text-end'>합계</td>
                        <td>삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book=>
                        <tr key={book.cid}>
                            <td><input onChange={(e)=>onChangeSingle(e, book.cid)}
                                    type="checkbox" checked={book.checked}/></td>
                            <td>{book.bid}</td>
                            <td><img src={book.image || "http://via.placeholde.com"} width={30}/></td>
                            <td><div className='ellipsis'>{book.title}</div></td>
                            <td className='text-end'>{book.fmtprice}원</td>
                            <td>
                                <input onChange={(e)=>onChange(e, book.cid)}
                                    value={book.qnt} size={2} className='text-end'/>
                                <Button onClick={()=>onClickUpdate(book.cid, book.qnt)}
                                    size="sm ms-1">변경</Button>
                            </td>
                            <td className='text-end'>{book.fmtsum}원</td>
                            <td><RiDeleteBinLine onClick={()=>onClickDelete(book.cid)}
                                    className='delete'/></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Alert>
                <Row>
                    <Col>주문상품수량: {total}권</Col>
                    <Col className='text-end'>
                        총 상품금액: {sum}원
                    </Col>
                </Row>
            </Alert>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={onChangePage}/>
            }
            {books.length > 0 &&
            <div className='text-center my-5'>
                <Button onClick={onClickOrder}
                    className='px-5 me-2' variant='success'>주문하기</Button>
                <Button className='px-5' variant='warning'>쇼핑계속하기</Button>
            </div>
            }   
        </div>
        :
        <OrderPage books={books}/>
        }
    </>
    )
}

export default CartPage