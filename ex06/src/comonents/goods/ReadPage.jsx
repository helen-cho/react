import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Row, Col, Card} from 'react-bootstrap'

const ReadPage = () => {
  const [goods, setGoods] = useState('');
  const param=useParams();
  const {gid} = param; //비구조할당
  const {title, image, brand, maker, price, regDate} = goods; //비구조할당

  const callAPI = async()=>{
    const res=await axios.get(`/goods/read/${gid}`);
    //console.log(res.data);
    setGoods(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <img src={image} width='500px'/>
            </Col>
            <Col style={{fontSize:'1.5rem'}} className='py-5'>
              <div>{title}</div>
              <hr/>
              <div>가격: {price}원</div>
              <div>제조사: {maker}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ReadPage