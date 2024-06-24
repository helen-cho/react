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
            <tr key={index} >
              <td>{index+1} {fi.title}</td>
              <td style={fi.range.substr(0,2)==='상승' ? up:down}>{fi.price}</td>
              <td style={fi.range.substr(0,2)==='상승' ? up:down}>
                {fi.range.substr(0,2)}
              </td>
              <td style={fi.range.substr(0,2)==='상승' ? up:down}>{fi.range.substring(3)}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default FinancePage