import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';

const ModalOrder = ({pid, order}) => {
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const callAPI = async() => {
    const res=await axios.get(`/orders/books?pid=${pid}`);
    console.log(res.data);
    setBooks(res.data);
  }
  
  useEffect(()=>{
    callAPI();
  }, []);

  return (
      <>
        <Button variant="primary" onClick={handleShow} size="sm">
          주문상품
        </Button>
        <Modal style={{top:'20%'}}
          show={show} size="lg"
          onHide={handleClose}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>주문상품</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='mb-1'>주문번호:{pid}</div>
            <div className='mb-2'>배송지주소:{order.address1} {order.address2}</div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>ID.</td>
                  <td>제목</td>
                  <td>가격</td>
                  <td>수량</td>
                  <td>금액</td>
                </tr>
              </thead>
              <tbody>
                {books.map(book=>
                  <tr>
                    <td>{book.bid}</td>
                    <td>
                      <img src={book.image} width="30px"/>
                      {book.title}
                    </td>
                    <td>{book.fmtprice}원</td>
                    <td>{book.qnt}개</td>
                    <td>{book.fmtsum}원</td>
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
    );
}

export default ModalOrder