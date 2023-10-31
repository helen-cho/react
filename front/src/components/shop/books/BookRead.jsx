import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Row, Col, Spinner, Card, Button} from 'react-bootstrap'

const BookRead = () => {
    const [loading, setLoading] = useState(false);
    const {bid} = useParams();
    const [book, setBook] = useState({
        bid:'',
        title:'',
        price:'',
        fmtprice:'',
        authors:'',
        contents:'',
        publisher:'',
        image:'',
        isbn:'',
        regdate:'',
        fmtdate:''
    });
    const {title,price,fmtprice,authors,contents,publisher,image,isbn,regdate,fmtdate} = book;

    const getBook = async() => {
        setLoading(true);
        const res=await axios.get('/books/read/' + bid);
        //console.log(res.data);
        setBook(res.data);
        setLoading(false);
    }

    useEffect(()=>{
        getBook();
    },[]);

    if(loading) return <div className='text-center my-5'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서 정보</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Card className='p-3'>
                        <Row>
                            <Col md={3}>
                                <div className='mt-1'>
                                    <img src={image || "http://via.placeholder.com/170x250"}
                                        width="100%" className='bookPhoto' />
                                </div>
                                <Button size='sm mt-2 w-100'>이미지 수정</Button>
                            </Col>
                            <Col className='px-3 align-self-center'>
                                <h3>{title}</h3>
                                <hr/>
                                <div>저자 : {authors}</div>
                                <div>출판사 : {publisher}</div>
                                <div>ISBN : {isbn}</div>
                                <div>가격 : {fmtprice}원</div>
                                <div>등록일 : {fmtdate}</div>
                                <NavLink to={`/books/update/${bid}`}>
                                    <Button className='mt-2 px-5' size='sm '>정보수정</Button>
                                </NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <hr/>
                                <div>{contents}</div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BookRead