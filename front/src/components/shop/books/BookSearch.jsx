import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, CardGroup, Form, Col, Row, Spinner, InputGroup} from 'react-bootstrap'

const BookSearch = () => {
    const location= useLocation();
    const path=location.pathname;
    const navi = useNavigate();
    const search = new URLSearchParams(location.search);
    const page=search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery]=useState(search.get("query")? search.get("query"):"리액트");
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);

    const getBooks = async() => {
        const url=`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=5&page=${page}`;
        const config ={
            headers: {"Authorization":"KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"}
        }
        setLoading(true);
        const res= await axios(url, config);
        //console.log(res.data);
        let docs=res.data.documents;
        docs=docs.map(doc=>doc && {...doc, checked:true});
        setBooks(docs);
        setTotal(res.data.meta.pageable_count);
        setEnd(res.data.meta.is_end);
        setLoading(false);
    }

    useEffect(()=>{
        getBooks();
    }, [location]);

    const onSearch = (e)=>{
        e.preventDefault();
        if(query==="") {
            alert("검색어를 입력하세요!");
        }else{
            navi(`${path}?query=${query}&page=1`);
        }
    }

    const onInsert = async(book) => {
        if(window.confirm('새로운 도서를 등록하실래요?')) {
            //console.log(book);
            const url="/books/insert"
            const res=await axios.post(url, {...book, authors:book.authors.join()});
            //console.log(res.data);
            if(res.data==0) {
                alert("도서가 등록되었습니다!");
            }else{
                alert("이미 등록된 도서입니다!");
            }
        }
    }

    if(loading) return <div className='text-center my-5'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서검색</h1>
            <Row>
                <Col md={3}>
                    <form onSubmit={onSearch}>
                        <InputGroup>
                            <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)}/>
                            <Button type="submit">검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='mt-1'>검색수: {total}권</Col>
            </Row>
            <hr/>
            <Table striped>
                <thead>
                    <tr>
                        <th>이미지</th><th>제목</th><th>가격</th><th>저자</th><th>저장</th>
                        <th><input type="checkbox"/></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book=>
                    <tr key={book.isbn}>
                        <td><img src={book.thumbnail || "http://via.placeholder.com/170x250"} width="30"/></td>
                        <td>{book.title}</td>
                        <td>{book.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                        <td>{book.authors}</td>
                        <td><Button size="sm" onClick={()=>onInsert(book)}>저장</Button></td>
                        <td><input type="checkbox" checked={book.checked}/></td>
                    </tr>
                    )}
                </tbody>
            </Table>
            {total > 5 &&
                <div className='text-center'>
                    <Button onClick={()=>navi(`${path}?query=${query}&page=${page-1}`)}
                        disabled={page===1}>이전</Button>
                    <span className="mx-2">{page} / {Math.ceil(total/5)}</span>
                    <Button onClick={()=>navi(`${path}?query=${query}&page=${page+1}`)}
                        disabled={end}>다음</Button>
                </div>    
            }            
        </div>
    )
}

export default BookSearch