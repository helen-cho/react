import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'

const BlogSearch = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);

    const navigate=useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page=parseInt(search.get("page"));
    const query=search.get("query");
    //console.log(page, query);

    const getBlogs= async()=>{
        const url=`https://dapi.kakao.com/v2/search/blog?page=${page}&query=${query}&size=5`;
        const config ={
            headers: {"Authorization":"KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"}
        }
        setLoading(true);
        const res=await axios(url, config);
        //console.log(res.data);
        setBlogs(res.data.documents);
        setEnd(res.data.meta.is_end);
        setTotal(res.data.meta.pageable_count);
        setLoading(false);
    }

    useEffect(()=>{
        getBlogs();
    },[location]);

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>블로그검색</h1>
            {loading ?
                <div>로딩중....</div>
                :
                <>
                    <div>검색수: {total}</div>
                    <hr/>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>블로그이름</th>
                                <th>제목</th>
                            </tr>
                        </thead>
                        <tbody>
                        {blogs.map(blog=>
                            <tr key={blog.url}>
                                <td>{blog.blogname}</td>
                                <td><div dangerouslySetInnerHTML={{__html:blog.title}}></div></td>
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