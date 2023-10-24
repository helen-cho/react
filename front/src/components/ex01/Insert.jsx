import React, { useState } from 'react'

const Insert = ({onInsert}) => {
    const [form, setForm] = useState({
        id: 5,
        name:"무기명",
        address:"서울 금천구 가산동"
    });
    const {id, name, address} = form;
    const onSubmit=(e)=>{
        e.preventDefault();
        if(window.confirm('등록하실래요?')){
            onInsert(form);
            setForm({
                id: id+1,
                name:'',
                address:''
            })
        }
    }
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    return (
        <div>
            <h1>주소등록</h1>
            <form onSubmit={(e)=>onSubmit(e)}>
                <h3>아이디: {id}</h3>
                <input value={name} name="name" onChange={(e)=>onChange(e)}/>
                {name}
                <hr />
                <input value={address} name="address" onChange={(e)=>onChange(e)}/>
                {address}
                <hr />
                <button>등록</button>
                <button type="reset">취소</button>
            </form>
        </div>
    )
}

export default Insert