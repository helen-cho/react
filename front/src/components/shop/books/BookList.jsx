import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
    const [chcnt, setChcnt] = useState(0);

    const getBooks = async () => {
        const url = `/books/list.json?query=${query}&page=${page}&size=${size}`;
        setLoading(true);
        const res = await axios(url);
        //console.log(res.data);
        let list=res.data.list;
        list = list.map(book=> book && {...book, checked:false});
        setBooks(list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(() => {
        getBooks();
    }, [location]);

    useEffect(() => {
        let cnt=0;
        books.forEach(book=> book.checked && cnt++);
        setChcnt(cnt);
    }, [books]);

    const onChangePage = (page) =>{
        navi(`${path}?page=${page}&query=${query}&size=${size}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?page=1&query=${query}&size=${size}`);
    }

    const onDelete = async(bid) => {
        if(!window.confirm(`${bid}번 도서를 삭제하실래요?`)) return;
        const res=await axios.post('/books/delete', {bid});
        if(res.data === 0) {
            alert("삭제 실패!");
        }else{
            alert("삭제 성공!");
            getBooks();
        }
    }

    const onChangeAll = (e) => {
        const list = books.map(book=>book && {...book, checked:e.target.checked});
        setBooks(list);
    }

    const onChangeSingle = (e, bid)=> {
        const list = books.map(book=>book.bid===bid ? {...book, checked:e.target.checked} : book);
        setBooks(list);
    }

    const onClickDelete = async() => {
        if(chcnt==0) {
            alert("삭제할 도서를 선택하세요!")
        }else{
            let count=0;
            if(window.confirm(`${chcnt}권 도서를 삭제하실래요?`)) {
                for(const book of books){
                    if(book.checked) {
                        const res=await axios.post('/books/delete', {bid: book.bid});
                        if(res.data === 1) count++;
                    }
                }
                alert(`${count}권 삭제되었습니다.`);
                navi(`${path}?page=1&query=${query}&size=${size}`);
            }
        }
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
                <Col className='text-end'>
                    <Button onClick={onClickDelete}
                        variant='danger' size="sm">선택삭제</Button>
                </Col>
            </Row>
            <hr/>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>ID</th><th>이미지</th><td>제목</td>
                        <td>저자</td><td>가격</td><td>등록일</td>
                        <td>삭제</td>
                        <td><input checked={books.length===chcnt}
                                type='checkbox' onChange={onChangeAll}/></td>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book =>
                        <tr key={book.bid}>
                            <td>{book.bid}</td>
                            <td><img src={book.image || "http://via.placeholder.com/170x250"} width="30" /></td>
                            <td width="30%">
                                <div className='ellipsis'>
                                    <NavLink to={`/books/read/${book.bid}`}>{book.title}</NavLink>
                                    <span>리뷰:{book.rcnt}</span>
                                    <span>좋아요:{book.fcnt}</span>
                                </div>
                            </td>
                            <td width="20%"><div className='ellipsis'>{book.authors}</div></td>
                            <td>{book.fmtprice}원</td>
                            <td>{book.fmtdate}</td>
                            <td><Button onClick={()=>onDelete(book.bid)}
                                size='sm' variant='danger'>삭제</Button></td>
                            <td><input onChange={(e)=>onChangeSingle(e, book.bid)}
                                    type='checkbox' checked={book.checked}/></td>    
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