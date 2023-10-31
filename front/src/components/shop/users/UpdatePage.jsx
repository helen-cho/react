import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { InputGroup,Form, Button, Col, Row, Spinner } from 'react-bootstrap'
import ModalPostCode from './ModalPostCode';
import { useNavigate } from 'react-router-dom';

const UpdatePage = () => {
    const navi=useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        uid:'',
        upass:'',
        uname:'',
        photo:'',
        phone:'',
        address1:'',
        address2:'',
        fmtdate:''
    });
    const {uid, upass, uname, photo, phone, address1, address2, fmtdate} = user;
    const getUser = async() => {
        setLoading(true);
        const res=await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
        setUser(res.data);
        setLoading(false);
    }

    useEffect(()=>{
        getUser();
    }, []);

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onUpdate = async(e) => {
        e.preventDefault();
        if(window.confirm('정보를 수정하실래요?')){
            const res=await axios.post('/users/update', user);
            if(res.data==1) {
                alert("정보가 수정되었습니다.");
                navi('/users/mypage');
            }else{
                alert("정보수정이 실패했습니다.");
            }
        }
    }
    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>정보수정</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <form onSubmit={onUpdate}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>이름</InputGroup.Text>
                            <Form.Control value={uname} name="uname" onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>전화</InputGroup.Text>
                            <Form.Control value={phone} name="phone" onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>주소</InputGroup.Text>
                            <Form.Control value={address1} name="address1" onChange={onChange} readOnly/>
                            <ModalPostCode user={user} setUser={setUser}/>
                        </InputGroup>
                        <Form.Control placeholder='상세주소' name="address2" value={address2} onChange={onChange}/>
                        <div className='text-center my-3'>
                            <Button className='me-2' type="submit">저장</Button>
                            <Button variant='secondary' onClick={()=>getUser()}>취소</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    )
}

export default UpdatePage