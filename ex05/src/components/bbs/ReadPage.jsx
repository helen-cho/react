import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card} from 'react-bootstrap'

const ReadPage = () => {
  const [form, setForm] = useState('');
  const {bid} = useParams();

  const callAPI = async() => {
    const res=await axios.get(`/bbs/${bid}`);
    console.log(res.data);
    setForm(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>{bid} 게시글정보</h1>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          <Card>
            <Card.Header>
              <h5>{form.title}</h5>
            </Card.Header>
            <Card.Body style={{whiteSpace:'pre-wrap'}}>
              {form.contents}
            </Card.Body>
            <Card.Footer className='text-muted'>
              Created by {form.uname} on {form.regDate}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ReadPage