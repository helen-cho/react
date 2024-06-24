import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";

const Chart3 = () => {
  const [data, setData] = useState('');

  const callAPI = async() => {
    const res=await axios.get('/count/dept');
    console.log(res.data);
    let array=[];
    array.push(['학과명', '학생수']);
    res.data.forEach(row=>
      array.push([`${row.dept}`, parseFloat(row.count)])
    );
    setData(array);
  }

  useEffect(()=>{
    callAPI();
  },[]);

  const options = {
    chart: {
      title: "학과별학생수",
    },
  };

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
      options={options}/>
  )
}

export default Chart3