import React, { useContext } from 'react'
import { BoxContext } from '../../common/BoxContext'

const LoginPage = () => {
  const {user, setUser} = useContext(BoxContext);
  const onClickLogin = () => {
    setUser({...user, uid:'admin'})
  }

  return (
    <div>
      <button onClick={onClickLogin}>로그인</button>
    </div>
  )
}

export default LoginPage