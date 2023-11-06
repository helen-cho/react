import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Table, Alert} from 'react-bootstrap'

const OrderModal = ({purchase, sum}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [list, setList] = useState([]);

    const getOrder = async() => {
        const res=await axios("/orders/list/order.json?pid=" + purchase.pid);
        //console.log(res.data);
        setList(res.data);
    }

    useEffect(()=> {
        getOrder();
    }, []);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                주문상품
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>주문상품</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='my-3'>
                        <div>받는이: {purchase.rname} <span>({purchase.str_status})</span></div>
                        <div>배송지주소: {purchase.raddress1} {purchase.raddress2}</div>
                        <div>전화: {purchase.rphone}</div>
                    </div>
                    <Table bordered striped hover>
                        <thead>
                            <tr className='text-center'>
                                <td>상품번호</td>
                                <td>제목</td>
                                <td>수량</td>
                                <td>가격</td>
                                <td>합계</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(book=>
                                <tr key={book.bid}>
                                    <td>{book.bid}</td>
                                    <td>{book.title}</td>
                                    <td>{book.qnt}</td>
                                    <td className='text-end'>{book.fmtprice}원</td>
                                    <td>{book.fmtsum}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Alert className='text-end'>총합계: {sum}원</Alert>
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

export default OrderModal