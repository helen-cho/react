import React from 'react'
import { useState } from 'react'

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
        <div>
            <h1>상품관리</h1>
            <div>
                <form onSubmit={(e)=>onInsert(e)}>
                    <h3>아이디:{id}</h3>
                    <input name="name" placeholder='상품명' value={name} onChange={onChange}/>&nbsp;&nbsp;
                    <input name="price" placeholder='가격' value={price} onChange={onChange}/>&nbsp;&nbsp;
                    <button>등록</button>
                </form>
            </div>
            <hr/>
            <table>
                {products.map(p=>
                    <tr key={p.id}>
                        <td>{p.id}</td><td>{p.name}</td><td>{p.price}</td>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default Product