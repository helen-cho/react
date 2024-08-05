import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

const CheckBox = () => {
  const [categories, setCategories] = useState([
    {
      name:'오프라인상품', value:0, checked:false
    },
    {
      name:'중고상품', value:1, checked:false
    },
    {
      name:'백화전상품', value:2, checked:false
    },
    {
      name:'인터넷상품', value:3, checked:false
    },
  ])

  const onChangeCategory = (e, value) => {
    const data = categories.map(cat=>cat.value === value ? {...cat, checked:e.target.checked}: cat);
    setCategories(data);
  }

  const onClickSave = () => {
    const tArray = [];
    categories.forEach(cat=>cat.checked && tArray.push(cat.value));
    console.log(tArray);
  }

  return (
    <div className='my-5'>
      {categories.map(cat=>
        <Form.Check
          key={cat.value}
          inline
          label={cat.name}
          checked={cat.checked}
          onChange={(e)=>onChangeCategory(e, cat.value)}/>
      )}
      <div className='text-center mt-3'>
        <Button onClick={onClickSave} className='btn-sm px-5'>저장</Button>
      </div>
    </div>
  )
}

export default CheckBox