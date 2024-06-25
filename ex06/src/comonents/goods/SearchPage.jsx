import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import {Table, Row, Col, InputGroup, Button, Form} from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../../common/Paging.css'
import { BoxContext } from '../../common/BoxContext';
import { Rating } from '@mui/material';

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
    const data=res.data.items.map(good=>good && {...good, value:3});
    setGoods(data);
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
        action2: ()=>{
          setGoods([]);
          setCount(0);
        }
      });
    }else{
      setPage(1);
      callAPI();
    }
  }

  const onInsert = (good) => {
    setBox({
      show:true,
      message:`${good.title}를 등록하실래요?`,
      action:async()=>{
        const res=await axios.post('/goods/insert', {
          gid:good.productId,
          title:good.title,
          image:good.image,
          maker:good.maker,
          brand:good.brand,
          price:good.lprice
        });
        if(res.data===1) {
          setBox({show:true, message:'등록성공!'});
        }else{
          setBox({show:true, message:'이미등록!'});
        }
      }
    });
  }

  return (
    <div>
      <h1 className='text-center my-5'>상품검색</h1>
      <Row>
        <Col></Col>
        <Col xs={6} md={5} lg={4} className='text-end'>
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
                <td>{good.productId}</td>
                <td><div dangerouslySetInnerHTML={{__html:good.title}}/></td>
                <td>{good.lprice}</td>
                <td>{good.maker}</td>
                <td>{good.brand}</td>
                <td><Button onClick={()=>onInsert(good)}
                    size='sm'>상품등록</Button></td>
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