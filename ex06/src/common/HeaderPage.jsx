import React, { useState } from 'react'
import Slider from "react-slick";

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
  };

  return (
    <Slider {...settings}>
      {images.map(img=>
        <img src={img} key={img} width='100%'/>
      )}
    </Slider>
  )
}

export default HeaderPage