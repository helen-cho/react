import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Button, Form, Row, Col} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import '../Pagination.css';

const ReviewPage = ({location}) => {
    const [reviwes, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const size=5;
    const {bid} = useParams();
    const [total, setTotal] = useState(0);

    const getReviews = async() => {
        const url=`/review/list.json?page=${page}&size=${size}&bid=${bid}`;
        const res=await axios(url);
        console.log(res.data);
        setReviews(res.data.list);
        setTotal(res.data.total);
    }

    useEffect(()=>{
        getReviews();
    }, [page]);

    const onClickWrite = () => {
        sessionStorage.setItem("target", location.pathname);
        window.location.href="/users/login";
    }

    const onChangePage = (page)=> {
        setPage(page)
    }

    return (
        <div className='py-3'>
            {!sessionStorage.getItem("uid") ? 
                <div className='px-5'>
                    <Button className='w-100' onClick={onClickWrite}>리뷰작성</Button>
                </div>
                :
                <div>
                    <Form.Control as="textarea" rows={5} placeholder='내용을 입력하세요.'/>
                    <div className='text-end mt-2'>
                        <Button className='px-5'>등록</Button>
                    </div>    
                </div>    
            }
            {reviwes.map(review=>
                <Row key={review.rid} className='my-3'>
                    <Col xs={2} md={1} className='align-self-center'>
                        <img src={review.photo||"http://via.placeholder.com/100x100"} className='photo' width="80%"/>
                        <div className='uname text-center'>{review.uname}</div>
                    </Col>
                    <Col>
                        <div className='uname'>{review.fmtdate}</div>
                        <div className='ellipsis2'>[{review.rid}] {review.contents}</div>
                    </Col>
                </Row>    
            )}
            {total > 3 &&
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

export default ReviewPage