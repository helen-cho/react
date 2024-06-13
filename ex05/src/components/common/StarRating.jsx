import React, { useState } from 'react'
import StarRatings from 'react-star-ratings';

const StarRating = ({rating, setRating}) => {
  const onChange = (e) => {
    setRating(e);
  }

  return (
    <>
      <StarRatings
        rating={rating}
        starRatedColor='orange'
        numberOfStars={5}
        name='rating'
        starDimension='30px'
        starSpacing='1px'
        starHoverColor='orange'
        changeRating={onChange}/>
      <span className='ms-2'>{rating}</span>
    </>  
  )
}

export default StarRating