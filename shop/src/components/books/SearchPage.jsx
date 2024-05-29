import axios from 'axios';
import React, { useEffect } from 'react'

const SearchPage = () => {
  const callAPI = async() => {
    const url=`https://dapi.kakao.com/v3/search/book?target=title&query=리액트`;
    const config = {
      "headers": {"Authorization": "KakaoAK 54b6688221dead45827042df7e297c2d"}
    }
    const res =await axios.get(url, config);
    console.log(res.data);
  }
  
  useEffect(()=>{
    callAPI()
  }, []);

  return (
    <div className='my-5'>
      <h1 className='text-center'>도서검색</h1>
    </div>
  )
}

export default SearchPage