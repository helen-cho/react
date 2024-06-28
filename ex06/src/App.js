import './App.css';
import { Container } from 'react-bootstrap';
import MenuPage from './common/MenuPage';
import { useEffect, useState } from 'react';
import { BoxContext } from './common/BoxContext';
import Box from './common/Box';
import axios from 'axios';
import CustomerMenu from './common/CustomerMenu';

function App() {
  const [box, setBox] = useState('');
  const [user, setUser] = useState({
    uid:'',
    uname:''
  });

  const getUser = async() => {
    const res=await axios.get(`/users/read/${sessionStorage.getItem('uid')}`);
    setUser(res.data);
  }

  useEffect(()=>{
    getUser();
  },[]);

  return (
      <BoxContext.Provider value={{box, setBox, user, setUser, getUser}}>
        <Container>
            {sessionStorage.getItem('uid')==='admin' ?
              <MenuPage/>
              :
              <CustomerMenu/>
            }
        </Container>
        {box.show && <Box box={box} setBox={setBox}/>}
      </BoxContext.Provider>

  );
}

export default App;
