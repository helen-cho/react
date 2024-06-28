import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Row, Col, Card} from 'react-bootstrap'
import GoodsInfo from './GoodsInfo';

const ReadPage = () => {
  const [loading, setLoading] = useState(false);
  const [goods, setGoods] = useState('');
  const param=useParams();
  const {gid} = param; //비구조할당
  const {title, image, brand, maker, price, regDate, fmtprice} = goods; //비구조할당

  const callAPI = async()=>{
    setLoading(true);
    const res=await axios.get(`/goods/read/${gid}`);
    //console.log(res.data);
    const data = {...res.data, 
      fmtprice:res.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    //console.log(data);  
    setGoods(data);
    setLoading(false);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  if(loading) return <h1 className='text-center my-5'>로딩중......</h1>
  return (
    <div className='my-5'>
      <Card>
        <Card.Body>
          <Row>
            <Col className='text-center'>
              <img src={image} width='450px'/>
            </Col>
            <Col style={{fontSize:'1.5rem'}} className='py-5'>
              <div>[{gid}] {title}</div>
              <hr/>
              <div className='mb-3'>가격: {fmtprice}원</div>
              <div className='mb-3'>제조사: {maker}</div>
              <div className='mb-3'>브랜드: {brand}</div>
              <div className='mb-3'>등록일: {regDate}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <GoodsInfo goods={goods}/>
    </div>
  )
}

export default ReadPage