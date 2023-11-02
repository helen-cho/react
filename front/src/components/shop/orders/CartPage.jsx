import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Table, Button, Spinner, Row, Col, Alert} from 'react-bootstrap'
import Pagination from "react-js-pagination";
import '../Pagination.css';

const CartPage = () => {
    const size=5;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState(0);

    const getCart = async() => {
        setLoading(true);
        const res = await axios.get(
            `/cart/list.json?uid=${sessionStorage.getItem("uid")}&size=${size}&page=${page}`); 
        console.log(res.data);
        setBooks(res.data.list);    
        setTotal(res.data.total);

        let sum1=0;
        res.data.list.forEach(book=>{
            sum1 += book.qnt * book.price
        });
        setSum(sum1);

        setLoading(false);
    }

    useEffect(()=>{
        getCart();
    }, [page]);

    const onChangePage = (page)=>{
        setPage(page);
    }

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div> 
    return (
        <div className='my-5'>
            <h1 className='text-center'>장바구니목록</h1>
            <Table>
                <thead>
                    <tr>
                        <td>ID</td><td colSpan={2}>제목</td>
                        <td>가격</td><td>수량</td><td>합계</td>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book=>
                        <tr key={book.bid}>
                            <td>{book.bid}</td>
                            <td><img src={book.image || "http://via.placeholde.com"} width={30}/></td>
                            <td><div className='ellipsis'>{book.title}</div></td>
                            <td className='text-end'>{book.fmtprice}원</td>
                            <td>{book.qnt}</td>
                            <td className='text-end'>{book.fmtsum}원</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Alert>
                <Row>
                    <Col>주문상품수량: {total}</Col>
                    <Col className='text-end'>
                        총 상품금액: {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
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
        </div>
    )
}

export default CartPage