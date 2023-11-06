import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Table, Spinner } from 'react-bootstrap'
import Pagination from "react-js-pagination";
import '../Pagination.css';

const OrderList = () => {
    const navi=useNavigate();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const location=useLocation();
    const search=new URLSearchParams(location.search);
    const page=search.get("page") ? parseInt(search.get("page")) : 1;
    const size=3;
    
    const getPurchase = async() =>{
        setLoading(true);
        const res=await
            axios(`/orders/list/purchase.json?uid=${sessionStorage.getItem("uid")}&page=${page}&size=${size}`);
        //console.log(res.data);    
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(()=>{
        getPurchase();
    }, [location]);

    const onChangePage = (page)=>{
        navi(`/orders/list?page=${page}`);
    }

    if(loading) return <div className='my-5 text-center'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>주문목록</h1>
            <Table bordered striped hover>
                <thead>
                    <tr className='text-center'>
                        <td>준문번호</td>
                        <td>주문자일</td>
                        <td>전화</td>
                        <td>금액</td>
                        <td>주문상태</td>
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

export default OrderList