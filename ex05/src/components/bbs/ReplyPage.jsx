import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../Paging.css'
import { useLocation } from 'react-router-dom';
import StarRating from '../common/StarRating';

const ReplyPage = ({bid}) => {
  const uid=sessionStorage.getItem('uid');
  const [rating, setRating] = useState(0);
  const {pathname}=useLocation();
  const [contents, setContents] = useState('');
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);

  const callAPI = async()=>{
    const url=`/reply/list.json/${bid}?page=${page}&size=${size}`;
    const res=await axios.get(url);
    //console.log(res.data);
    const data=res.data.documents.map(doc=>doc && {...doc, isEllip:true, isEdit:false});
    setList(data);
    setCount(res.data.total);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  const onClickRegister = () => {
    sessionStorage.setItem('target', pathname + '?isCnt=false');
    window.location.href='/users/login';
  }

  const onClickInsert = async() => {
    if(contents===''){
      alert('댓글 내용을 입력하세요!');
      return;
    }
    alert(rating);
    await axios.post('/reply/insert', 
      {bid, contents, uid:sessionStorage.getItem('uid')});
    setContents('');
    callAPI();
  }

  const onClickContents = (rid) => {
    const data=list.map(reply=>reply.rid===rid ? 
            {...reply,isEllip:!reply.isEllip} : reply);
    setList(data);
  }

  const onClickDelete = async(rid) => {
    if(!window.confirm(`${rid}번 댓글을 삭제하실래요?`)) return;
    await axios.post(`/reply/delete/${rid}`);
    callAPI();
  }

  const onClickUpdate = (rid) => {
    const data=list.map(reply=>reply.rid===rid ? {...reply, isEdit:true} : reply);
    setList(data);     
  }

  return (
    <div className='my-5'>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          {sessionStorage.getItem('uid') ?
            <div className='mb-5'>
              <div className='mb-2'>
                <StarRating rating={rating} setRating={setRating}/>
              </div>  
              <Form.Control value={contents} 
                onChange={(e)=>setContents(e.target.value)}
                as="textarea" rows={5}/>
              <div className='text-end mt-2'>
                <Button onClick={onClickInsert} className='px-5'>등록</Button>
              </div>
            </div>
          :
            <div className='text-end mb-3'>
              <Button onClick={onClickRegister}
                className='px-5'>댓글등록</Button>
            </div>
          }
          {count > 0 &&
            <div className='mb-3'>댓글수: {count}</div>
          }
          {list.map(reply=>
            <div key={reply.rid}>
              <Row>
                <Col className='text-muted' style={{fontSize:'14px'}}>
                  <span className='me-3'>{reply.uname}({reply.uid})</span>
                  <span>{reply.fmtdate}</span>
                </Col>
                {uid === reply.uid && !reply.isEdit &&
                  <Col className='text-end mb-2'>
                    <Button onClick={()=>onClickUpdate(reply.rid)}
                      size="sm" variant='outline-secondary' className='me-2'>수정</Button>
                    <Button onClick={()=>onClickDelete(reply.rid)}
                      size="sm" variant='outline-secondary'>삭제</Button>
                  </Col>
                }

                {uid === reply.uid && reply.isEdit &&
                  <Col className='text-end mb-2'>
                    <Button 
                      size="sm" variant='outline-secondary' className='me-2'>저장</Button>
                    <Button 
                      size="sm" variant='outline-secondary'>취소</Button>
                  </Col>
                }
              </Row>

              {reply.isEdit ?
                <div>
                  <Form.Control as="textarea" rows={5} value={reply.contents}/>
                </div>  
                :
                <div style={{whiteSpace:'pre-wrap', cursor:'pointer'}} 
                  onClick={()=>onClickContents(reply.rid)}
                  className={reply.isEllip && 'ellipsis'}>{reply.contents}</div>
              }
              <hr/>
            </div>
          )}
        </Col>
      </Row>
      {count > size &&
        <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={ (e)=>setPage(e) }/>
        }
    </div>

  )
}

export default ReplyPage