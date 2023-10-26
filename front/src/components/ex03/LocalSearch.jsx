import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table, Spinner, Button, Form, InputGroup, Row, Col} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import LocalModal from './LocalModal';

const LocalSearch = () => {
    const [locals, setLocals] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigator=useNavigate();
    const location = useLocation();
    const search=new URLSearchParams(location.search);
    let page=parseInt(search.get("page"));
    //let query=search.get("query");
    const [query, setQuery] = useState(search.get("query"));
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);

    const getLocal = async() => {
        const url=`https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=5&page=${page}`;
        const config ={
            headers: {
                "Authorization":"KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"
            }
        }
        setLoading(true);
        const res=await axios.get(url, config);
        console.log(res.data);
        setLocals(res.data.documents);
        setTotal(res.data.meta.pageable_count); //검색수
        setEnd(res.data.meta.is_end); //마지막페이지
        setLoading(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navigator(`/local?page=1&query=${query}`);
    }
    useEffect(()=>{
        getLocal();
    }, [location]);

    return (
        <div className='my-5'>
            <h1 className='text-center my-5'>지역검색</h1>
            {loading ? 
                <div className='text-center'>
                    <Spinner variant="primary"/>
                    <h5>로딩중입니다....</h5>
                </div>
                :
                <>
                    <div>
                        <Row>
                            <Col md={4}>
                                <form onSubmit={onSubmit}>
                                    <InputGroup>
                                        <Form.Control onChange={(e)=>setQuery(e.target.value)}
                                            value={query}/>
                                        <Button type="submit">검색</Button>
                                    </InputGroup>
                                </form>
                            </Col>
                            <Col>
                                검색수: {total}
                            </Col>
                        </Row>
                    </div>
                    <hr/>
                    <Table>
                        <thead>
                            <tr>
                                <td>지역명</td>
                                <td>주소</td>
                                <td>전화</td>
                                <td>위치보기</td>
                            </tr>
                        </thead>
                        <tbody>
                            {locals.map(local=> 
                                <tr key={local.id}>
                                    <td>{local.id}:{local.place_name}</td>
                                    <td>{local.address_name}</td>
                                    <td>{local.phone}</td>
                                    <td><LocalModal local={local}/></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className='text-center'>
                        <Button onClick={()=>navigator(`/local?page=${page-1}&query=${query}`)}
                            disabled={page===1}>이전</Button>
                        <span className='mx-3'>{page}/{Math.ceil(total/5)}</span>
                        <Button onClick={()=>navigator(`/local?page=${page+1}&query=${query}`)}
                            disabled={end}>다음</Button>  
                    </div>
                </>
            }
        </div>
    )
}

export default LocalSearch