import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {Row, Col, Card, Button} from 'react-bootstrap'
import { BoxContext } from '../../contexts/BoxContext'

const CGVPage = () => {
  const {setBox} = useContext(BoxContext);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const callAPI = async() => {
    setLoading(true);
    const res=await axios.get('/crawl/cgv');
    console.log(res.data);
    setList(res.data);
    setLoading(false);
  }

  const onClickDownload = async(url) => {
    await axios.post(`/crawl/cgv/download?image=${url}`);
    setBox({show:true, message:'이미지다운로드완료.'});
  }

  useEffect(()=>{
    callAPI();
  }, []);

  if(loading) return <h1 className='text-center my-5'>로딩중......</h1>
  return (
    <div>
      <Row>
        {list.map((cgv, index)=>
          <Col key={cgv.image} xs={6} md={4} lg={2} className='mb-2'>
            <Card>
              <Card.Body>
                <img src={cgv.image} width="100%"/>
                <Button onClick={()=>onClickDownload(cgv.image)}>이미지다운로드</Button>
              </Card.Body>
              <Card.Footer>
                <span className='ellipsis' style={{fontSize:'0.7rem'}}>
                  {index+1}.{cgv.title}
                </span>
              </Card.Footer>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default CGVPage