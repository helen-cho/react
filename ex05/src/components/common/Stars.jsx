import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'

const Stars = () => {
  const [rating, setRating] = useState(0);
  const onChangeRating = (number) => {
    console.log(number);
    setRating(number);
  }

  return (
    <StarRatings
      rating={rating}
      starRatedColor='orange'
      numberOfStars={5}
      name='rating'
      starDimension='30px'
      starSpacing='1px'
      starHoverColor='orange'
      changeRating={onChangeRating}/>
  )
}

export default Stars