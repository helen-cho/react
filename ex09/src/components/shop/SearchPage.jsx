import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Form, Button, InputGroup, Row, Col, Table} from 'react-bootstrap'
import {app} from '../../firebaseInit'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import moment from 'moment'

const SearchPage = () => {
  const db = getFirestore(app);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("")

  const onInsert = async(shop) => {
    if(!window.confirm(`"${shop.title}" 저장?`)) return;
    const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    await addDoc(collection(db, 'shop'), {date, ...shop});
    alert('상품등록완료!');
  }

  const callAPI = async() => {
    setLoading(true);
    const res=await axios.get(`/shop/search.json?query=${query}`);
    //console.log(res.data);
    setList(res.data);
    setLoading(false);
  }

  useEffect(()=>{
    //callAPI();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if(query==="") {
      alert("검색어를 입력하세요!");
      return;
    } 
    callAPI();
  }

  if(loading) return <h1 className='my-5 text-center'>로딩중......</h1>
  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>상품검색</h1>
      <Row>
        <Col xs={8} md={6} lg={4}>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control 
                value={query}
                onChange={(e)=>setQuery(e.target.value)}/>
              <Button type="submit">검색</Button>
            </InputGroup>
          </form>
        </Col>
      </Row>
      <hr/>
      <Table className='table table-hover'>
        <tbody>
          {list.map(shop=>
            <tr key={shop.no}>
               <td><img src={shop.image} width={50}/></td>
               <td>{shop.title}</td> 
               <td>{shop.address}</td>
               <td className='text-end'>{shop.price}</td>
               <td width={80}>
                <Button onClick={()=>onInsert(shop)}>등록</Button>
               </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default SearchPage