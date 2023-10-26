import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Table, Button, InputGroup, Form, Row, Col} from 'react-bootstrap'

const BlogSearch = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);
    const [cnt, setCnt] = useState(0);
    const ref_query = useRef(null);

    const navigate=useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page=parseInt(search.get("page")? search.get("page") : 1);
    const [query, setQuery]=useState(search.get("query") ? search.get("query"):"커피");
    //console.log(page, query);

    const getBlogs= async()=>{
        const url=`https://dapi.kakao.com/v2/search/blog?page=${page}&query=${query}&size=5`;
        const config ={
            headers: {"Authorization":"KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"}
        }
        setLoading(true);
        const res=await axios(url, config);
        //console.log(res.data);
        let data=res.data.documents;
        data = data.map(blog=>blog && {...blog, show:false, checked:false});
        setBlogs(data);
        setEnd(res.data.meta.is_end);
        setTotal(res.data.meta.pageable_count);
        setLoading(false);
    }

    useEffect(()=>{
        getBlogs();
    },[location]);

    useEffect(()=>{
        let cnt=0;
        blogs.forEach(blog=>blog.checked && cnt++);
        console.log(cnt);
        setCnt(cnt);
    }, [blogs]);

    const onSubmit = (e) =>{
        e.preventDefault();
        if(query==""){
            alert("검색어를 입력하세요!");
            ref_query.current.focus();
        }else{
            navigate(`/blog?page=1&query=${query}`);
        }
    }

    const onClick = (url) => {
        let data=blogs.map(blog=>blog.url === url ? {...blog,show:!blog.show} : blog);
        setBlogs(data);
    }

    const onChangeAll = (e) => {
        let data=blogs.map(blog=>blog && {...blog, checked:e.target.checked});
        setBlogs(data);
    }

    const onChangeSingle = (e, url)=>{
        let data=blogs.map(blog=>blog.url===url ? {...blog, checked:e.target.checked} : blog);
        setBlogs(data);
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>블로그검색</h1>
            {loading ?
                <div>로딩중....</div>
                :
                <>
                    <Row>
                        <Col md={4}>
                            <form onSubmit={onSubmit}>
                                <InputGroup>
                                    <Form.Control ref={ref_query}
                                        value={query} onChange={(e)=>setQuery(e.target.value)}/>
                                    <Button type="submit">검색</Button>
                                </InputGroup>
                            </form>
                        </Col>
                        <Col>검색수: {total}</Col>
                    </Row>
                    <hr/>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th><input checked={cnt==blogs.length}
                                    type="checkbox" onChange={onChangeAll}/></th>
                                <th>블로그이름</th>
                                <th>제목</th>
                            </tr>
                        </thead>
                        <tbody>
                        {blogs.map((blog, index)=>
                            <tr key={blog.url}>
                                <td><input onChange={(e)=>onChangeSingle(e, blog.url)}
                                    type="checkbox" checked={blog.checked}/></td>
                                <td width="30%">{index} : <a href={blog.url}>{blog.blogname}</a></td>
                                <td>
                                    <div onClick={()=>onClick(blog.url)} 
                                        dangerouslySetInnerHTML={{__html:blog.title}} style={{cursor:'pointer',color:'blue'}}></div>
                                    {blog.show &&
                                        <div dangerouslySetInnerHTML={{__html:blog.contents}}></div>
                                    }
                                </td>
                            </tr>
                        )}    
                        </tbody>
                    </Table>
                    <div className='text-center'>
                        <Button onClick={()=>navigate(`/blog?page=${page-1}&query=${query}`)}
                            disabled={page===1}>이전</Button>
                        <span className='mx-2'>{page} / {Math.ceil(total/5)}</span>
                        <Button onClick={()=>navigate(`/blog?page=${page+1}&query=${query}`)}
                            disabled={end}>다음</Button>
                    </div> 
                </>   
            }
        </div>
    )
}

export default BlogSearch