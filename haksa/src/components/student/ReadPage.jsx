import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap';
import { IoPersonCircleOutline } from "react-icons/io5";
import EnrollList from './EnrollList';
const ReadPage = () => {
  const [list, setList] = useState([]);
  const style={
    fontSize:'4rem',
    color:'gray',
    cursor:'pointer'
  }
  const [student, setStudent] = useState('');
  const {scode} = useParams();
  const {sname, dept, birthday, advisor, pname, year} = student;

  const callAPI = async() => {
    const res=await axios.get(`/stu/${scode}`);
    //console.log(res.data);
    setStudent(res.data);
    callCourses();
  }

  const callCourses = async()=>{
    const res1= await axios.get(`/enroll/scode/${scode}`);
    setList(res1.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>
      <h1 className='text-center mb-5'>학생정보</h1>
      <div className='text-end mb-2'>
        <Link to={`/stu/update/${scode}`}>정보수정</Link>
      </div>
      <Table bordered>
        <tbody>
          <tr>
            <td rowSpan={2} className='text-center align-middle'>
              <IoPersonCircleOutline style={style}/>
            </td>
            <td className='text-center table-info'>학번</td>
            <td>{scode}</td>
            <td className='text-center table-info'>성명</td>
            <td>
              
              {sname}
            </td>
            <td className='text-center table-info'>학과</td>
            <td>{dept}</td>
          </tr>
          <tr>
            <td className='text-center table-info'>학년</td>
            <td>{year}학년</td>
            <td className='text-center table-info'>생년월일</td>
            <td>{birthday}</td>
            <td className='text-center table-info'>지도교수</td>
            <td>{advisor} {pname} </td>
          </tr>
        </tbody>
      </Table>
      <EnrollList list={list} scode={scode} callCourses={callCourses}/>
    </div>
  )
}

export default ReadPage