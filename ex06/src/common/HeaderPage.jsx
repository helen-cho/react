import React, { useState } from 'react'
import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

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

const HeaderPage = () => {
  const [images, setImages] = useState([
    '/images/header01.png',
    '/images/header02.png',
    '/images/header03.png',
    '/images/header04.png',
  ]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <Slider {...settings}>
      {images.map((img, index)=>
        <img src={img} key={img} width='100%'/>
      )}
    </Slider>
  )
}

export default HeaderPage