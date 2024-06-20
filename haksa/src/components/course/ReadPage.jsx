import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const ReadPage = () => {
  const [course, setCourse] = useState('');
  const {lcode} = useParams();
  const {lname, room, instructor, pname, persons, capacity, dept} = course;
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
      <Table bordered>
        <tbody>
          <tr className='text-center'>
            <td className='text-center table-info'>강좌번호</td>
            <td>{lcode}</td>
            <td className='text-center table-info'>강좌이름</td>
            <td>{lname}</td>
            <td className='text-center table-info'>개설학과</td>
            <td>{dept}</td>
          </tr>
          <tr className='text-center'>
            <td className='text-center table-info'>강의실</td>
            <td>{room ? `${room}호` : '-'}</td>
            <td className='text-center table-info'>담당교수</td>
            <td>{pname ? `${pname}(${instructor})`:'-'}</td>
            <td className='text-center table-info'>수강인원</td>
            <td>{persons}명/{capacity}명</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default ReadPage