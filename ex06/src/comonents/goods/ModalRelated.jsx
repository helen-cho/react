import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Table}  from 'react-bootstrap'

const ModalRelated = ({gid, callRelated}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] =useState(false);
  const [show, setShow] = useState(false);
  
  const handleClose = () => {
    callRelated();
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const callAPI = async()=> {
    setLoading(true);
    const res = await axios.get(`/goods/list?page=1&size=10`);
    //console.log(res.data.list);
    setList(res.data.list);
    setLoading(false);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onClickInsert = async(rid) => {
    console.log(rid, gid)
    const res=await axios.post('/goods/related/insert', {gid, rid});
    if(res.data===0) {
      alert("관련상품등록!");
    }else{
      alert("이미등록된상품!");
    }
  }

  if(!loading)
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        관련상품등록
      </Button>
      <Modal style={{top:'10%'}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>관련상품등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <tbody>
              {list.map(goods=>
                <tr key={goods.gid}>
                  <td>{goods.gid}</td>
                  <td>{goods.title}</td>
                  <td>{goods.fmtprice}원</td>
                  <td>
                    <Button onClick={()=>onClickInsert(goods.gid)}
                      size='sm' disabled={goods.gid===gid}>등록</Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalRelated