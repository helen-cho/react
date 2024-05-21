import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Row, Col, Card, InputGroup, Form, Button } from 'react-bootstrap'

const BookSearch = () => {
    const [total, setTotal] = useState(0);
    const [last, setLast] = useState(false);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('자바');
    const [books, setBooks] = useState([]);

    const callAPI = async() => {
        const url=`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=12&page=${page}`;
        const config={
            headers:{"Authorization":"KakaoAK 54b6688221dead45827042df7e297c2d"}
        }
        const res= await axios.get(url, config);
        console.log(res.data);
        setBooks(res.data.documents);
        setLast(res.data.meta.is_end);
        setTotal(res.data.meta.pageable_count);
    };

    useEffect(()=>{
        callAPI();
    }, [page]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(query === "") {
            alert("검색어를 입력하세요!");
        }else{
            setPage(1);
            callAPI();
        }
    }

    return (
        <div className='my-5 bookSearch'>
            <h1 className='text-center'>도서검색</h1>
            <Row className='mb-2'>
                <Col xs={8} md={6} lg={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control onChange={(e)=>setQuery(e.target.value)}
                                value={query} placeholder='검색어'/>
                            <Button type="submit">검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col>
                    <div className='mt-2'>검색수: {total}권</div>
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
            {total > 12 &&
                <div className='text-center'>
                    <Button onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
                    <span className='mx-3'>{page}</span>
                    <Button onClick={()=>setPage(page+1)} disabled={last}>다음</Button>
                </div>
            }
        </div>
    )
}

export default BookSearch