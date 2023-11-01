import React from 'react'
import {Button, Form} from 'react-bootstrap'

const ReviewPage = ({pathname}) => {
    //console.log(pathname);
    
    const onClickWrite = () => {
        sessionStorage.setItem("target", pathname);
        window.location.href="/users/login";
    }

    return (
        <div className='py-3'>
            {!sessionStorage.getItem("uid") ? 
                <div className='px-5'>
                    <Button className='w-100' onClick={onClickWrite}>리뷰작성</Button>
                </div>
                :
                <div>
                    <Form.Control as="textarea" rows={5} placeholder='내용을 입력하세요.'/>
                    <div className='text-end mt-2'>
                        <Button className='px-5'>등록</Button>
                    </div>    
                </div>    
            }
        </div>
    )
}

export default ReviewPage