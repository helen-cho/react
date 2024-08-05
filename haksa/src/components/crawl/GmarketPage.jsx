import React, { useContext, useState } from 'react'
import {Row, Col, InputGroup, Form, Button, Table} from 'react-bootstrap'
import { BoxContext } from '../../contexts/BoxContext';
import axios from 'axios';

const GmarketPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setBox} = useContext(BoxContext);
  const [query, setQuery] = useState('');

  const onSubmit = async(e) => {
    e.preventDefault();
    if(query==='') {
      setBox({show:true, message:'검색어를 입력하세요.'});
      return;
    }
    setLoading(true);
    const res=await axios.get(`/crawl/gmarket?query=${query}`);
    console.log(res.data);
    setList(res.data);
    setLoading(false);
  }

  if(loading) return <h1 className='text-center my-5'>로딩중......</h1>
  return (
    <div>
      <h1 className='text-center my-5'>지마켓 상품검색</h1>
      <Row>
        <Col xs={6} md={4} lg={3} className='mb-2'>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control placeholder='검색어' value={query} onChange={(e)=>setQuery(e.target.value)}/>
              <Button type="submit">검색</Button>
            </InputGroup>
          </form>
        </Col>
        <hr/>
        <Table>
          <tbody>
            {list.map((pro, index)=>
             <tr key={index}>
              <td><img src={pro.image} width="50px"/></td>
              <td>{pro.code}</td>
              <td>{index +1}. {pro.title}</td>
              <td>{pro.price.replace(',','')}</td>
             </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </div>
  )
}

export default GmarketPage