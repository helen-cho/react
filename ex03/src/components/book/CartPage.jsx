import React, { useEffect, useState } from 'react'
import {app} from '../../firebaseInit'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { Table, Button } from 'react-bootstrap'

const CartPage = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const uid=sessionStorage.getItem("uid");
  const db = getDatabase(app);

  const callAPI = () => {
    setLoading(true);
    onValue(ref(db, `cart/${uid}`), snapshot=>{
      let rows=[];
      let count=0;
      snapshot.forEach(row=>{
        count++;
        rows.push({no:count, key:row.key, ...row.val()})
      });
      //console.log(rows);
      setBooks(rows);
      setLoading(false);
    });
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onClickDelete = (book) => {
    if(window.confirm(`"${book.title}"를 삭제하실래요?`)){
      //삭제하기
      remove(ref(db, `cart/${uid}/${book.key}`));
    }
  }

  if(loading) return <h1 className='text-center my-5'>로딩중......</h1>
  return (
    <div className='my-5'>
      <h1 className='text-center my-5'>장바구니</h1>
      <Table>
        <thead>
          <tr>
            <td>No.</td>
            <td>제목</td>
            <td>저자</td>
            <td>가격</td>
            <td>삭제</td>
          </tr>
        </thead>
        <tbody>
          {books.map(book=>
            <tr key={book.key}>
                <td>{book.no}</td> 
                <td>
                  <div className='ellipsis'>{book.title}</div>
                </td>
                <td>{book.authors}</td>
                <td>{book.price}원</td>
                <td><Button onClick={()=>onClickDelete(book)}
                  size="sm" variant='danger'>삭제</Button></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default CartPage