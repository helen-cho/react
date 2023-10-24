import React, { useState } from 'react'
import Insert from './Insert';

const Address = () => {
    const [array, setArray] = useState([
        {"id":1, "name":"홍길동", "address":"인천 서구 서곶로 120번지"},
        {"id":2, "name":"강감찬", "address":"서울 강서구 화곡동"},
        {"id":3, "name":"이순신", "address":"인천 부평구 계산동"},
        {"id":4, "name":"성춘향", "address":"서울 강남구 압구정동"},
    ]);

    return (
        <div>
            <Insert/>
            <h1>주소목록</h1>
            {array.map(person=>
                <h1>{person.id} : {person.name} : {person.address}</h1>
            )}
        </div>
    )
}

export default Address