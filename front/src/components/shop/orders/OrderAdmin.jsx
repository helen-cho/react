import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Table, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import OrderModal from './OrderModal';
import Pagination from "react-js-pagination";
import '../Pagination.css';
import {BoxContext} from '../BoxContext';

const OrderAdmin = () => {
    const { setBox } = useContext(BoxContext);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const location=useLocation();
    const search=new URLSearchParams(location.search);
    const page=search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState('');
    const size=5;
    const navi=useNavigate();

    const getList = async() => {
        setLoading(true)
        const res=await axios(`/orders/list.json?page=${page}&size=${size}&query=${query}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(()=>{
        getList();
    }, [location]);

    const onChangePage =(page)=>{
        navi(`/orders/admin?page=${page}&size=${size}&query=${query}`);
    }

    const onSumbmit = (e) => {
        e.preventDefault();
        navi(`/orders/admin?page=1&size=${size}&query=${query}`);
    }

    const onChangeStatus = (e, pid) => {
        const plist=list.map(p=>p.pid===pid ? {...p, status:e.target.value} :p);
        setList(plist);
    }

    const onClickChange = (pid, status) => {
        setBox({
            show:true,
            message:`${pid}번 주문상태를 ${status}로 변경하실래요?`,
            action:async()=>{
                await axios.post('/orders/update', {pid, status});
                getList();
            }
        });
    }

    if(loading) return <div className='text-center my-5'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>주문관리</h1>
            <Row className='mb-2'>
                <Col md={4}>
                    <form onSubmit={onSumbmit}>
                        <InputGroup>
                            <Form.Control placeholder='주문자,주소,전화' value={query} onChange={(e)=>setQuery(e.target.value)}/>
                            <Button type="submit">검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='mt-2'>
                    검색수: {total}건
                </Col>
            </Row>
            <Table bordered striped hover>
                <thead>
                    <tr className='text-center'>
                        <td>주문번호</td>
                        <td>주문자일</td>
                        <td>전화</td>
                        <td>금액</td>
                        <td>주문상태</td>
                        <td>상태변경</td>
                        <td>주문상품</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p=>
                        <tr key={p.pid} className='text-center'>
                            <td>{p.pid}</td>
                            <td>{p.fmtdate}</td>
                            <td>{p.rphone}</td>
                            <td className='text-end'>{p.fmtsum}원</td>
                            <td>{p.str_status}</td>
                            <td>
                                <InputGroup>
                                    <Form.Select value={p.status} onChange={(e)=>onChangeStatus(e, p.pid)}>
                                        <option value="0">결제확인중</option>
                                        <option value="1">결제확인</option>
                                        <option value="2">배송준비중</option>
                                        <option value="3">배송중</option>
                                        <option value="4">배송완료</option>
                                        <option value="5">주문완료</option>
                                    </Form.Select>
                                    <Button onClick={()=>onClickChange(p.pid, p.status)}
                                        variant='danger' size="sm">변경</Button>
                                </InputGroup>
                            </td>
                            <td><OrderModal purchase={p} sum={p.fmtsum}/></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={onChangePage}/>
            }
        </div>
    )
}

export default OrderAdmin