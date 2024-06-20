import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { Card, InputGroup, Button, Form, Row, Col } from 'react-bootstrap';

const UpdatePage = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [form, setForm] = useState('');
  const {scode} = useParams();
  const {sname, dept, birthday, advisor, pname, year} = form;

  const callAPI = async() => {
    setLoading(true);
    const res=await axios.get(`/stu/${scode}`);
    console.log(res.data);
    setForm(res.data);

    const res1=await axios.get(`/pro?page=1&size=100`);
    setList(res1.data.list);
    setLoading(false);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  if(loading) return <h1 className='my-5 text-center'>로딩중......</h1>

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={10} lg={8}>
        <h1 className='text-center my-5'>정보수정</h1>
        <Card>
          <Card.Body>
            <InputGroup className='mb-2'>
              <InputGroup.Text>학생학번</InputGroup.Text>
              <Form.Control value={scode}/>
            </InputGroup>
            <InputGroup className='mb-2'>
              <InputGroup.Text>학생이름</InputGroup.Text>
              <Form.Control value={sname}/>
            </InputGroup>
            <InputGroup className='mb-2'>
              <InputGroup.Text>학생학과</InputGroup.Text>
              <Form.Select value={dept}>
                <option value='전산'>컴퓨터정보공학과</option>
                <option value='전기'>전기공학과</option>
                <option value='건축'>건축공학과</option>
              </Form.Select>
            </InputGroup>
            <InputGroup className='mb-2'>
              <InputGroup.Text>생년월일</InputGroup.Text>
              <Form.Control value={birthday || '2005-01-01'} type="date"/>
            </InputGroup>
            <InputGroup className='mb-2'>
              <InputGroup.Text>학생학년</InputGroup.Text>
              <Form.Control value={year}/>
            </InputGroup>
            <InputGroup className='mb-2'>
              <InputGroup.Text>지도교수</InputGroup.Text>
              <Form.Select value={advisor}>
                {list.map(pro=>
                  <option value={pro.pcode}>{pro.pname} ({pro.pcode}:{pro.dept})</option>
                )}
              </Form.Select>
            </InputGroup>
            <div className='text-center mt-3'>
              <Button className='me-2' variant='outline-primary'>정보수정</Button>
              <Button variant='outline-secondary'>수정취소</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default UpdatePage