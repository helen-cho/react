import React from 'react'
import {Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const ListPage = () => {
  const email=sessionStorage.getItem("email");
  const navi = useNavigate();

  return (
    <div className='my-5'>
      <h1 className='text-center'>게시판</h1>
      {email && 
        <div className='text-end'>
          <Button onClick={()=>navi('/post/insert')}>글쓰기</Button>
        </div>
      }
    </div>
  )
}

export default ListPage