import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Table}  from 'react-bootstrap'

const ModalRelated = ({gid}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] =useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
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

  if(!loading)
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        관련상품등록
      </Button>
      <Modal style={{top:'20%'}}
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
                    <Button size='sm' disabled={goods.gid===gid}>상품등록</Button>
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