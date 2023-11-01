import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Row, Col, Spinner, Card, Button} from 'react-bootstrap'

const BookRead = () => {
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
            alert("변경할 이미지를 선택하세요!");
        }else{
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
            }
        }
    }

    if(loading) return <div className='text-center my-5'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서 정보</h1>
            <Row className='justify-content-center'>
                <Col xs lg={10}>
                    <Card className='p-3'>
                        <Row>
                            <Col xs lg={4} className='mb-5'>
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
                                <h3>{title}</h3>
                                <hr/>
                                <div>저자 : {authors}</div>
                                <div>출판사 : {publisher}</div>
                                <div>ISBN : {isbn}</div>
                                <div>가격 : {fmtprice}원</div>
                                <div>등록일 : {fmtdate}</div>
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