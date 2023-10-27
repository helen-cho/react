import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import { Spinner, Table } from 'react-bootstrap';

const BookList = () => {
    const size=5;
    const location = useLocation();
    const path=location.pathname;
    const search=new URLSearchParams(location.search);
    const page=search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState(search.get("query") ? search.get("query") :"");
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
    }, []);

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서목록</h1>
            <Table>
                <thead>
                    <tr><th>ID</th><th>이미지</th><td>제목</td><td>저자</td><td>가격</td></tr>
                </thead>
                <tbody>
                    {books.map(book=>
                    <tr key={book.bid}>
                        <td>{book.bid}</td>
                        <td><img src={book.image} width="30"/></td>
                        <td>{book.title}</td>
                        <td>{book.authors}</td>
                        <td>{book.price}</td>
                    </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default BookList