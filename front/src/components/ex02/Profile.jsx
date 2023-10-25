import React from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const data = {
        shim: { name:'심청이', description:'리액트를 좋아하는 개발자' }, 
        hong: { name:'홍길동', description:'고전소설 홍길동전의 주인공' }, 
        lee: { name:'이순신', description:'조선시대 명장' }
    }
    const {uid} = useParams();
    const profile=data[uid];
    return (
        <div>
            <h3>이름: {profile.name}</h3>
            <h3>소개: {profile.description}</h3>
        </div>
    )
}

export default Profile