import React, { useEffect, useState } from 'react'
import {Button, Table} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebaseInit'
import { getFirestore, collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const ListPage = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const db = getFirestore(app);
  const email=sessionStorage.getItem("email");
  const navi = useNavigate();

  const callAPI = () => {
    setLoading(true);
    const q=query(collection(db, 'posts'), orderBy('date', 'desc'));
    let count=0;
    onSnapshot(q, res=>{
      let rows=[];
      res.forEach(row=>{
        count++;
        rows.push({no:count, id:row.id, ...row.data()});
      });
      //console.log(rows);
      setPosts(rows);
      setLoading(false);
    });
  }

  useEffect(()=>{
    callAPI();
  }, []);

  if(loading) return <h1 className='text-center my-5'>로딩중......</h1>
  return (
    <div className='my-5'>
      <h1 className='text-center'>게시판</h1>
      {email && 
        <div className='text-end mb-2'>
          <Button onClick={()=>navi('/post/insert')}>글쓰기</Button>
        </div>
      }
      <Table striped bordered hover>
        <thead>
          <tr className='text-center table-primary'>
            <td>No.</td>
            <td>제목</td>
            <td>작성자</td>
            <td>작성일</td>
          </tr>      
        </thead>
        <tbody>
          {posts.map(post=>
            <tr>
              <td>{post.no}</td>
              <td>{post.title}</td>
              <td>{post.email}</td>
              <td>{post.date}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default ListPage