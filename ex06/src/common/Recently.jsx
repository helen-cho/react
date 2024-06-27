import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { Card, Row, Col } from 'react-bootstrap';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ color:'gray', fontSize:'2.5rem'}}
      onClick={onClick}>
      <BiChevronRight/>  
    </div>    
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{color:'gray', fontSize:'2.5rem'}}
      onClick={onClick}>
      <BiChevronLeft/>  
    </div>    
  );
}

const Recently = () => {
  const [goods, setGoods] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {breakpoint:1024,settings:{slidesToShow:5,slidesToScroll:1,infinite:true,dots:true}}, 
      {breakpoint:992,settings:{slidesToShow:3,slidesToScroll:3,initialSlide:2}}, 
      {breakpoint:768,settings:{slidesToShow:2,slidesToScroll:2}}
    ]
  };

  const callAPI = async() => {
    const res = await axios.get(`/goods/list?page=1&size=10`);
    //console.log(res.data.list);
    setGoods(res.data.list);
  }

  useEffect(()=> {
    callAPI();
  }, []);

  return (
    <Row>
      <Slider {...settings} className='pb-5'>
        {goods.map(good=>
          <Col key={good.gid}>
            <Card className='me-2'>
              <Card.Body>
                <img src={good.image} width='90%'/>
                <div className='ellipsis'>{good.title}</div>
                <div>{good.fmtprice}원</div>
              </Card.Body>
            </Card>    
          </Col>
        )}
      </Slider>
    </Row>
  )
}

export default Recently