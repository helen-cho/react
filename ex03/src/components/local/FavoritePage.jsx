import React, { useEffect } from 'react'
import { app } from '../../firebaseInit'
import { getDatabase, ref, onValue } from 'firebase/database'

const FavoritePage = () => {
  const db = getDatabase(app);
  const uid= sessionStorage.getItem('uid');

  const callAPI = () => {
    onValue(ref(db, `favorite/${uid}`), res=>{
      let rows= [];
      let count=0;
      res.forEach(row=>{
        count++;
        rows.push({no:count, key:row.key, ...row.val()});
      });
      console.log(rows);
    });
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div className='my-5'>
      <h1 className='my-5 text-center'>즐겨찾기</h1>
    </div>
  )
}

export default FavoritePage