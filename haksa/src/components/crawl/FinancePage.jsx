import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Table} from 'react-bootstrap'

const FinancePage = () => {
  const up={
    color:'red'
  }
  const down={
    color:'blue'
  }

  const [list, setList] = useState([]);

  const callAPI = async() => {
    const res=await axios.get('/crawl/finance');
    console.log('top 10...',res.data);
    setList(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>
      <h1>Top 15 종목</h1>
      <Table>
        <tbody>
          {list.map((fi, index)=>
            <tr key={index} style={fi.range.substr(0,2)==='상승' ? up:down}>
              <td>{index+1} {fi.title}</td>
              <td>{fi.price}</td>
              <td>{fi.range.substr(0,2)}</td>
              <td>{fi.range.substring(3)}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default FinancePage