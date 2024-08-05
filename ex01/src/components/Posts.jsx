import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const callAPI = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            const data=json.filter(j=>j.id <=10);
            setPosts(data);
        });
    }

    useEffect(()=>{
        callAPI();
    }, []);

    return (
        <div className='m-5'>
            <h1>게시글목록</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Title</td>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(p=>
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.title}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Posts