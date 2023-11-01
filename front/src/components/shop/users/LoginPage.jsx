import axios from 'axios';
import React, { useRef, useState } from 'react'
import {Row, Col, Form, InputGroup, Button, Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navi=useNavigate();
    const ref_uid = useRef(null);
    const [form, setForm] = useState({
        uid: 'blue',
        upass: 'pass'
    });
    const {uid, upass} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        if(uid==="") {
            alert("아이디를 입력하세요!");
            ref_uid.current.focus();
        }else if(upass===""){
            alert("비밀번호를 입력하세요!");
        }else{
            const res=await axios.post('/users/login', form);
            if(res.data==0){
                alert("아이디가 존재하지 않습니다!");
                ref_uid.current.focus();
            }else if(res.data==2){
                alert("비빌번호가 일치하지 않습니다!");
            }else{
                sessionStorage.setItem("uid", uid);
                if(sessionStorage.getItem("target")){
                    navi(sessionStorage.getItem("target"));
                }else{
                    navi('/');
                }
            }
        }
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>로그인</h1>
            <Row className='justify-content-center'>
                <Col md={6} className='mx-3'>
                    <Card className='p-3'>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>아이디</InputGroup.Text>
                                <Form.Control onChange={onChange} ref={ref_uid}
                                    value={uid} name='uid'/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>비밀번호</InputGroup.Text>
                                <Form.Control onChange={onChange}
                                    type="password" value={upass} name='upass'/>
                            </InputGroup>
                            <Button className='w-100' type="submit">로그인</Button>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage