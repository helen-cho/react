import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Table, Button} from 'react-bootstrap'

const ReceivePage = () => {
  const [checked, setChecked] = useState(0);
  const [list, setList] = useState([]);
  const uid=sessionStorage.getItem('uid');
  
  const callAPI = async() => {
    const res=await axios.get(`/message/receive.json/${uid}`);
    console.log(res.data);
    const data=res.data.map(msg=>msg && {...msg, checked:false});
    setList(data);
  }

  const onChangeAll = (e) => {
    const data=list.map(msg=>msg && {...msg, checked:e.target.checked});
    setList(data);
  }

  const onChangeSingle = (e, mid) => {
    const data=list.map(msg=>msg.mid===mid ? {...msg, checked:e.target.checked}:msg);
    setList(data);
  }


  useEffect(()=>{
    callAPI();
  }, []);

  useEffect(()=> {
    let cnt=0;
    list.forEach(msg=>msg.checked && cnt++);
    setChecked(cnt);
  }, [list]);

  const onDelete = () => {
    if(checked===0) {
      alert("삭제할 메시지를 선택하세요!");
      return;
    }

    let cnt=0;
    list.forEach(async(msg)=>{
      if(msg.checked) {
        await axios.post(`/message/receive/delete/${msg.mid}`);
        cnt++;
      }
      if(cnt===checked) callAPI();
    });
  }

  return (
    <div>
      <h1 className='text-center'>받은메시지</h1>
      <div>
        <Button onClick={onDelete} size='sm'>선택삭제</Button>
        <hr/>
      </div>
      <Table hover>
        <thead>
          <tr>
            <td><input checked={list.length> 0 && checked===list.length}
              type="checkbox" onChange={onChangeAll}/></td>
            <td>보낸이</td>
            <td>내용</td>
            <td>발신일</td>
            <td>수신일</td>
          </tr>
        </thead>
        <tbody>
          {list.map(msg=>
            <tr key={msg.mid}>
              <td><input onChange={(e)=>onChangeSingle(e, msg.mid)}
                    type="checkbox" checked={msg.checked}/></td>
              <td>{msg.mid} {msg.uname}({msg.sender})</td>
              <td>
                <span className={msg.readDate || 'bold'}>
                  <a href={`/message/receive/${msg.mid}`}>{msg.message.substring(0,30)}</a>
                </span>
              </td>
              <td>{msg.sendDate}</td>
              <td>{msg.readDate || '안읽음'}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default ReceivePage