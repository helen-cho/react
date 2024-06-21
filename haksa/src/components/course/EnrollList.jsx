import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import {BoxContext} from '../../contexts/BoxContext'

const EnrollList = ({lcode}) => {
  const [checked, setChecked] = useState(0);
  const {setBox} = useContext(BoxContext);
  const [list, setList] = useState([]);
  
  useEffect(()=>{
    let cnt=0;
    list.forEach(stu=>stu.checked && cnt++);
    setChecked(cnt);
  }, [list]);

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

  const onCheckedUpdate = () => {
    const updated = 
      list.filter(stu => stu.checked && stu.grade !== stu.num);

    if(updated.length===0){
      setBox({show:true, message:'변경된 성적이 없습니다.'});
      const data=list.map(stu=>stu && {...stu, checked:false});
      setList(data);
      return;
    }

    if(checked === 0) {
      setBox({show:true, message:'수정할 학생을 선택하세요.'});
      return;
    }

    setBox({
      show:true,
      message:'변경된 성적을 저장하실래요?',
      action:()=>{
        let cnt=0;
        list.forEach(async stu=>{
          if(stu.checked && stu.grade !== stu.num){
            await axios.post('/enroll/update', {lcode, scode:stu.scode,grade:stu.grade});
          }
          cnt++;
          if(cnt===checked) callAPI();
        });
      }
    });
  }

  const onChangeAll = (e) => {
    const data=list.map(stu=>stu && {...stu, checked:e.target.checked});
    setList(data);
  }

  const onChangeSingle = (e, scode) => {
    const data=list.map(stu=>stu.scode===scode ? 
                {...stu, checked:e.target.checked}: stu);
    setList(data);
  }

  return (
    <div>
      <h1 className='text-center my-5'>학생목록</h1>
      <div className='ms-2'>
        <input type="checkbox" checked={list.length===checked} onChange={onChangeAll}/>
        <Button onClick={onCheckedUpdate}
          className='ms-3' variant='outline-primary'>선택항목저장</Button>
      </div>
      <hr/>
      <Table>
        <tbody>
          {list.map(stu=>
            <tr key={stu.scode}>
              <td><input onChange={(e)=>onChangeSingle(e, stu.scode)}
                    type="checkbox" checked={stu.checked}/></td>
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