import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Spinner, Row, Col, Card, Button, Tab, Tabs } from 'react-bootstrap';
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { BiMessageDetail } from 'react-icons/bi'
import ReviewPage from './ReviewPage';

const BookInfo = () => {
    const navi = useNavigate();
    const location = useLocation();
    //console.log('...........', location.pathname);

    const { bid } = useParams();
    const [book, setBook] = useState('');
    const [loading, setLoading] = useState(false);

    const getBook = async () => {
        setLoading(true);
        const res = await axios(`/books/read/${bid}?uid=${sessionStorage.getItem("uid")}`);
        //console.log(res.data);
        setBook(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getBook();
    }, []);

    const onClickHeart = async (bid) => {
        if (sessionStorage.getItem("uid")) {
            await axios.post('/books/insert/favorite',
                { uid: sessionStorage.getItem("uid"), bid: bid });
            getBook();
        } else {
            sessionStorage.setItem("target", location.pathname);
            navi('/users/login');
        }
    }

    const onClickFillHeart = async (bid) => {
        await axios.post('/books/delete/favorite',
            { uid: sessionStorage.getItem("uid"), bid: bid });
        getBook();
    }

    if (loading) return <div className='my-5 text-center'><Spinner variant='primary' /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서정보</h1>
            <Card className='p-5'>
                <Row>
                    <Col lg={3} xs={5} md={4} className='align-self-center'>
                        <img src={book.image} width="100%" />
                    </Col>
                    <Col className='ms-3'>
                        <h5 className='ellipsis'>{book.title}</h5>
                        <hr />
                        <div className='mb-2'>가격: {book.fmtprice}원</div>
                        <div className='ellipsis'>저자: {book.authors}</div>
                        <div className='ellipsis'>출판사: {book.publisher}</div>
                        <div className='ellipsis'>등록일: {book.fmtdate}</div>
                        <div className='ellipsis mb-2'>ISBN: {book.isbn}</div>
                        {book.rcnt === 0 ||
                            <span>
                                <span className='message'><BiMessageDetail /></span>
                                <span className='ms-1 rcnt'>{book.rcnt}</span>
                            </span>
                        }
                        <span className='ms-3'>
                            <span className='heart'>{book.ucnt === 0 ?
                                <BsHeart onClick={() => onClickHeart(book.bid)} />
                                :
                                <BsHeartFill onClick={() => onClickFillHeart(book.bid)} />}
                            </span>
                            <span className='ms-1 fcnt'>{book.fcnt}</span>
                        </span>
                        <hr />
                        <div>
                            <Button variant='warning' className='me-2'>장바구니</Button>
                            <Button variant='success'>바로구매</Button>
                        </div>
                    </Col>
                </Row>
            </Card>
            {/*상세설명/ 리뷰 탭 */}
            <div className='my-5'>
                <Tabs
                    defaultActiveKey="review"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3">
                    <Tab eventKey="home" title="상세설명">
                        <div className='px-3'>{book.contents}</div>
                    </Tab>
                    <Tab eventKey="review" title="리뷰">
                        <ReviewPage location={location}/>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default BookInfo