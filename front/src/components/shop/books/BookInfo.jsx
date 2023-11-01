import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import {BsHeartFill, BsHeart} from 'react-icons/bs'
import {BiMessageDetail} from 'react-icons/bi'

const BookInfo = () => {
    const {bid} = useParams();
    const [book, setBook] = useState('');
    const [loading, setLoading] = useState(false);

    const getBook = async() => {
        setLoading(true);
        const res =await axios(`/books/read/${bid}`);
        console.log(res.data);
        setBook(res.data);
        setLoading(false);
    }

    useEffect(()=>{
        getBook();
    }, []);

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서정보</h1>
            <Card className='p-5'>
                <Row>
                    <Col lg={3} xs={5} md={4} className='align-self-center'>
                        <img src={book.image} width="100%"/>
                    </Col>
                    <Col className='ms-3'>
                        <h5>{book.title}</h5>
                        <hr/>
                        <div className='mb-2'>가격: {book.fmtprice}원</div>
                        <div className='ellipsis mb-2'>저자: {book.authors}</div>
                        <div className='ellipsis mb-2'>출판사: {book.publisher}</div>
                        <div className='ellipsis mb-2'>등록일: {book.fmtdate}</div>
                        <div className='ellipsis'>ISBN: {book.isbn}</div>
                        {book.rcnt===0 ||
                            <span>
                                <span className='message'><BiMessageDetail/></span>
                                <span className='ms-1 rcnt'>{book.rcnt}</span>
                            </span>
                        }
                        <span className='ms-3'>
                            <span className='heart'>{book.ucnt === 0 ? 
                                <BsHeart/>
                                :
                                <BsHeartFill/>}
                            </span>
                            <span className='ms-1 fcnt'>{book.fcnt}</span>
                        </span>
                        <hr/>
                        <div>
                            <Button variant='warning' className='me-2'>장바구니</Button>
                            <Button variant='success'>바로구매</Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default BookInfo