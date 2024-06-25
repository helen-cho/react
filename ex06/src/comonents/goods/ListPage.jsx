import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import '../../common/Paging.css';
import Pagination from 'react-js-pagination';

const ListPage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [goods, setGoods] = useState([]);
  const [count, setCount] = useState(0);

  const callAPI = async()=> {
    const res=await axios.get(`/goods/list?page=${page}&size=${size}`);
    setGoods(res.data.list);
    setCount(res.data.total);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  return (
    <div>
      <h1 className='text-center my-5'>상품목록</h1>
      <div>상품수: {count}개</div>
      <hr/>
      <Table>
        <tbody>
          {goods.map(good=>
            <tr key={good.gid}>
              <td><img src={good.image} width={80}/></td>
              <td>
                <div>{good.gid}</div>
                <div dangerouslySetInnerHTML={{__html:good.title}}/>
                <div>{good.fmtprice}원</div>
                <div>{good.fmtdate}</div>
              </td>
              <td className='align-middle'><Button size='sm' variant='outline-danger'>상품삭제</Button></td>
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

export default ListPage