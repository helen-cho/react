import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import {BoxContext} from '../../contexts/BoxContext'

const EnrollList = ({lcode}) => {
  const {setBox} = useContext(BoxContext);
  const [list, setList] = useState([]);
  
  const callAPI = async() => {
    const res=await axios.get(`/enroll/lcode/${lcode}`);
    const data=res.data.map(stu=>stu && {...stu, num:stu.grade, checked:false});
    setList(data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onChageGrade = (e, scode) => {
    let grade=e.target.value.replace(/[^0-9]/g,'');
    if(grade > 100) {
      grade=100;
    }
    const data=list.map(stu=>stu.scode===scode ? {...stu, grade}:stu);
    setList(data);
  }

  const onClickUpdate = (stu) => {
    if(stu.num===stu.grade) return;
    setBox({
      show:true,
      message:'점수를 수정하실래요?',
      action:async()=>{
        await axios.post('/enroll/update', {lcode, scode:stu.scode,grade:stu.grade});
        callAPI();
      }
    });
  }

  const onChangeAll = (e) => {
    const data=list.map(stu=>stu && {...stu, checked:e.target.checked});
    setList(data);
  }

  return (
    <div>
      <h1 className='text-center my-5'>학생목록</h1>
      <div className='ms-2'>
        <input type="checkbox" onChange={onChangeAll}/>
        <Button className='ms-3' variant='outline-primary'>선택항목저장</Button>
      </div>
      <hr/>
      <Table>
        <tbody>
          {list.map(stu=>
            <tr key={stu.scode}>
              <td><input type="checkbox" checked={stu.checked}/></td>
              <td>{stu.scode}</td>
              <td>{stu.sname}</td>
              <td>{stu.dept} (지도교수:{stu.pname})</td>
              <td>{stu.year}</td>
              <td>{stu.fmtdate}</td>
              <td>
                <input onChange={(e)=>onChageGrade(e, stu.scode)}
                  value={stu.grade} size={3} className='text-end pe-1 me-1'/>
                <Button onClick={()=>onClickUpdate(stu)}
                  variant='outline-primary' size='sm'>수정</Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default EnrollList