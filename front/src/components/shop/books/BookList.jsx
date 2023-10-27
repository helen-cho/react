import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Table, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import '../Pagination.css';

const BookList = () => {
    const size = 5;
    const location = useLocation();
    const navi=useNavigate();
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "");
    //console.log(path, query, page, size);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const getBooks = async () => {
        const url = `/books/list.json?query=${query}&page=${page}&size=${size}`;
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

    const onChangePage = (page) =>{
        navi(`${path}?page=${page}&query=${query}&size=${size}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?page=1&query=${query}&size=${size}`);
    }

    if (loading) return <div className='my-5 text-center'><Spinner variant='primary' /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서목록</h1>
            <Row>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)}/>
                            <Button>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='mt-1'>검색수: {total}권</Col>
            </Row>
            <hr/>
            <Table>
                <thead>
                    <tr><th>ID</th><th>이미지</th><td>제목</td><td>저자</td><td>가격</td><td>등록일</td></tr>
                </thead>
                <tbody>
                    {books.map(book =>
                        <tr key={book.bid}>
                            <td>{book.bid}</td>
                            <td><img src={book.image} width="30" /></td>
                            <td width="30%"><div className='ellipsis'>{book.title}</div></td>
                            <td width="20%"><div className='ellipsis'>{book.authors}</div></td>
                            <td>{book.fmtprice}원</td>
                            <td>{book.fmtdate}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
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

export default BookList