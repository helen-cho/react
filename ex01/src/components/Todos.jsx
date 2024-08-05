import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Todos = () => {
    const [last, setLast] = useState(1);
    const [page, setPage] = useState(19);
    const [todos, setTodos] = useState([]);
    
    const callAPI = async() => {
        fetch('/todos')
        .then(response => response.json())
        .then(json => {
            setLast(Math.ceil(json.length/10));
            const start=(page-1)*10 + 1;
            const end=(page * 10);
            const data=json.filter(j=>j.id >= start && j.id <= end);
            console.log(data);
            setTodos(data);
        })
    }

    useEffect(()=>{
        callAPI();
    }, [page]);

    return (
        <div>
            <h1>할일목록</h1>
            {todos.map(todo=>
                <div key={todo.id}>
                    <input type="checkbox" checked={todo.completed} readOnly/>
                    {todo.id} : {todo.title}
                </div>    
            )}
            <div>
                <button onClick={()=>setPage(page-1)} disabled={page===1}>이전</button>
                <span className='mx-3'>{page}</span>
                <button onClick={()=>setPage(page+1)} disabled={page===last}>다음</button>
            </div>
        </div>
    )
}

export default Todos