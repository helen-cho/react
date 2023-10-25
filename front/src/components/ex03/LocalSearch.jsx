import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table, Spinner, Button} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';

const LocalSearch = () => {
    const [locals, setLocals] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigator=useNavigate();
    const location = useLocation();
    const search=new URLSearchParams(location.search);
    let page=parseInt(search.get("page"));

    let query="카카오프렌즈";
    const getLocal = async() => {
        const url=`https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=5&page=${page}`;
        const config ={
            headers: {
                "Authorization":"KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"
            }
        }
        setLoading(true);
        const res=await axios.get(url, config);
        //console.log(res.data);
        setLocals(res.data.documents);
        setLoading(false);
    }

    useEffect(()=>{
        getLocal();
    }, [page]);

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
                    <Table>
                        <thead>
                            <tr>
                                <td>지역명</td>
                                <td>주소</td>
                                <td>전화</td>
                            </tr>
                        </thead>
                        <tbody>
                            {locals.map(local=> 
                                <tr key={local.id}>
                                    <td>{local.id}:{local.place_name}</td>
                                    <td>{local.address_name}</td>
                                    <td>{local.phone}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className='text-center'>
                        <Button onClick={()=>navigator(`/local?page=${page-1}`)}
                            disabled={page===1}>이전</Button>
                        <span className='mx-3'>{page}/?</span>
                        <Button onClick={()=>navigator(`/local?page=${page+1}`)}>다음</Button>  
                    </div>
                </>
            }
        </div>
    )
}

export default LocalSearch