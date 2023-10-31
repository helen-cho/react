import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Spinner, Card} from 'react-bootstrap'
import {BsHeartFill, BsHeart} from 'react-icons/bs'
import {BiMessageDetail} from 'react-icons/bi'

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const getBooks = async () => {
        const url = `/books/list.json?query=&page=1&size=6&uid=${sessionStorage.getItem("uid")}`;
        setLoading(true);
        const res = await axios(url);
        //console.log(res.data);
        setBooks(res.data.list);
        setLoading(false);
    }

    useEffect(() => {
        getBooks();
    }, []);

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <Row>
                {books.map(book=>
                    <Col xs={6} md={4} lg={2} className='mb-3'>
                        <Card>
                            <Card.Body>
                                <img src={book.image || "http://via.placeholder.com/170x250"} width="100%"/>
                                <small className='ellipsis mt-2'>{book.title}</small>
                            </Card.Body>
                            <Card.Footer className="text-end">
                                <span>
                                    <span className='heart'>{book.ucnt === 0 ? <BsHeart/>:<BsHeartFill/>}</span>
                                    <small className='ms-1'>{book.fcnt}</small>
                                </span>
                                {book.rcnt===0 ||
                                    <span className='ms-3'>
                                        <BiMessageDetail/>
                                        <small className='ms-1'>{book.rcnt}</small>
                                    </span>
                                }
                            </Card.Footer>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    )
}

export default HomePage