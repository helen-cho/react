import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import {Row, Col, Card} from 'react-bootstrap'

const ImageSearch = () => {
    const [images, setImages] = useState([]);
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
        setImages(data);
        setLoading(false);
        
    }

    useEffect(()=>{
        getImages();
    }, []);

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>이미지검색</h1>
            {loading ?
                <div>로딩중...</div>
                :
                <>
                    <Row>
                        {images.map(img=>
                            <Col lg={2} md={3} sm={4} key={img.thumbnail_url} className='mb-3'>
                                <Card className='p-3'>
                                    <img src={img.thumbnail_url} width="100%"/>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </>
            }
        </div>
    )
}

export default ImageSearch