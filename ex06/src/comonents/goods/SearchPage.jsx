import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import {Table, Row, Col, InputGroup, Button, Form} from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../../common/Paging.css'
import { BoxContext } from '../../common/BoxContext';

const SearchPage = () => {
  const {setBox} = useContext(BoxContext);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('노트북');
  const [size, setSize] = useState(5);
  const [goods, setGoods]= useState([]);
  const [count, setCount] = useState(0);

  const callAPI = async()=> {
    const res=await axios.get(`/goods/search?query=${query}&page=${page}&size=${size}`);
    console.log(res.data);
    setGoods(res.data.items);
    setCount(res.data.total > 100 && 100);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    if(query==='') {
      setBox({
        show:true, 
        message:'검색어를 입력하세요.',
        action2: ()=>setQuery('노트북')
      });
      return;
    }
    setPage(1);
    callAPI();
  }

  return (
    <div>
      <h1 className='text-center my-5'>상품검색</h1>
      <Row>
        <Col xs={6} md={5} lg={4}>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)}/>
              <Button type="submit">검색</Button>
            </InputGroup>
          </form>
        </Col>
      </Row>
      <hr/>
      <Table>
        <tbody>
          {goods.map(good=>
            <tr key={good.productId}>
                <td><img src={good.image} width="30px"/></td>
                <td><div dangerouslySetInnerHTML={{__html:good.title}}/></td>
                <td>{good.lprice}</td>
                <td>{good.maker}</td>
                <td>{good.brand}</td>
            </tr>
          )}
        </tbody>
      </Table>
      {count > size &&
        <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={ (e)=>setPage(e) }/>
      }
    </div>
  )
}

export default SearchPage