import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {Button, Form, Row, Col} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import '../Pagination.css';
import {BoxContext} from '../BoxContext';

const ReviewPage = ({location, setBook, book}) => {
    const [reviwes, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const size=5;
    const {bid} = useParams();
    const [total, setTotal] = useState(0);
    const [contents, setContents] =useState("");
    const {box, setBox} = useContext(BoxContext);

    const getReviews = async() => {
        const url=`/review/list.json?page=${page}&size=${size}&bid=${bid}`;
        const res=await axios(url);
        //console.log(res.data);
        let list=res.data.list;
        list=list.map(r=>r && {...r, ellipsis:true, edit:false, text:r.contents});
        setReviews(list);
        setTotal(res.data.total);
        setBook({...book, rcnt:res.data.total});
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

    const onChangeEllipsis = (rid) => {
        const list=reviwes.map(r=>r.rid===rid ? {...r, ellipsis:!r.ellipsis} : r);
        setReviews(list);
    }

    const onClickRegister = async() => {
        if(contents==="") {
            setBox({show:true, message:'내용을입력하세요!'});
        }else{
            const res=await axios.post('/review/insert', {
                uid:sessionStorage.getItem("uid"),
                bid,
                contents
            });
            if(res.data === 1) {
                getReviews();
                setContents("");
            }
        }
    }

    const onClickDelete = async(rid) => {
        /*
        if(window.confirm(`${rid}번 리뷰를 삭제하실래요?`)){
            const res=await axios.post('/review/delete', {rid:rid});
            if(res.data===1) {
                getReviews();
            }
        }
        */
        setBox({
            show:true,
            message:`${rid}번 리뷰를 삭제하실래요?`,
            action: async()=>{
                const res=await axios.post('/review/delete', {rid:rid});
                if(res.data===1) {
                    getReviews();
                }
            }
        })
    }

    const onClickUpdate = (rid)=> {
        const list=reviwes.map(r=>r.rid===rid ? {...r, edit:true} : r);
        setReviews(list);
    }

    
    const onClickCancel = (rid, text, contents)=> {
        if(text !== contents){
            //if(!window.confirm("정말로 취소할래요?")) return;
            setBox({
                show:true,
                message:"정말로 취소하실래요?",
                action: ()=> {
                    const list=reviwes.map(r=>r.rid===rid ? {...r, edit:false, text:r.contents} : r);
                    setReviews(list);
                }
            })
        }else{
            const list=reviwes.map(r=>r.rid===rid ? {...r, edit:false, text:r.contents} : r);
            setReviews(list);
        }
    }

    const onChange = (rid, e) =>{
        const list=reviwes.map(r=>r.rid===rid ? {...r, text:e.target.value} : r);
        setReviews(list);
    }

    const onClickSave =async(rid, text, contents) => {
        if(text === contents) return;
        /*
        if(window.confirm("수정하실래요?")){
            const res=await axios.post("/review/update", {rid, contents:text});
            if(res.data === 1) {
                getReviews();
            }
        }
        */
        setBox({
            show:true,
            message:'정말로 저장하실래요?',
            action:async ()=>{
                const res=await axios.post("/review/update", {rid, contents:text});
                if(res.data === 1) {
                    getReviews();
                }
            }
        });
    }

    return (
        <div className='py-3'>
            {!sessionStorage.getItem("uid") ? 
                <div className='px-5'>
                    <Button className='w-100' onClick={onClickWrite}>리뷰작성</Button>
                </div>
                :
                <div>
                    <Form.Control value={contents} onChange={(e)=>setContents(e.target.value)}
                        as="textarea" rows={5} placeholder='내용을 입력하세요.'/>
                    <div className='text-end mt-2'>
                        <Button className='px-5' onClick={onClickRegister}>등록</Button>
                    </div>    
                </div>    
            }
            {reviwes.map(review=>
                <Row key={review.rid} className='my-3'>
                    <Col xs={2} md={1} className='align-self-center'>
                        <img src={review.photo||"http://via.placeholder.com/100x100"} className='photo' width="80%"/>
                        <div className='uname'>{review.uname}</div>
                    </Col>
                    <Col>
                        <div className='uname'>{review.fmtdate}</div>
                        {!review.edit ?
                            <>
                                <div onClick={()=>onChangeEllipsis(review.rid)} style={{cursor:'pointer'}}
                                    className={review.ellipsis && 'ellipsis2'}>[{review.rid}] {review.contents}</div>
                                {sessionStorage.getItem("uid") === review.uid &&    
                                    <div className='text-end'>
                                        <Button onClick={()=>onClickDelete(review.rid)}
                                            variant='danger' size='sm me-2'>삭제</Button>
                                        <Button onClick={()=>onClickUpdate(review.rid)}
                                            size='sm'>수정</Button>
                                    </div>    
                                }
                            </>
                            :
                            <>
                                <Form.Control onChange={(e)=>onChange(review.rid, e)}
                                    value={review.text} rows={5} as="textarea"/>
                                <div className='text-end mt-2'>
                                    <Button onClick={()=>onClickSave(review.rid, review.text, review.contents)} 
                                        variant='success' size="sm me-2">저장</Button>
                                    <Button onClick={()=>onClickCancel(review.rid, review.text, review.contents)}
                                        variant='secondary' size="sm">취소</Button>
                                </div>
                            </>
                        }
                    </Col>
                    <hr className='mt-2'/>
                </Row>    
            )}
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

export default ReviewPage