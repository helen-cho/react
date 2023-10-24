import React, { useState } from 'react'
import '../../App.css'

const Count = () => {
    const [count, setCount] = useState(100);

    return (
        <div className='count'>
            <button className='button' onClick={()=>setCount(count-1)}>감소</button>
            <span className='text'>{count}</span>
            <button className='button' onClick={()=>setCount(count+1)}>증가</button>
        </div>
    )
}

export default Count