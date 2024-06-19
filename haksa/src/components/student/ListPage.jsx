import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

const ListPage = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  const callAPI = async() => {
    const url=`/stu?page=1&size=5&key=dept&word=`;
    const res=await axios.get(url);
    console.log(res.data);
    setList(res.data.list);
    setCount(res.data.total);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>
      <h1 className='text-center mb-5'>학생목록</h1>
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
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default ListPage