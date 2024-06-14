import React, { useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings'

const Stars = ({size, number, disabled, getRating}) => {
  const [rating, setRating] = useState(number);

  const onChangeRating = (number) => {
    console.log(number);
    setRating(number);
    getRating(number);
  }

  useEffect(()=>{
    setRating(number);
  }, [number]);

  return (
    <>
    {disabled ?
        <StarRatings
          rating={rating}
          starRatedColor='orange'
          numberOfStars={5}
          name='rating'
          starDimension={size}
          starSpacing='1px'
          starHoverColor='orange'/>
        :
        <StarRatings
          rating={rating}
          starRatedColor='orange'
          numberOfStars={5}
          name='rating'
          starDimension={size}
          starSpacing='1px'
          starHoverColor='orange'
          changeRating={onChangeRating}/>
    }
    </>
  )
}

export default Stars