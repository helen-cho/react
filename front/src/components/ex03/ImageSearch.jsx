import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Row, Col, Card, Button} from 'react-bootstrap'
import ImageModal from './ImageModal';

const ImageSearch = () => {
    const [box, setBox] = useState({
        show:false,
        url:''
    });
    const navigate=useNavigate();
    const [images, setImages] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);

    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page=parseInt(search.get("page") ? search.get("page") : 1);
    const query=search.get("query") ? search.get("query") : "송중기";
    //console.log(page, query);

    const getImages = async() => {
        const url=`https://dapi.kakao.com/v2/search/image?page=${page}&query=${query}&size=12`;
        const config ={
            headers: {"Authorization":"KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"}
        }
        setLoading(true);
        const res=await axios.get(url, config);
        let data=res.data.documents;
        //console.log(data);
        setTotal(res.data.meta.pageable_count);
        setEnd(res.data.meta.is_end);
        setImages(data);
        setLoading(false);
        
    }

    useEffect(()=>{
        getImages();
    }, [location]);

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>이미지검색</h1>
            {loading ?
                <div>로딩중...</div>
                :
                <>
                    <div>
                        검색수: {total}건
                    </div>
                    <hr/>
                    <Row>
                        {images.map(img=>
                            <Col lg={2} md={3} sm={4} key={img.thumbnail_url} className='mb-3'>
                                <Card className='p-3'>
                                    <img onClick={()=>setBox({url:img.image_url, show:true})}
                                        src={img.thumbnail_url} width="100%"
                                        style={{cursor:'pointer'}}/>
                                </Card>
                            </Col>
                        )}
                    </Row>
                    <div className='text-center'>
                            <Button onClick={()=>navigate(`/image?query=${query}&page=${page-1}`)}  
                                disabled={page===1}>이전</Button>
                            <span className='mx-3'>{page} / {Math.ceil(total/12)}</span>
                            <Button onClick={()=>navigate(`/image?query=${query}&page=${page+1}`)} 
                                disabled={end}>다음</Button>
                    </div>
                    <ImageModal box={box} setBox={setBox}/>
                </>
            }
        </div>
    )
}

export default ImageSearch