import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const BookRead = () => {
    const {bid} = useParams();

    const getBook = async() => {
        const res=await axios.get('/books/read/' + bid);
        console.log(res.data);
    }

    useEffect(()=>{
        getBook();
    },[]);

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서정보</h1>
        </div>
    )
}

export default BookRead