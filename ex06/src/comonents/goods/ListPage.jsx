import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap';
import '../../common/Paging.css';
import Pagination from 'react-js-pagination';
import { BoxContext } from '../../common/BoxContext';
import { Link } from 'react-router-dom';

const ListPage = () => {
  const [checked, setChecked] = useState(0);
  const { setBox } = useContext(BoxContext);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [goods, setGoods] = useState([]);
  const [count, setCount] = useState(0);

  const callAPI = async()=> {
    const res=await axios.get(`/goods/list?page=${page}&size=${size}`);
    if(res.data.total===0){
      setCount(0);
      setGoods([]);
    }else{
      const data=res.data.list.map(good=>good && {...good, checked:false});
      setGoods(data);
      setCount(res.data.total);
      const last=Math.ceil(res.data.total/size);
      if(page> last) setPage(page-1);
    }
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  useEffect(()=>{
    let cnt=0;
    goods.forEach(good=>good.checked && cnt++);
    setChecked(cnt);
  }, [goods]);

  const onDelete = (gid)=> {
    setBox({
      show:true,
      message:`${gid}번 상품을 삭제하실래요?`,
      action:async()=>{
        await axios.post(`/goods/delete/${gid}`);
        callAPI();
      }
    });
  }

  const onChangeAll = (e) => {
    const data=goods.map(good=>good && {...good, checked:e.target.checked});
    setGoods(data);
  }

  const onChangeSingle = (e, gid) => {
    const data=goods.map(good=>good.gid===gid ? {...good, checked:e.target.checked}: good);
    setGoods(data);
  }

  const onCheckedDelete = () => {
    if(checked===0) {
      setBox({show:true, message:'삭제할 상품을 선택하세요!'});
      return;
    }

    setBox({
      show:true,
      message:'선택한 상품을 삭제하실래요?',
      action:()=>{
        let cnt=0;
        goods.forEach(async good=>{
          if(good.checked){
            await axios.post(`/goods/delete/${good.gid}`);
            cnt++;
            if(cnt===checked){
              setBox({
                show:true,
                message:`${cnt}개 상품이 삭제되었습니다.`,
                action2:()=>{
                  callAPI();
                }
              });
            }
          }
        });
      }
    });
  }

  return (
    <div>
      <h1 className='text-center my-5'>상품목록</h1>
      <div>
        <input checked={goods.length===checked}
          onChange={onChangeAll} type="checkbox" className='ms-2 me-3'/>
        <Button onClick={onCheckedDelete} variant='outline-danger' className='me-3'>선택삭제</Button>
        상품수: {count}개
      </div>
      <hr/>
      <Table>
        <tbody>
          {goods.map(good=>
            <tr key={good.gid}>
              <td className='align-middle'>
                <input onChange={(e)=>onChangeSingle(e, good.gid)}
                  type="checkbox" checked={good.checked}/>
              </td>
              <td>
                <div>{good.gid}</div>
                <Link to={`/goods/update/${good.gid}`}>
                  <img src={good.image || 'http://via.placeholder.com/120x170'} width={80} style={{border:'1px solid gray'}}/>
                </Link>
              </td>
              <td>
                <div>{good.title}</div>
                <div>{good.fmtprice}원</div>
                <div>{good.fmtdate}</div>
                <div>{good.maker}</div>
              </td>
              <td className='align-middle'>
                <Button onClick={()=>onDelete(good.gid)}
                  size='sm' variant='outline-danger'>상품삭제</Button>
              </td>
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