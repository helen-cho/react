import axios from 'axios';
import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {Row, Col, Card} from 'react-bootstrap';
import Review from './Review';

const GoodsInfo = ({goods}) => {
  const {contents, gid} = goods;
  const [attaches, setAttaches] = useState([]);

  const callAPI = async() => {
    //console.log(gid);
    const res=await axios.get(`/goods/attach/${gid}`);
    //console.log(res.data);
    setAttaches(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div className='my-5'>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3">
        <Tab eventKey="home" title="상세설명">
          <div dangerouslySetInnerHTML={{__html:contents}} className='my-5'/>
        </Tab>
        <Tab eventKey="profile" title="리뷰작성">
          <Review gid={gid}/>
        </Tab>
        <Tab eventKey="contact" title="첨부이미지">
          <Row>
            {attaches.map(att=>
              <Col key={att.aid} xs={6} md={3} lg={2} className='mb-2'>
                 <Card>
                  <Card.Body>
                    <img src={att.filename} width='100%'/>
                  </Card.Body>
                 </Card>
              </Col>
            )}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
}

export default GoodsInfo