import React from 'react'
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
import axios from 'axios';

const BookSearch = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const getBooks = async() =>{
        const url="https://dapi.kakao.com/v3/search/book?target=title&query=자바";
        const config ={
            headers: {
                "Authorization":"KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"
            }
        }
        setLoading(true);
        const res=await axios.get(url, config);
        //console.log(res);
        setBooks(res.data.documents);
        setLoading(false);
    }

    useEffect(()=>{
        getBooks();
    }, []);

    if(loading) return <h1 className='text-center my-5'>잠시만 기다리세요....</h1>

    return (
        <div>
            <h1 className='text-center mb-5'>도서검색</h1>
            <Table>
                <thead></thead>
                <tbody></tbody>
            </Table>
        </div>
    )
}

export default BookSearch