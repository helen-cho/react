import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Row, Col, Card} from 'react-bootstrap'
import GoodsInfo from './GoodsInfo';
import Recently from '../../common/Recently';

const ReadPage = () => {
  const [related, setRelated] = useState([]);
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

  const callRelated = async() => {
    const res1=await axios.get(`/goods/related/list/${gid}`);
    //console.log(res1.data);
    setRelated(res1.data);
  }

  useEffect(()=>{
    callAPI();
    callRelated();
  }, []);

  if(loading) return <h1 className='text-center my-5'>로딩중......</h1>
  return (
    <div className='my-5' style={{height:'1500px'}}>
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
      {related.length >=5 && 
        <div className='mt-5'>
          <h3>관련상품</h3>
          <Recently goods={related}/>
        </div>
      }
      <GoodsInfo goods={goods}/>
    </div>
  )
}

export default ReadPage