import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Row, Col, Card, InputGroup, Form, Button } from 'react-bootstrap'

const BookSearch = () => {
    const [query, setQuery] = useState('자바');
    const [books, setBooks] = useState([]);
    const callAPI = async() => {
        const url=`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=12`;
        const config={
            headers:{"Authorization":"KakaoAK 54b6688221dead45827042df7e297c2d"}
        }
        const res= await axios.get(url, config);
        console.log(res.data);
        setBooks(res.data.documents);
    };

    useEffect(()=>{
        callAPI();
    }, []);

    return (
        <div className='my-5 bookSearch'>
            <h1 className='text-center'>도서검색</h1>
            <Row className='mb-2'>
                <Col xs={8} md={6} lg={4}>
                    <form>
                        <InputGroup>
                            <Form.Control placeholder='검색어'/>
                            <Button>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Row>
                {books.map(book=>
                    <Col xs={6} md={4} lg={2} className='mb-3'>
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
    )
}

export default BookSearch