import React, { useEffect, useState } from 'react'
import {Row, Col, Button, Form} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { app } from '../../firebaseInit'
import { getFirestore, addDoc, collection, orderBy, where, onSnapshot,query } from 'firebase/firestore'
import moment from 'moment'

const ListPage = ({id}) => {
  const [comments, setComments] = useState([]);
  const db = getFirestore(app);
  const navi = useNavigate();
  const {pathname} = useLocation();
  const [content, setContent] = useState('');

  const callAPI = () => {
    const q=query(collection(db, 'comments'),where('id','==',id),orderBy('date','desc'));
    onSnapshot(q, res=>{
      let rows=[];
      res.forEach(row=>{
        rows.push({cid: row.id, ...row.data()})
      });
      //console.log(rows);
      setComments(rows)
    });
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onClickInsert = async() => {
    if(sessionStorage.getItem('email')){
      if(content === "") {
        alert("댓글내용을 입력하세요!");
        return;
      }
      //댓글저장
      //alert(content);
      const email=sessionStorage.getItem('email');
      const date=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const comment={id, email, date, content};
      //console.log(comment);
      await addDoc(collection(db, `comments`), comment);
      alert("댓글등록");
      setContent("");
    }else{
      //console.log(pathname);
      sessionStorage.setItem('target', pathname);
      navi('/user/login');
    }
  }
  return (
    <Row className='justify-content-center my-5 comments'>
      <Col xs={12} md={10} lg={8}>
        {sessionStorage.getItem('email') && 
          <div>
            <Form.Control value={content} onChange={(e)=>setContent(e.target.value)}
              as="textarea" rows={5} placeholder='댓글내용을 입력하세요.'/>
          </div>
        }
        <div className='text-end my-2'>
          <Button onClick={onClickInsert}
            className='px-5' variant='outline-secondary'>댓글등록</Button>
        </div>
        <div className='comments my-5'>
          {comments.map(c=>
            <div key={c.cid}>
              <Row className='mb-2'>
                <Col className='text-muted'>
                  <span>{c.date}</span>
                  <span className='mx-2'>({c.email})</span>
                </Col>
                {c.email===sessionStorage.getItem('email') &&
                  <Col className='text-end'>
                    <Button variant='outline-secondary' size="sm">수정</Button>
                    <Button variant='outline-secondary' size="sm" className='ms-2'>삭제</Button>
                  </Col>
                }
              </Row>
              <div className="ellipsis2" style={{whiteSpace:'pre-wrap'}}>{c.content}</div>
              <hr/>
            </div>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default ListPage