import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewPage = () => {
  const navi = useNavigate();
  const uid=sessionStorage.getItem('uid');
  const {pathname} = useLocation();

  const onClickRegister = () => {
    sessionStorage.setItem('target', pathname);
    navi('/users/login');
  }

  return (
    <div className='my-5'>
      {!uid ?
        <div className='text-end'>
          <Button onClick={onClickRegister}
            variant='outline-secondary' className='px-5'>리뷰등록</Button>
        </div>
      :
        <div>
          <Form.Control as="textarea" rows={5} placeholder='내용을 입력하세요!'/>
          <div className='text-end mt-2'>
            <Button variant='outline-secondary'>등록</Button>
          </div>
        </div>
      }
    </div>
  )
}

export default ReviewPage