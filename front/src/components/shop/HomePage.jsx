import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Spinner, Card} from 'react-bootstrap'
import {BsHeartFill, BsHeart} from 'react-icons/bs'
import {BiMessageDetail} from 'react-icons/bi'
import Pagination from "react-js-pagination";
import './Pagination.css';
import {useNavigate, useLocation} from 'react-router-dom'

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const navi = useNavigate();

    const location=useLocation();
    const search=new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const path = location.pathname;

    const getBooks = async () => {
        const url = `/books/list.json?query=&page=${page}&size=6&uid=${sessionStorage.getItem("uid")}`;
        setLoading(true);
        const res = await axios(url);
        //console.log(res.data);
        setBooks(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(() => {
        getBooks();
    }, [location]);

    const onChangePage = (page) => {
        navi(`${path}?query=&page=${page}&size=6&uid=${sessionStorage.getItem("uid")}`);
    }

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <Row>
                <Col>검색수: {total}권</Col>
            </Row>
            <Row>
                {books.map(book=>
                    <Col xs={6} md={4} lg={2} className='mb-3'>
                        <Card>
                            <Card.Body>
                                <img src={book.image || "http://via.placeholder.com/170x250"} width="100%"/>
                                <small className='ellipsis mt-2'>{book.title}</small>
                            </Card.Body>
                            <Card.Footer className="text-end">
                                {book.rcnt===0 ||
                                    <span>
                                        <span className='message'><BiMessageDetail/></span>
                                        <span className='ms-1 rcnt'>{book.rcnt}</span>
                                    </span>
                                }
                                <span className='ms-3'>
                                    <span className='heart'>{book.ucnt === 0 ? <BsHeart/>:<BsHeartFill/>}</span>
                                    <span className='ms-1 fcnt'>{book.fcnt}</span>
                                </span>
                            </Card.Footer>
                        </Card>
                    </Col>
                )}
            </Row>
            <Pagination
                activePage={page}
                itemsCountPerPage={6}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={onChangePage}/>
        </div>
    )
}

export default HomePage