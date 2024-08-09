import React, { useEffect, useState } from 'react'
import {app} from '../../firebaseInit'
import { getFirestore, onSnapshot, collection, query, orderBy } 
    from 'firebase/firestore'
import { Button, Table } from 'react-bootstrap'

const ListPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);

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
               <td>{shop.title}</td> 
               <td>{shop.address}</td>
               <td className='text-end'>{shop.price}</td>
               <td width={80}>
                <Button>삭제</Button>
               </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default ListPage