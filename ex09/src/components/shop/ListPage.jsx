import React, { useEffect, useState } from 'react'
import {app} from '../../firebaseInit'
import { deleteDoc, doc, getFirestore, onSnapshot, collection, query, orderBy } 
    from 'firebase/firestore'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ListPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);

  const onDelete = async(id) => {
    if(!window.confirm(`${id}번 상품을 삭제하실래요?`)) return;
    await deleteDoc(doc(db, 'shop', id));
    alert("상품삭제완료!");
  }

  const callAPI = () => {
    setLoading(true);
    const q = query(collection(db, 'shop'), orderBy('date', 'desc'));
    onSnapshot(q, snap=>{
      let rows=[];
      snap.forEach(row=>{
        rows.push({id:row.id, ...row.data()});
      });
      setList(rows);
      setLoading(false);
    });
  }

  useEffect(()=>{
    callAPI();
  }, []);

  if (loading) return <h1 className='text-center my-5'>로딩중......</h1>
  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>상품목록</h1>
      <Table className='table table-hover'>
        <tbody>
          {list.map(shop=>
            <tr key={shop.id}>
               <td><img src={shop.image} width={50}/></td>
               <td>
                  <Link to={`/shop/${shop.id}`}>{shop.title}</Link>
                  <br/>
                  {shop.writer}
                </td> 
               <td>{shop.address}</td>
               <td className='text-end'>{shop.price}</td>
               <td width={80}>
                {sessionStorage.getItem('email') === shop.writer &&
                  <Button onClick={()=>onDelete(shop.id)}>삭제</Button>
                }
               </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default ListPage