import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {app} from '../../firebaseInit'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { Row, Col} from 'react-bootstrap'

const ReadPage = () => {
  const [shop, setShop] = useState('');
  const {id}  = useParams();
  const db = getFirestore(app);
  
  const callAPI = async() => {
    const snap = await getDoc(doc(db, 'shop', id));
    //console.log(snap.data());
    setShop(snap.data());
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div className='my-5'>
      <h1 className='mb-5 text-center'>상품정보</h1>
      <Row className='justify-content-center'>
        <Col md={8}>
          <div className='text-center'>
            <img src={shop.image} width="60%"/>
          </div>
          <hr/>
          <h3>{shop.title}</h3>
          <h5>등록일: {shop.date}</h5>
          <h5>가격: {shop.price}</h5>
          <h5>주소: {shop.address}</h5>
        </Col>
      </Row>
    </div>
  )
}

export default ReadPage