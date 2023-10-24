import React from 'react'
import { useState } from 'react'
import { Button, Table, Form, InputGroup } from 'react-bootstrap'

const Product = () => {
    const [products, setProucts] = useState([
      {"id": 1, "name":"냉장고", "price":100}, 
      {"id": 2, "name":"세탁기", "price":80},  
      {"id": 3, "name":"건조기", "price":80},   
    ]);

    const [form, setForm] = useState({
        id: 4,
        name:'',
        price:0
    });
    const {id, name, price} = form;
    
    const onInsert = (e) => {
        e.preventDefault();
        setProucts(products.concat(form));
        alert("저장!");
        setForm({
            id:id+1,
            name:'',
            price:0
        });
    }
    const onChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    return (
        <div className='p-5'>
            <h1 className='text-center mb-5'>상품관리</h1>
            <div>
                <form onSubmit={(e)=>onInsert(e)}>
                    <h3>아이디:{id}</h3>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>상품명</InputGroup.Text>
                        <Form.Control name="name" value={name} onChange={onChange}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>상품가격</InputGroup.Text>
                        <Form.Control name="price" value={price} onChange={onChange}/>
                    </InputGroup>
                    <Button variant='outline-primary'>등록</Button>
                </form>
            </div>
            <hr/>
            <Table bordered striped hover>
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>상품명</th>
                        <th>상품가격</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p=>
                        <tr key={p.id}>
                            <td className='py-2'>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Product