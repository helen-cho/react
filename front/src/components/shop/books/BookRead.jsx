import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Row, Col, Spinner, Card, Button} from 'react-bootstrap'
import { BoxContext } from '../BoxContext';

const BookRead = () => {
    const {box, setBox} = useContext(BoxContext);
    const ref_file=useRef(null);
    const [loading, setLoading] = useState(false);
    const {bid} = useParams();
    const [book, setBook] = useState({
        bid:'',
        title:'',
        price:'',
        fmtprice:'',
        authors:'',
        contents:'',
        publisher:'',
        image:'',
        isbn:'',
        regdate:'',
        fmtdate:'',
        file:null,
        ucnt:0,
        rcnt:0,
        fcnt:0
    });
    const {file,title,price,fmtprice,authors,contents,publisher,
        image,isbn,regdate,fmtdate, ucnt,rcnt, fcnt} = book;

    const getBook = async() => {
        setLoading(true);
        const res=await axios.get('/books/read/' + bid);
        //console.log(res.data);
        setBook(res.data);
        setLoading(false);
    }

    useEffect(()=>{
        getBook();
    },[]);

    const onChangeFile = (e) => {
        setBook({
            ...book,
            image: URL.createObjectURL(e.target.files[0]),
            file:e.target.files[0]
        })
    }

    const onUpdateImage = async() => {
        if(!file) {
            //alert("변경할 이미지를 선택하세요!");
            setBox({
                show:true,
                message:"변경할 이미지를 선택하세요!"
            });
        }else{
            /*
            if(window.confirm("이미지를 변경하실래요?")) {
                //이미지변경
                const formData=new FormData();
                formData.append("file", file);
                formData.append("bid", bid);
                const res= await axios.post('/books/update/image', formData);
                if(res.data===0) {
                    alert("이미지 변경실패!");
                }else{
                    alert("이미지 변경 성공!");
                    getBook();
                }
            }*/
            setBox({
                show:true,
                message:"새로운 이미지로 변경하실래요?",
                action:async ()=>{
                    const formData=new FormData();
                    formData.append("file", file);
                    formData.append("bid", bid);
                    const res= await axios.post('/books/update/image', formData);
                    if(res.data===0) {
                        //alert("이미지 변경실패!");
                        setBox({show:true, message:"이미지 변경 실패!"})
                    }else{
                        //alert("이미지 변경 성공!");
                        setBox({show:true, message:"이미지 변경 성공!"})
                        getBook();
                    }
                }
            })
        }
    }

    if(loading) return <div className='text-center my-5'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서 정보</h1>
            <Row className='justify-content-center'>
                <Col xs lg={10}>
                    <Card className='p-5'>
                        <Row>
                            <Col lg={3} xs={5} md={4} className='align-self-center'>
                                <div className='mt-1'>
                                    <img onClick={()=>ref_file.current.click()} 
                                        src={image || "http://via.placeholder.com/170x250"}
                                        width="100%" className='bookPhoto'/>
                                    <input ref={ref_file}
                                        type="file" onChange={onChangeFile} style={{display:'none'}}/>    
                                </div>
                                <Button onClick={onUpdateImage} height="100%"
                                    size='sm mt-2 w-100'>이미지 수정</Button>  
                            </Col>
                            <Col className='px-3'>
                                <h5 className='ellipsis'>{title}</h5>
                                <hr/>
                                <div className='ellipsis'>저자 : {authors}</div>
                                <div className='ellipsis'>출판사 : {publisher}</div>
                                <div className='ellipsis'>ISBN : {isbn}</div>
                                <div className='ellipsis'>가격 : {fmtprice}원</div>
                                <div className='ellipsis'>등록일 : {fmtdate}</div>
                                <hr/>
                                <div>
                                    {fcnt} : {ucnt} : {rcnt}
                                </div>
                                <NavLink to={`/books/update/${bid}`}>
                                    <Button className='mt-2 px-5' size='sm '>정보수정</Button>
                                </NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <hr/>
                                <div>{contents}</div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BookRead