import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

const EnrollList = ({lcode}) => {
  const [list, setList] = useState([]);
  
  const callAPI = async() => {
    const res=await axios.get(`/enroll/lcode/${lcode}`);
    setList(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>
      <h1 className='text-center my-5'>학생목록</h1>
      <hr/>
      <Table>
        <tbody>
          {list.map(stu=>
            <tr key={stu.scode}>
              <td>{stu.scode}</td>
              <td>{stu.sname}</td>
              <td>{stu.dept} (지도교수:{stu.pname})</td>
              <td>{stu.year}</td>
              <td>{stu.fmtdate}</td>
              <td>
                <input value={stu.grade} size={3} className='text-end pe-1 me-1'/>
                <Button variant='outline-primary' size='sm'>수정</Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default EnrollList