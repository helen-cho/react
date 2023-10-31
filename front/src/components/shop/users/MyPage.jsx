import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Spinner, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const navi = useNavigate();
    const ref_file = useRef(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        uid:'',
        upass:'',
        uname:'',
        phone:'',
        address1:'',
        address2:'',
        fmtdate:'',
        fmtmodi:'',
        photo:'',
        file:null
    });

    const {uid, upass, uname, phone, address1, address2, fmtdate, fmtmodi, photo, file} = user;
    const getUser = async() => {
        setLoading(true);
        const res=await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
        setUser(res.data);
        setLoading(false);
    }

    const onChangeFile = (e) => {
        setUser({
            ...user,
            photo: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }

    const onUpdatePhoto = async() => {
        if(!file) {
            alert("수정할 사진을 선택하세요!");
        }else{
            if(window.confirm("변경된 사진을 저장하실래요?")){
                //사진저장
                const formData=new FormData();
                formData.append("file", file);
                formData.append("uid", uid);
                await axios.post("/users/update/photo", formData);
                alert("사진이 변경되었습니다.");
            }
        }
    }

    useEffect(()=>{
        getUser();
    }, []);

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>마이페이지</h1>
            <Row className='justify-content-center mx-3'>
                <Col md={8}>
                    <Card className='p-5'>
                        <div>
                            <img onClick={()=>ref_file.current.click()} 
                                src={photo || "http://via.placeholder.com/200x200"} width="100" className='photo'/>
                            <input type="file" ref={ref_file} onChange={onChangeFile} style={{display:'none'}}/>
                            <br/>
                            <Button onClick={onUpdatePhoto} size='sm mt-2'>이미지수정</Button>
                            <hr/>
                        </div>
                        <div>
                            <div className='mb-2'>이름: {uname}</div>
                            <div className='mb-2'>전화: {phone}</div>
                            <div className='mb-2'>주소: {address1} {address2}</div>
                            <div className='mb-2'>가입일: {fmtdate}</div>
                            <div className='mb-2'>수정일: {fmtmodi}</div>
                            <hr/>
                            <Button size="sm" onClick={()=>navi('/users/update')}>정보수정</Button>
                        </div>
                    </Card>    
                </Col>
            </Row>
        </div>
    )
}

export default MyPage