import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../Paging.css'
import { useLocation } from 'react-router-dom';

const ReplyPage = ({bid}) => {
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
    const data=res.data.documents.map(doc=>doc && {...doc, isEllip:true});
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
    await axios.post('/reply/insert', 
      {bid, contents, uid:sessionStorage.getItem('uid')});
    setContents('');
    callAPI();
  }

  const onClickContents = (rid) => {
    const data=list.map(reply=>reply.rid===rid ? 
            {...reply,isEllip:!reply.isEllip}:reply);
    setList(data);
  }

  return (
    <div className='my-5'>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          {sessionStorage.getItem('uid') ?
            <div className='mb-5'>
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

          {list.map(reply=>
            <div key={reply.rid}>
              <Row>
                <Col className='text-muted' style={{fontSize:'14px'}}>
                  <span className='me-3'>{reply.uname}({reply.uid})</span>
                  <span>{reply.fmtdate}</span>
                </Col>
              </Row>
              <div style={{cursor:'pointer'}} 
                onClick={()=>onClickContents(reply.rid)}
                className={reply.isEllip && 'ellipsis'}>{reply.contents}</div>
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