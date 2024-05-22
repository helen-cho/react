import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Card} from 'react-bootstrap'

const BookSearch = () => {
    const [books, setBooks] = useState([]);
    const callAPI = async() => {
        const url="https://dapi.kakao.com/v3/search/book?target=title&query=리액트&size=12";
        const config={
            headers: {"Authorization":"KakaoAK 54b6688221dead45827042df7e297c2d"}
        };
        const res=await axios(url, config);
        console.log(res);
        setBooks(res.data.documents);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    return (
        <div className='my-5 bookSearch'>
            <h1 className='text-center'>도서검색</h1>
            <Row>
                {books.map(book=>
                    <Col xs={6} md={4} lg={2} className='mb-2'>
                        <Card>
                            <Card.Body>
                                <img src={book.thumbnail} width="100%"/>
                            </Card.Body>
                            <Card.Footer>
                                <div className='ellipsis title'>{book.title}</div>
                            </Card.Footer>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default BookSearch