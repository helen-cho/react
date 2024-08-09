import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {app} from '../../firebaseInit'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const ReadPage = () => {
  const {id}  = useParams();
  const db = getFirestore(app);
  
  const callAPI = async() => {
    const snap = await getDoc(doc(db, 'shop', id));
    console.log(snap.data());
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div className='my-5'>
      <h1 className='mb-5 text-center'>상품정보</h1>
    </div>
  )
}

export default ReadPage