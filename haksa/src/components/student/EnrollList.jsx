import React from 'react'
import { Table } from 'react-bootstrap'

const EnrollList = ({list}) => {
  return (
    <div>
      <h1 className='text-center my-5'>수강신청목록</h1>
      <hr/>
      <Table>
        <tbody>
          {list.map(cou=>
            <tr key={cou.lcode} className='text-center'>
              <td>{cou.lcode}</td>    
              <td>{cou.lname}</td>
              <td>{cou.pname} {cou.instructor}</td>
              <td>{cou.room}호</td>
              <td>{cou.persons}명/{cou.capacity}명</td>
              <td>{cou.hours}시간</td>
              <td>{cou.grade}점</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default EnrollList