import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import EnrollList from './EnrollList';

const ReadPage = () => {
  const [course, setCourse] = useState('');
  const {lcode} = useParams();
  const {lname, room, instructor, pname, persons, capacity, dept, hours} = course;
  const callAPI = async()=> {
    const res=await axios.get(`/cou/${lcode}`);
    console.log(res.data);
    setCourse(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>
      <h1 className='text-center mb-5'>강좌정보</h1>
      <div className='text-end mb-2'>
        <Link to={`/cou/update/${lcode}`}>정보수정</Link>
      </div>
      <Table bordered>
        <tbody>
          <tr className='text-center'>
            <td className='text-center table-info'>강좌번호</td>
            <td>{lcode}</td>
            <td className='text-center table-info'>강좌이름</td>
            <td colSpan={3}>{lname}</td>
            <td className='text-center table-info'>개설학과</td>
            <td>{dept}</td>
          </tr>
          <tr className='text-center'>
            <td className='text-center table-info'>강의실</td>
            <td>{room ? `${room}호` : '-'}</td>
            <td className='text-center table-info'>담당교수</td>
            <td>{pname ? `${pname}(${instructor})`:'-'}</td>
            <td className='text-center table-info'>강의시수</td>
            <td>{hours ? `${hours}시간`:'-'}</td>
            <td className='text-center table-info'>수강인원</td>
            <td>{persons}명/{capacity}명</td>
          </tr>
        </tbody>
      </Table>
      <EnrollList lcode={lcode}/>
    </div>
  )
}

export default ReadPage