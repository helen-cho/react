import axios from 'axios'
import React, { useEffect } from 'react'

const TestProxy = () => {
    const callAPI = async() => {
        const res=await axios.get('/todos');
        console.log(res.data);
    }

    useEffect(()=>{
        callAPI();
    }, []);
    return (
        <div>TestProxy</div>
    )
}

export default TestProxy