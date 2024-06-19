import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import '../../common/Paging.css'
import Pagination from 'react-js-pagination';
import Box from '../../common/Box';

const ListPage = () => {
  const [box, setBox] = useState({
    show:false,
    message:'',
    action: null
  });

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  const callAPI = async() => {
    const url=`/stu?page=${page}&size=${size}&key=dept&word=`;
    const res=await axios.get(url);
    console.log(res.data);
    setList(res.data.list);
    setCount(res.data.total);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  const onClickDelete = (scode) => {
    setBox({
      show:true,
      message:`${scode}번 학생을 삭제하실래요?`
    });
  }

  return (
    <div>
      <h1 className='text-center mb-5'>학생목록</h1>
      검색수:{count}명
      <hr/>
      <Table>
        <tbody>
          {list.map(stu=>
            <tr key={stu.scode}>
              <td>{stu.scode}</td>
              <td>{stu.sname}</td>
              <td>{stu.year}</td>
              <td>{stu.dept}</td>
              <td>{stu.pname}({stu.advisor})</td>
              <td>{stu.birthday}</td>
              <td>
                <Button onClick={()=>onClickDelete(stu.scode)}
                  size='sm' variant='outline-danger'>삭제</Button></td>
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
      { box.show && <Box box={box} setBox={setBox}/> }  
    </div>
  )
}

export default ListPage