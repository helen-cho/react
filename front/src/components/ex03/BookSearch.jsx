import React from 'react'
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap'
import axios from 'axios';
import Book from './Book';

const BookSearch = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);
    const [end, setEnd] = useState(false);

    const getBooks = async() =>{
        const url=`https://dapi.kakao.com/v3/search/book?target=title&query=노드&size=5&page=${page}`;
        const config ={
            headers: {
                "Authorization":"KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"
            }
        }
        setLoading(true);
        const res=await axios.get(url, config);
        //console.log(res);
        setLast(Math.ceil(res.data.meta.pageable_count/5)); //마지막페이지
        setBooks(res.data.documents);
        setEnd(res.data.meta.is_end); //마지막페이지이면 True
        setLoading(false);
    }

    useEffect(()=>{
        getBooks();
    }, [page]);

    if(loading) return <h1 className='text-center my-5'>잠시만 기다리세요....</h1>

    return (
        <div>
            <h1 className='text-center mb-5'>도서검색</h1>
            <Table>
                <thead>
                    <tr><td>이미지</td><td>제목</td><td>가격</td><td>저자</td></tr>
                </thead>
                <tbody>
                    {books.map(book=>
                        <Book book={book}/>
                    )}
                </tbody>
            </Table>
            <div className='text-center'>
                <Button onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
                <span className='mx-3'>{page} / {last}</span>
                <Button onClick={()=>setPage(page+1)} disabled={end}>다음</Button>
            </div>
        </div>
    )
}

export default BookSearch